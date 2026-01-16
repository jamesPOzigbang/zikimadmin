"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  checklistItems,
  getMockStatusCheck,
  getStatusLabel,
  getMockContent,
} from "@/lib/data"
import { ArrowLeft, FileText, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface Report {
  id: string
  date: string
  address: string
  type: string
  purpose: string
  payment: string
  status: "완료" | "진행중" | "취소"
  period: string
  deposit: string
  marketValue: string
  debt: string
  available: string
  priority: string
}

interface ReportDetailClientProps {
  report: Report
}

export function ReportDetailClient({ report }: ReportDetailClientProps) {
  const router = useRouter()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemName: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName)
    } else {
      newExpanded.add(itemName)
    }
    setExpandedItems(newExpanded)
  }

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
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">지킴 진단 리포트</h1>
              <p className="text-muted-foreground">
                리포트 ID: {report.id} ({report.address})
              </p>
            </div>
            <Button variant="outline" onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              목록으로 돌아가기
            </Button>
          </div>

          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="summary">매물 요약</TabsTrigger>
              <TabsTrigger value="diagnosis">진단 항목</TabsTrigger>
              <TabsTrigger value="safety">범죄/치안</TabsTrigger>
              <TabsTrigger value="convenience">생활/편의</TabsTrigger>
            </TabsList>

            {/* 매물 요약 탭 */}
            <TabsContent value="summary">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-4 gap-6 mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        발급 일시
                      </div>
                      <div className="font-medium">{report.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        계약 기간
                      </div>
                      <div className="font-medium">{report.period}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        보증금
                      </div>
                      <div className="font-medium">{report.deposit}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        시세 추정가
                      </div>
                      <div className="font-medium">{report.marketValue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        등기부등본 융자
                      </div>
                      <div className="font-medium">{report.debt}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        보증 가입 가능 여유금액
                      </div>
                      <div className="font-bold text-primary">{report.available}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        최우선 변제금
                      </div>
                      <div className="font-medium">{report.priority}</div>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-6 border-t">
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      건물 등기부등본 PDF
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      토지 등기부등본 PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 진단 항목 탭 */}
            <TabsContent value="diagnosis">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {checklistItems.map((item, index) => {
                  const status = getMockStatusCheck(index)
                  const content = getMockContent(status, item)
                  const statusLabel = getStatusLabel(status)
                  const isExpanded = expandedItems.has(item)

                  return (
                    <Card key={item}>
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-primary">{item}</h4>
                          <Badge
                            variant={status === "good" ? "success" : "warning"}
                          >
                            {statusLabel}
                          </Badge>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium mb-1">안내</div>
                            <div className="text-sm text-muted-foreground">
                              {content}
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                              <div>
                                <div className="text-sm font-medium mb-1">
                                  설명
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  가이드 내용이 여기에 표시됩니다. 이 항목에 대한 상세한 설명과 가이드라인이 제공됩니다. 
                                  관련 법규 및 주의사항을 확인하시기 바랍니다.
                                </div>
                              </div>
                              {status === "check" && (
                                <div className="pt-4 border-t border-dashed">
                                  <div className="text-sm font-medium text-orange-600 mb-1">
                                    특약 사항
                                  </div>
                                  <div className="text-sm bg-orange-50 border border-orange-200 text-orange-900 p-3 rounded">
                                    본 항목과 관련하여 임대차 계약서에 특약 사항을
                                    필수로 기재해야 합니다.
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => toggleItem(item)}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="mr-2 h-4 w-4" />
                                세부내용 닫기
                              </>
                            ) : (
                              <>
                                <ChevronDown className="mr-2 h-4 w-4" />
                                세부내용보기
                              </>
                            )}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* 범죄/치안 탭 */}
            <TabsContent value="safety">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 방범 시설 분포 */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">방범 시설 분포</h4>
                      <span className="text-xs text-muted-foreground">
                        반경 500m 기준
                      </span>
                    </div>
                    <div className="h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-sm text-muted-foreground">
                      지도 데이터
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>📷 방범 CCTV</span>
                        <span className="font-semibold">264개</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🚨 안전비상벨</span>
                        <span className="font-semibold">143개</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>👮 경찰서/파출소</span>
                        <span className="font-semibold">2곳</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🚒 소방서</span>
                        <span className="font-semibold">0곳</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🏪 24시 편의점</span>
                        <span className="font-semibold">12곳</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 안전 귀갓길 체크 */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">안전 귀갓길 체크</h4>
                      <span className="text-xs text-muted-foreground">
                        최단거리 도보 기준
                      </span>
                    </div>
                    <div className="h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-sm text-muted-foreground">
                      지도 데이터
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>🔵 경로 내, 방범 CCTV</span>
                        <span className="font-semibold">5개</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🔴 경로 내, 안전비상벨</span>
                        <span className="font-semibold">2개</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 생활/편의 탭 */}
            <TabsContent value="convenience">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">편의 시설</h4>
                      <span className="text-xs text-muted-foreground">
                        반경 500m 기준
                      </span>
                    </div>
                    <div className="h-32 bg-gray-100 rounded mb-4 flex items-center justify-center text-sm text-muted-foreground">
                      지도 데이터
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>🏪 24시 편의점</span>
                        <span className="font-semibold">14곳</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🏥 병원/약국</span>
                        <span className="font-semibold">21개</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>☕ 외식/카페</span>
                        <span className="font-semibold">45개</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🏫 교육/학원가</span>
                        <span className="font-semibold">5곳</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🛒 대형마트</span>
                        <span className="font-semibold">0곳</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>🚌 대중교통</span>
                        <span className="font-semibold">2곳</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <h4 className="font-semibold">내 동네와 비교하기</h4>
                    </div>
                    <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-sm text-muted-foreground">
                      레이더 차트
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

