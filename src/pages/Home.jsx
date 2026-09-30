import PagePlaceholder from '../components/layout/PagePlaceholder'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { site } from '../config/site'

// Placeholder — home sections are built in Phase 2.
export default function Home() {
  return (
    <PagePlaceholder title={site.tagline} subtitle={site.description}>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button variant="light" to="/shop/all">
          shop now
        </Button>
        <Button variant="dark" to="/shop/hoodies" icon={false}>
          Shop hoodies
        </Button>
        <Badge>Sale</Badge>
        <Badge>New in</Badge>
      </div>
    </PagePlaceholder>
  )
}
