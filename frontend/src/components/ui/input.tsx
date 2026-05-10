import { cn } from "@/lib/utils"

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-[#d1d5db] bg-white px-3 py-2 text-sm text-[#111827] outline-none transition-colors placeholder:text-[#9ca3af] focus:border-[#111827] focus:ring-2 focus:ring-[#111827]/10",
        className
      )}
      {...props}
    />
  )
}
