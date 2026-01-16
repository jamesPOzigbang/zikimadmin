import type { Metadata } from "next"
import { Sidebar } from "@/components/layout/sidebar"

export const metadata: Metadata = {
  title: "대시보드 | 지킴진단 관리자",
  description: "지킴진단 관리자 대시보드",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}

