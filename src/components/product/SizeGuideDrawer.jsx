import { sizeGuide } from '../../data/sizeGuide'
import Drawer from '../ui/Drawer'

// Size Guide (DESIGN_NOTES §17.4) on the shared Drawer: header padding 24/16/16, 26/22/20px slate
// title, 24px X, then intro + measurement table.
export default function SizeGuideDrawer({ open, onClose }) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Size Guide"
      headerClassName="border-black/8 px-4 pt-6 pb-4"
      titleClassName="text-[20px] leading-[1.2] font-medium text-slate md:text-[22px] lg:text-[26px]"
      closeLabel="Close size guide"
      closeButtonClassName="size-6"
    >
      <div className="flex flex-col gap-8 p-4">
        <p className="text-muted">{sizeGuide.intro}</p>
        <table className="flex flex-col gap-3 text-small tracking-normal">
          <thead>
            <tr className="grid grid-cols-4 gap-x-6 border-b border-black/8 pb-3 text-left">
              {sizeGuide.columns.map((c) => (
                <th key={c} scope="col" className="font-semibold text-slate">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="flex flex-col gap-3">
            {sizeGuide.rows.map(([size, ...values]) => (
              <tr key={size} className="grid grid-cols-4 gap-x-6 border-b border-black/8 pb-3">
                <th scope="row" className="text-left font-semibold text-slate">
                  {size}
                </th>
                {values.map((v, i) => (
                  <td key={i} className="font-medium text-muted">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Drawer>
  )
}
