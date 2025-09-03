'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'pj-z-50 pj-min-w-[8rem] pj-overflow-hidden pj-rounded-pj-button pj-border pj-border-pj-border pj-bg-pj-card-bg pj-p-1 pj-text-pj-text-primary pj-shadow-pj-card',
        'data-[state=open]:pj-animate-in data-[state=closed]:pj-animate-out data-[state=closed]:pj-fade-out-0 data-[state=open]:pj-fade-in-0 data-[state=closed]:pj-zoom-out-95 data-[state=open]:pj-zoom-in-95 data-[side=bottom]:pj-slide-in-from-top-2 data-[side=left]:pj-slide-in-from-right-2 data-[side=right]:pj-slide-in-from-left-2 data-[side=top]:pj-slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'pj-relative pj-flex pj-cursor-default pj-select-none pj-items-center pj-rounded-sm pj-px-2 pj-py-1.5 pj-text-pj-sm pj-outline-none pj-transition-colors pj-focus:pj-bg-gray-100 pj-focus:pj-text-pj-text-primary data-[disabled]:pj-pointer-events-none data-[disabled]:pj-opacity-50',
      inset && 'pj-pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('pj--mx-1 pj-my-1 pj-h-px pj-bg-pj-border', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}
