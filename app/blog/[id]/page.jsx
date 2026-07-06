import React from 'react'
import MediaDetailView from "@/components//mediaDetail/MediaDetailView"

export default function BlogPage({ params }) {
  const unwrappedParams = React.use(params)
  return <MediaDetailView id={unwrappedParams.id} type="blog" />
}