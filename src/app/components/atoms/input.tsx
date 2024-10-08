import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/app/components/atoms/button'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  buttonLabel?: string
  button?: boolean
  buttonOnClick?: () => void
  error?: string | undefined
  required?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      button,
      buttonLabel,
      helperText,
      error,
      required,
      buttonOnClick,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <p className="flex gap-2">
          {props.label}
          {required && <span className="text-red-500">*</span>}
        </p>
        <div className="flex gap-3">
          <input
            type={type}
            className={cn(
              `flex h-10 w-full rounded-md border ${error ? 'border-destructive' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
              className,
            )}
            ref={ref}
            {...props}
          />
          {button && (
            <Button
              type={buttonOnClick ? 'button' : 'submit'}
              onClick={buttonOnClick}
            >
              {buttonLabel}
            </Button>
          )}
        </div>
        <span className="text-sm text-red-500">{error}</span>
        <span className="text-sm text-gray-400">{helperText}</span>
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
