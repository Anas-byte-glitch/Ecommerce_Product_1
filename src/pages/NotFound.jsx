import PagePlaceholder from '../components/layout/PagePlaceholder'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <PagePlaceholder title="404" subtitle="The page you’re looking for doesn’t exist.">
      <Button variant="light" to="/" className="mt-4">
        back home
      </Button>
    </PagePlaceholder>
  )
}
