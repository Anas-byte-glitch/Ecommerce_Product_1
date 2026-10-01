import { formatPrice } from '../../utils/formatPrice'
import Img from '../ui/Img'

// Compact read-only list for summaries: 56px 4:5 thumbnail, name, size × qty, line total.
// lines: [{ slug, size, quantity, lineTotal, name, image }]
export default function OrderLines({ lines }) {
  return (
    <ul className="flex flex-col gap-4">
      {lines.map((l) => (
        <li key={`${l.slug}-${l.size}`} className="flex items-center gap-3">
          <Img image={l.image} sizes="56px" alt="" className="aspect-[4/5] w-14 shrink-0 rounded-sm bg-surface-2 object-cover" />
          <div className="flex min-w-0 flex-1 flex-col">
            <p className="truncate text-body text-black">{l.name}</p>
            <p className="text-small tracking-normal text-muted">
              Size {l.size} × {l.quantity}
            </p>
          </div>
          <p className="shrink-0 text-body text-slate">{formatPrice(l.lineTotal)}</p>
        </li>
      ))}
    </ul>
  )
}
