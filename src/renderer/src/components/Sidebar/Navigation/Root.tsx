import { AnchorHTMLAttributes, ReactNode } from 'react'

interface RootProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export function Root(props: RootProps) {
  return <nav className="flex mx-2 flex-col gap-8 text-rotion-100" {...props} />
}
