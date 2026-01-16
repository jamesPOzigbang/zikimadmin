"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">문제가 발생했습니다</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
