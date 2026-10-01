// Product images stacked vertically, 8px apart, each in a 4:5 frame (object-fit: cover).
// No slider, thumbnails, zoom or lightbox.
import Img from '../ui/Img'

export default function ProductGallery({ images, name }) {
  return (
    <div className="flex flex-col gap-2">
      {images.map((image, i) => (
        <div key={image.src} className="aspect-[4/5] overflow-hidden bg-surface-2">
          <Img
            image={image}
            sizes="(min-width: 810px) 50vw, 100vw"
            alt={i === 0 ? name : `${name}, view ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
            className="size-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
