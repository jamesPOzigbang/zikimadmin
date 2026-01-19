"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { RefreshCcw } from "lucide-react"

// Types
type RefundStatus = "requested" | "completed" | "cancelled"

interface RefundRequest {
    id: string
    userId: string
    requestDate: string
    status: RefundStatus
    amount: number
    processedAt?: string
}

// Mock Data
const initialRefunds: RefundRequest[] = [
    {
        id: "REF-2024001",
        userId: "user01",
        requestDate: "2024-01-15",
        status: "requested",
        amount: 50000,
    },
    {
        id: "REF-2024002",
        userId: "user02",
        requestDate: "2024-01-14",
        status: "completed",
        amount: 12000,
        processedAt: "2024.01.14 15:30:00",
    },
    {
        id: "REF-2024003",
        userId: "user03",
        requestDate: "2024-01-13",
        status: "cancelled",
        amount: 35000,
    },
    {
        id: "REF-2024004",
        userId: "user04",
        requestDate: "2024-01-16",
        status: "requested",
        amount: 150000,
    },
]

export default function RefundManagementPage() {
    const [refunds, setRefunds] = useState<RefundRequest[]>(initialRefunds)
    const [filters, setFilters] = useState({
        refundId: "",
        userId: "",
        date: "",
        status: "all",
    })

    // Modal State
    const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    // Filter Logic
    const filteredRefunds = refunds.filter((refund) => {
        if (filters.refundId && !refund.id.toLowerCase().includes(filters.refundId.toLowerCase())) return false
        if (filters.userId && !refund.userId.toLowerCase().includes(filters.userId.toLowerCase())) return false
        if (filters.date && refund.requestDate !== filters.date) return false
        if (filters.status !== "all" && refund.status !== filters.status) return false
        return true
    })

    // Handle Refund Action
    const handleOpenRefundModal = (refund: RefundRequest) => {
        setSelectedRefund(refund)
        setIsDialogOpen(true)
    }

    const handleConfirmRefund = () => {
        if (!selectedRefund) return

        const now = new Date()
        const timestamp = now.toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).replace(/\. /g, ".").replace(/:/g, ":") // Simple format adjustment if needed, but localeString is usually fine.
        // Actually ko-KR is like "2024. 1. 20. 12:00:00" or similar. 
        // Let's use a simpler format manually if needed, or just locale string.

        // Formatting manually to YYYY.MM.DD HH:mm:ss
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        const formattedDate = `${yyyy}.${mm}.${dd} ${hh}:${min}:${ss}`;

        setRefunds(refunds.map(r =>
            r.id === selectedRefund.id
                ? { ...r, status: "completed", processedAt: formattedDate }
                : r
        ))
        setIsDialogOpen(false)
        setSelectedRefund(null)
    }

    const getStatusBadge = (status: RefundStatus) => {
        switch (status) {
            case "requested":
                return <Badge variant="secondary">신청</Badge>
            case "completed":
                return <Badge variant="success">완료</Badge>
            case "cancelled":
                return <Badge variant="destructive">취소</Badge>
        }
    }

    return (
        <>
            <Header
                breadcrumbs={
                    <>
                        <span>홈</span> / <span className="text-foreground font-medium">환불 관리</span>
                    </>
                }
            />
            <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">환불 관리</h1>
                        <p className="text-muted-foreground mr-4">환불 신청 내역을 조회하고 처리합니다.</p>
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">환불번호</label>
                                    <Input
                                        placeholder="환불번호 입력"
                                        value={filters.refundId}
                                        onChange={(e) => setFilters({ ...filters, refundId: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">사용자 ID</label>
                                    <Input
                                        placeholder="ID 입력"
                                        value={filters.userId}
                                        onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">신청일</label>
                                    <Input
                                        type="date"
                                        value={filters.date}
                                        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">상태</label>
                                    <Select
                                        value={filters.status}
                                        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                                    >
                                        <option value="all">전체</option>
                                        <option value="requested">신청</option>
                                        <option value="completed">완료</option>
                                        <option value="cancelled">취소</option>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Table */}
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>환불번호</TableHead>
                                        <TableHead>사용자 ID</TableHead>
                                        <TableHead>신청일</TableHead>
                                        <TableHead>상태</TableHead>
                                        <TableHead>환불금액</TableHead>
                                        <TableHead>처리일시</TableHead>
                                        <TableHead className="text-right">관리</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredRefunds.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                                검색 결과가 없습니다.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredRefunds.map((refund) => (
                                            <TableRow key={refund.id}>
                                                <TableCell className="font-medium">{refund.id}</TableCell>
                                                <TableCell>{refund.userId}</TableCell>
                                                <TableCell>{refund.requestDate}</TableCell>
                                                <TableCell>{getStatusBadge(refund.status)}</TableCell>
                                                <TableCell>{refund.amount.toLocaleString()}원</TableCell>
                                                <TableCell className="text-muted-foreground text-sm">
                                                    {refund.processedAt || "-"}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {refund.status === 'requested' && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleOpenRefundModal(refund)}
                                                        >
                                                            환불 처리
                                                        </Button>
                                                    )}
                                                    {refund.status === 'completed' && (
                                                        <span className="text-sm text-green-600 font-medium">처리완료</span>
                                                    )}
                                                    {refund.status === 'cancelled' && (
                                                        <span className="text-sm text-gray-500">취소됨</span>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>환불 처리</DialogTitle>
                        <DialogDescription>
                            아래 내용을 확인 후 환불을 진행해주세요.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedRefund && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-sm font-medium text-right">환불번호</span>
                                <span className="col-span-3">{selectedRefund.id}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-sm font-medium text-right">신청자</span>
                                <span className="col-span-3">{selectedRefund.userId}</span>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <span className="text-sm font-medium text-right">환불금액</span>
                                <span className="col-span-3 font-bold text-lg text-red-600">
                                    {selectedRefund.amount.toLocaleString()}원
                                </span>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
                        <Button onClick={handleConfirmRefund}>환불 진행 (완료처리)</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
