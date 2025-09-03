import { ContactsHeader } from '@/components/candidate/contacts/contacts-header'
import { ContactsFilters } from '@/components/candidate/contacts/contacts-filters'
import { ContactRequestsList } from '@/components/candidate/contacts/contact-requests-list'
import { ContactRequestDrawer } from '@/components/candidate/contacts/contact-request-drawer'
import { Suspense } from 'react'

export default function ContactsPage() {
  return (
    <div className="pj-space-y-8">
      <ContactsHeader />
      <ContactsFilters />
      <Suspense fallback={<div>Loading contact requests...</div>}>
        <ContactRequestsList />
      </Suspense>
      <ContactRequestDrawer />
    </div>
  )
}
