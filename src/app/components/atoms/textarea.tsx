import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string | undefined
  required?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        <h4 className="flex gap-2 font-medium">{label}{required && <span className='text-red-500'>*</span>}</h4>
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <span className="text-sm text-red-500">{error}</span>
        <span className="text-sm text-gray-400">{helperText}</span>
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
