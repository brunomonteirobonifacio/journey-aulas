import { ComponentProps, ReactNode } from "react"

interface TextInputProps extends ComponentProps<'input'> {
  icon?: ReactNode | undefined
}

export function TextInput({icon, ...props}: TextInputProps) {
  return (
    <div className="flex items-center flex-1 gap-2 h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg">
      {icon || null}
      <input name="title" {...props} className="bg-transparent text-lg text-zinc-400 outline-none flex-1" />
    </div>
  )
}