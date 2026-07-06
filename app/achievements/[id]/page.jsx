import MediaDetailView from "@/components/mediaDetail/MediaDetailView"
import React from 'react'
export default function AchievementsPage({ params }) {
      const unwrappedParams = React.use(params)
  return <MediaDetailView id={unwrappedParams.id} type="achievements" />
}