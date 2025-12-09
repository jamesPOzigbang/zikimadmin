"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { checklistItems } from "@/lib/data"
import { Plus, Save, X } from "lucide-react"
import { format } from "date-fns"

const reportTypes = [
  { id: "sale-multi", label: "매매-집합건물" },
  { id: "sale-general", label: "매매-일반건물" },
  { id: "jeonse-multi", label: "전세-집합건물" },
  { id: "jeonse-general", label: "전세-일반건물" },
  { id: "monthly-multi", label: "월세-집합건물" },
  { id: "monthly-general", label: "월세-일반건물" },
]

type ContentType = "guide" | "definition" | "special"
type StatusType = "safe" | "caution"

interface ContentField {
  id: string
  title: string
  content: string
}

interface ChecklistItemData {
  lastUpdated: Date
  safe: {
    guide: ContentField[]
    definition: ContentField[]
    special: ContentField[]
  }
  caution: {
    guide: ContentField[]
    definition: ContentField[]
    special: ContentField[]
  }
  landType?: string
}

function ChecklistItemCard({
  itemName,
  reportType,
  initialData,
}: {
  itemName: string
  reportType: string
  initialData?: ChecklistItemData
}) {
  const [status, setStatus] = useState<StatusType>("safe")
  const [contentType, setContentType] = useState<ContentType>("guide")
  const [data, setData] = useState<ChecklistItemData>(
    initialData || {
      lastUpdated: new Date(),
      safe: {
        guide: [{ id: "1", title: "", content: "" }],
        definition: [{ id: "1", title: "", content: "" }],
        special: [{ id: "1", title: "", content: "" }],
      },
      caution: {
        guide: [{ id: "1", title: "", content: "" }],
        definition: [{ id: "1", title: "", content: "" }],
        special: [{ id: "1", title: "", content: "" }],
      },
    }
  )

  const isLandRegistration = itemName === "토지별도등기"
  const currentFields = data[status][contentType]

  const addField = () => {
    const newField: ContentField = {
      id: Date.now().toString(),
      title: "",
      content: "",
    }
    setData({
      ...data,
      [status]: {
        ...data[status],
        [contentType]: [...currentFields, newField],
      },
    })
  }

  const removeField = (fieldId: string) => {
    if (currentFields.length > 1) {
      setData({
        ...data,
        [status]: {
          ...data[status],
          [contentType]: currentFields.filter((f) => f.id !== fieldId),
        },
      })
    }
  }

  const updateField = (fieldId: string, field: Partial<ContentField>) => {
    setData({
      ...data,
      [status]: {
        ...data[status],
        [contentType]: currentFields.map((f) =>
          f.id === fieldId ? { ...f, ...field } : f
        ),
      },
    })
  }

  const handleSave = () => {
    setData({
      ...data,
      lastUpdated: new Date(),
    })
    alert("저장되었습니다.")
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-primary">{itemName}</h4>
          <span className="text-xs text-muted-foreground">
            최종 수정: {format(data.lastUpdated, "yyyy.MM.dd HH:mm")}
          </span>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setStatus("safe")}
            className={`flex-1 px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
              status === "safe"
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-600"
            }`}
          >
            양호
          </button>
          <button
            onClick={() => setStatus("caution")}
            className={`flex-1 px-3 py-1.5 rounded text-sm font-semibold transition-colors ${
              status === "caution"
                ? "bg-white text-orange-700 shadow-sm"
                : "text-gray-600"
            }`}
          >
            확인 필요
          </button>
        </div>

        {/* Content Type Radio */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b">
          <div className="flex gap-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`content-type-${itemName}-${reportType}-${status}`}
                value="guide"
                checked={contentType === "guide"}
                onChange={() => setContentType("guide")}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-sm">안내</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`content-type-${itemName}-${reportType}-${status}`}
                value="definition"
                checked={contentType === "definition"}
                onChange={() => setContentType("definition")}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-sm">설명</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`content-type-${itemName}-${reportType}-${status}`}
                value="special"
                checked={contentType === "special"}
                onChange={() => setContentType("special")}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <span className="text-sm">특약</span>
            </label>
          </div>
          {isLandRegistration && (
            <Select
              value={data.landType || "근저당권"}
              onChange={(e) =>
                setData({ ...data, landType: e.target.value })
              }
              className="w-40"
            >
              <option value="근저당권">근저당권</option>
              <option value="구분지상권">구분지상권</option>
              <option value="근저당권+구분지상권">근저당권+구분지상권</option>
              <option value="기타">기타</option>
            </Select>
          )}
        </div>

        {/* Content Fields */}
        <div className="space-y-3 mb-4">
          {currentFields.map((field) => (
            <div
              key={field.id}
              className="p-3 bg-gray-50 border rounded-lg space-y-2"
            >
              <div className="flex items-start gap-2">
                <Textarea
                  placeholder="제목을 입력하세요"
                  value={field.title}
                  onChange={(e) =>
                    updateField(field.id, { title: e.target.value })
                  }
                  className="flex-1 min-h-[54px]"
                />
                {currentFields.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeField(field.id)}
                    className="shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Textarea
                placeholder={`[${status === "safe" ? "양호" : "확인 필요"} - ${contentType === "guide" ? "안내" : contentType === "definition" ? "설명" : "특약"}] 내용을 입력하세요`}
                value={field.content}
                onChange={(e) =>
                  updateField(field.id, { content: e.target.value })
                }
                className="min-h-[80px]"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={addField}
            className="flex-1"
          >
            <Plus className="mr-2 h-4 w-4" />
            추가하기
          </Button>
          <Button onClick={handleSave} className="flex-1">
            <Save className="mr-2 h-4 w-4" />
            저장하기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ContentManagementPage() {
  return (
    <>
      <Header
        breadcrumbs={
          <>
            <span>홈</span> /{" "}
            <span className="text-foreground font-medium">컨텐츠 관리</span>
          </>
        }
      />
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">리포트 컨텐츠 관리</h1>
            <p className="text-muted-foreground">
              리포트에 표시되는 주요 안내 문구를 수정합니다.
            </p>
          </div>

          <Tabs defaultValue="sale-multi" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              {reportTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id}>
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {reportTypes.map((type) => (
              <TabsContent key={type.id} value={type.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {checklistItems.map((item) => (
                    <ChecklistItemCard
                      key={item}
                      itemName={item}
                      reportType={type.id}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  )
}

