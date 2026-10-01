// Product images stacked vertically, 8px apart, each in a 4:5 frame (object-fit: cover).
// No slider, thumbnails, zoom or lightbox on the reference.
export default function ProductGallery({ images, name }) {
  return (
    <div className="flex flex-col gap-2">
      {images.map((src, i) => (
        <div key={src} className="aspect-[4/5] overflow-hidden bg-surface-2">
          <img
            src={src}
            alt={i === 0 ? name : `${name}, view ${i + 1}`}
            width={800}
            height={1000}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : undefined}
            decoding="async"
            className="size-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
