import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const notificationVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 text-green-500 dark:border-green-500 [&>svg]:text-green-500",
        warning: "border-yellow-500/50 text-yellow-500 dark:border-yellow-500 [&>svg]:text-yellow-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Notification = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof notificationVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(notificationVariants({ variant }), className)}
    {...props}
  />
))
Notification.displayName = "Notification"

export { Notification, notificationVariants } 