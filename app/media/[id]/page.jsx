import MediaDetailView from "@/components/mdiaDetail/MediaDetailView"

export default function MediaPage({ params }) {
  return <MediaDetailView id={params.id} type="media" />
}