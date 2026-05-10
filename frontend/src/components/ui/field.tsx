import { cn } from "@/lib/utils"

export function Field({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2", className)} {...props} />
}

export function FieldGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-6", className)} {...props} />
}

export function FieldLabel({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium leading-none text-[#111827]", className)}
      {...props}
    />
  )
}

export function FieldDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm text-[#6b7280] [&_a]:font-medium [&_a]:text-[#111827] [&_a]:underline-offset-4 hover:[&_a]:underline",
        className
      )}
      {...props}
    />
  )
}

export function FieldSeparator({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative flex items-center justify-center text-xs text-[#6b7280]", className)}
      {...props}
    >
      <span className="absolute inset-x-0 top-1/2 border-t border-[#e5e7eb]" />
      <span data-slot="field-separator-content" className="relative bg-white px-2">
        {children}
      </span>
    </div>
  )
}
