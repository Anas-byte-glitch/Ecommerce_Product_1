import { productPerks } from '../../data/perks'

// 2×2 (1 column on phone) grey tiles: 24px icon, 16px gap, title 16/24 slate + 14px muted line.
export default function TrustBadges() {
  return (
    <ul className="grid w-full gap-4 md:grid-cols-2">
      {productPerks.map(({ icon: Icon, title, text }) => (
        <li key={title} className="flex items-center gap-4 rounded-sm bg-surface p-3">
          <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 shrink-0 text-black" />
          <div className="flex flex-col">
            <p className="text-slate">{title}</p>
            <p className="text-small font-medium tracking-normal text-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
