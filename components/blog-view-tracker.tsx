"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"
import { sendGAEvent } from "@/components/google-analytics"

export function BlogViewTracker({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    const params = { blog_slug: slug, blog_title: title, page: `/blog/${slug}` }
    track("blog_article_view", params)
    sendGAEvent("blog_article_view", params)
  }, [slug, title])

  return null
}
