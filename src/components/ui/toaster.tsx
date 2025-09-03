'use client'

import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'pj-fixed pj-top-0 pj-z-[100] pj-flex pj-max-h-screen pj-w-full pj-flex-col-reverse pj-p-4 sm:pj-bottom-0 sm:pj-right-0 sm:pj-top-auto sm:pj-flex-col md:pj-max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        'pj-group pj-pointer-events-auto pj-relative pj-flex pj-w-full pj-items-center pj-justify-between pj-space-x-4 pj-overflow-hidden pj-rounded-pj-button pj-border pj-border-pj-border pj-bg-pj-card-bg pj-p-6 pj-pr-8 pj-shadow-pj-card pj-transition-all data-[swipe=cancel]:pj-translate-x-0 data-[swipe=end]:pj-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:pj-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:pj-transition-none data-[state=open]:pj-animate-in data-[state=closed]:pj-animate-out data-[swipe=end]:pj-animate-out data-[state=closed]:pj-fade-out-80 data-[state=closed]:pj-slide-out-to-right-full data-[state=open]:pj-slide-in-from-top-full data-[state=open]:sm:pj-slide-in-from-bottom-full',
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'pj-inline-flex pj-h-8 pj-shrink-0 pj-items-center pj-justify-center pj-rounded-pj-button pj-border pj-border-pj-border pj-bg-transparent pj-px-3 pj-text-pj-xs pj-font-medium pj-transition-colors pj-focus:pj-outline-none pj-focus:pj-ring-2 pj-focus:pj-ring-pj-focus-blue pj-focus:pj-ring-offset-2 pj-disabled:pj-pointer-events-none pj-disabled:pj-opacity-50 group-[.destructive]:pj-border-red-500/30 group-[.destructive]:hover:pj-border-red-500/30 group-[.destructive]:hover:pj-bg-red-500 group-[.destructive]:hover:pj-text-red-50 group-[.destructive]:pj-focus:pj-ring-red-500',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'pj-absolute pj-right-2 pj-top-2 pj-rounded-pj-chip pj-p-1 pj-text-pj-text-muted pj-opacity-0 pj-transition-opacity pj-focus:pj-opacity-100 pj-focus:pj-outline-none pj-focus:pj-ring-2 group-hover:pj-opacity-100 group-[.destructive]:pj-text-red-300 group-[.destructive]:hover:pj-text-red-50 group-[.destructive]:pj-focus:pj-ring-red-400 group-[.destructive]:pj-focus:pj-ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="pj-h-4 pj-w-4" />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('pj-text-pj-sm pj-font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('pj-text-pj-sm pj-opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export function Toaster() {
  return (
    <ToastProvider>
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
