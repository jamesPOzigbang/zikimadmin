"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Settings } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "리포트 발급 이력",
    href: "/",
    icon: FileText,
  },
  {
    title: "컨텐츠 관리",
    href: "/content-management",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-white flex flex-col flex-shrink-0">
      <div className="h-16 border-b flex items-center px-6">
        <Image
          src="/logo.png"
          alt="Logo"
          width={24}
          height={24}
          className="mr-3"
        />
        <span className="font-bold text-lg text-primary">지킴진단 Admin</span>
      </div>
      <nav className="flex-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}


