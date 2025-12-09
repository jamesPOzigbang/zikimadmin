"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import { reportData } from "@/lib/data"

function getStatusBadge(status: "완료" | "진행중" | "취소") {
  const variants = {
    완료: "success" as const,
    진행중: "warning" as const,
    취소: "danger" as const,
  }
  return <Badge variant={variants[status]}>{status}</Badge>
}

export default function ReportsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const handleRowClick = (id: string) => {
    router.push(`/reports/${id}`)
  }

  return (
    <>
      <Header
        breadcrumbs={
          <>
            <span>홈</span> / <span className="text-foreground font-medium">리포트 발급 이력</span>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">리포트 발급 이력</h1>
            <p className="text-muted-foreground">
              전체 리포트 발급 현황을 조회하고 관리합니다.
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-4 flex-wrap">
                <Input
                  placeholder="리포트 번호"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <div className="flex items-center gap-2">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-40"
                  />
                  <span className="text-muted-foreground">~</span>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-40"
                  />
                </div>
                <Button className="ml-auto">
                  <Download className="mr-2 h-4 w-4" />
                  엑셀 다운로드
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>리포트 번호</TableHead>
                    <TableHead>리포트 일시</TableHead>
                    <TableHead>주소</TableHead>
                    <TableHead>주용도</TableHead>
                    <TableHead>리포트 목적</TableHead>
                    <TableHead>결제 방식</TableHead>
                    <TableHead>진행현황</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => handleRowClick(item.id)}
                    >
                      <TableCell className="font-mono font-medium">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.purpose}</TableCell>
                      <TableCell>{item.payment}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  Total 1,234 items
                </span>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" disabled>
                    &lt;
                  </Button>
                  <Button variant="default" size="icon">
                    1
                  </Button>
                  <Button variant="outline" size="icon">
                    2
                  </Button>
                  <Button variant="outline" size="icon">
                    3
                  </Button>
                  <Button variant="outline" size="icon">
                    ...
                  </Button>
                  <Button variant="outline" size="icon">
                    &gt;
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

