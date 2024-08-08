import { ShimmerThumbnail } from "react-shimmer-effects";

const ExplorePagePostsLoader = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3 ml-5">
      <ShimmerThumbnail height={300} rounded className="mb-0" />
      <ShimmerThumbnail height={300} rounded className="mb-0" />
      <ShimmerThumbnail height={300} rounded className="mb-0" />
      <ShimmerThumbnail height={300} rounded className="mb-0" />
      <ShimmerThumbnail height={300} rounded className="mb-0" />
      <ShimmerThumbnail height={300} rounded className="mb-0" />
    </div>

  )
}

export default ExplorePagePostsLoader