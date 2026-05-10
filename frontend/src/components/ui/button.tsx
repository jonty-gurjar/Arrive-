import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline"
}

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] disabled:pointer-events-none disabled:opacity-50 [&_svg]:h-5 [&_svg]:w-5",
        variant === "outline"
          ? "border border-[#d1d5db] bg-white text-[#111827] hover:bg-[#f3f4f6]"
          : "bg-[#111827] text-white hover:bg-[#1f2937]",
        className
      )}
      {...props}
    />
  )
}
