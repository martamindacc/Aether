"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"
import { sendGAEvent } from "@/components/google-analytics"

export function BlogViewTracker({ path, title }: { path: string; title: string }) {
  useEffect(() => {
    const params = { blog_slug: path.split("/").pop() ?? path, blog_title: title, page: path }
    track("blog_article_view", params)
    sendGAEvent("blog_article_view", params)
  }, [path, title])

  return null
}
