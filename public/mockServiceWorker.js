/* eslint-disable */
/* tslint:disable */

/**
 * Mock Service Worker (2.4.9).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = '02f4ad4a2ca266d8'
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse')
const activeClientIds = new Set()

self.addEventListener('install', function () {
  self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', async function (event) {
  const clientId = event.source.id

  if (!clientId || !self.clients) {
    return
  }

  const client = await self.clients.get(clientId)

  if (!client) {
    return
  }

  const allClients = await self.clients.matchAll({
    type: 'window',
  })

  switch (event.data.type) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(client, {
        type: 'KEEPALIVE_RESPONSE',
      })
      break
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(client, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      })
      break
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId)

      sendToClient(client, {
        type: 'MOCKING_ENABLED',
      })
      break
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId)
      break
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId)

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId
      })

      // Unregister itself when there are no more clients
      if (remainingClients.length === 0) {
        self.registration.unregister()
      }

      break
    }
  }
})

self.addEventListener('fetch', function (event) {
  const { request } = event

  // Bypass service worker for non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Bypass service worker for requests that don't match the base URL
  if (!request.url.startsWith(self.location.origin)) {
    return
  }

  // Bypass service worker for requests that are not from active clients
  if (!activeClientIds.has(event.clientId)) {
    return
  }

  event.respondWith(
    handleRequest(event, request.url, request)
  )
})

async function handleRequest(event, requestUrl, request) {
  const client = await self.clients.get(event.clientId)

  const response = await getOriginalResponse(request, requestUrl)
  const clonedResponse = response.clone()

  sendToClient(client, {
    type: 'REQUEST',
    payload: {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
    },
  })

  return clonedResponse
}

async function getOriginalResponse(request, requestUrl) {
  return fetch(request)
}

function sendToClient(client, message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error)
      }

      resolve(event.data)
    }

    client.postMessage(message, [channel.port2])
  })
}
