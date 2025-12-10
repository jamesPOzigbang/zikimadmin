"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header({ breadcrumbs }: { breadcrumbs: React.ReactNode }) {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8">
      <div className="text-sm text-muted-foreground">{breadcrumbs}</div>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">관리자님</span>
      </div>
    </header>
  )
}


