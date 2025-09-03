'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'pj-relative pj-flex pj-h-10 pj-w-10 pj-shrink-0 pj-overflow-hidden pj-rounded-full pj-bg-pj-card-bg pj-border pj-border-pj-border',
      className
    )}
    {...props}
  />
))
Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className={cn('pj-aspect-square pj-h-full pj-w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'pj-flex pj-h-full pj-w-full pj-items-center pj-justify-center pj-rounded-full pj-bg-gray-100 pj-text-pj-text-secondary pj-text-pj-sm pj-font-medium',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
