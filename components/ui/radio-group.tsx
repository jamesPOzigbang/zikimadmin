import * as React from "react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
      role="radiogroup"
    />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ className, label, id, ...props }, ref) => {
  const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`
  return (
    <label htmlFor={inputId} className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        id={inputId}
        className={cn(
          "h-4 w-4 text-primary focus:ring-primary border-gray-300",
          className
        )}
        ref={ref}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }

