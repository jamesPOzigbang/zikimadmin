// Mock Data
export const reportData = Array.from({ length: 15 }, (_, i) => ({
  id: `RPT-2023-${(1000 + i).toString()}`,
  date: `2023-12-${String(Math.max(1, 30 - i)).padStart(2, "0")} 14:30`,
  address: `서울시 강남구 테헤란로 ${100 + i}길 ${i + 1}`,
  type: i % 3 === 0 ? "아파트" : i % 3 === 1 ? "빌라" : "오피스텔",
  purpose: i % 2 === 0 ? "매매" : "전세",
  payment: "카드결제",
  status: ["완료", "진행중", "취소"][i % 3] as "완료" | "진행중" | "취소",
  period: "24개월",
  deposit: "1억 5,000만원",
  marketValue: "2억 5,620만원",
  debt: "0원",
  available: "1억 620만원",
  priority: "5,000만원 가능",
}))

export const checklistItems = [
  "위반건축물",
  "대지권",
  "토지별도등기",
  "가등기",
  "압류/가압류",
  "처분금지가처분",
  "신탁",
  "경매개시결정",
  "근저당권",
  "임차권등기명령",
  "전세권",
  "민간임대주택등록 여부",
  "등기사항 변경예정",
  "건물,토지 소유자 일치",
  "임대사업자 등록",
  "보증금미반환 이력",
  "기존채무금액",
  "여유금액",
  "보증보험 예비심사",
  "보증금 대출 예비 심사",
  "최우선 변제권",
]

export function getMockStatusCheck(index: number): "good" | "check" {
  const isGood = (index * 7 + 3) % 10 > 2
  return isGood ? "good" : "check"
}

export function getStatusLabel(status: "good" | "check"): string {
  return status === "good" ? "양호" : "확인 필요"
}

export function getMockContent(status: "good" | "check", item: string): string {
  if (status === "good") {
    return "특이사항 없습니다."
  } else {
    return `[${item}] 관련하여 추가적인 확인이 필요합니다. 상세 내역을 검토해주시기 바랍니다.`
  }
}


