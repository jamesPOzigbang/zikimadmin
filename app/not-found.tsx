export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">페이지를 찾을 수 없습니다</h2>
        <a
          href="/"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 inline-block"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  )
}
