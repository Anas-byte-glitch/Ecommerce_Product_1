import { Star } from 'lucide-react'
import Img from '../ui/Img'

// Review tile (no fill or border): 300px min height, padding 24, 16px gaps.
// 60px round avatar + name (16/500) + five 16px black stars, rule, muted text.
export default function ReviewCard({ review }) {
  return (
    <article className="flex h-full min-h-[300px] flex-col gap-4 rounded-sm p-6">
      <div className="flex items-start gap-3">
        <Img image={review.avatar} sizes="60px" alt="" loading="lazy" className="size-15 shrink-0 rounded-full object-cover" />
        <div className="flex flex-col gap-3">
          <h3 className="text-body">{review.name}</h3>
          <div className="flex gap-1" role="img" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                strokeWidth={1}
                className={i < review.rating ? 'size-4 fill-black text-black' : 'size-4 text-black/32'}
              />
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="h-px w-full bg-black/8" />
      <p className="text-muted">{review.text}</p>
    </article>
  )
}
