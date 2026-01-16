import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { reportData } from "@/lib/data"
import { ReportDetailClient } from "./report-detail-client"
import { Header } from "@/components/layout/header"

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const report = reportData.find((item) => item.id === params.id)

  if (!report) {
    return {
      title: "리포트를 찾을 수 없습니다 | 지킴진단 관리자",
      description: "요청하신 리포트를 찾을 수 없습니다.",
    }
  }

  return {
    title: `${report.id} - 지킴 진단 리포트 | 지킴진단 관리자`,
    description: `${report.address}에 대한 지킴 진단 리포트입니다. 매물 요약, 진단 항목, 범죄/치안, 생활/편의 정보를 확인할 수 있습니다.`,
    openGraph: {
      title: `${report.id} - 지킴 진단 리포트`,
      description: `${report.address}에 대한 지킴 진단 리포트`,
      type: "website",
    },
  }
}

export default function ReportDetailPage({ params }: Props) {
  const report = reportData.find((item) => item.id === params.id)

  if (!report) {
    return (
      <>
        <Header
          breadcrumbs={
            <>
              <span>홈</span> / <span>리포트 발급 이력</span> /{" "}
              <span className="text-foreground font-medium">리포트 세부내용</span>
            </>
          }
        />
        <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-muted-foreground">리포트를 찾을 수 없습니다.</p>
          </div>
        </div>
      </>
    )
  }

  return <ReportDetailClient report={report} />
}

