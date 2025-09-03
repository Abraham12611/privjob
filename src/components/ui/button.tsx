'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'pj-inline-flex pj-items-center pj-justify-center pj-whitespace-nowrap pj-rounded-pj-button pj-text-pj-sm pj-font-medium pj-transition-all pj-duration-[var(--pj-hover-duration)] pj-focus-ring pj-disabled:pj-pointer-events-none pj-disabled:pj-opacity-50',
  {
    variants: {
      variant: {
        default: 'pj-btn pj-btn--primary',
        blue: 'pj-btn pj-btn--blue',
        ghost: 'pj-btn pj-btn--ghost',
        icon: 'pj-icon-btn',
      },
      size: {
        default: 'pj-h-10 pj-px-4 pj-py-2',
        sm: 'pj-h-9 pj-rounded-pj-button pj-px-3',
        lg: 'pj-h-11 pj-rounded-pj-button pj-px-8',
        icon: 'pj-h-10 pj-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
