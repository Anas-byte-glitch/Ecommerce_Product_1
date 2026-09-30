import Button from '../ui/Button'

// Empty-cart message + "continue shopping" (same pattern as the cart drawer's empty state).
export default function EmptyCart({ onNavigate }) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-body-lg text-slate">Your Cart is empty</p>
      <Button variant="light" to="/shop/all" onClick={onNavigate}>
        continue shopping
      </Button>
    </div>
  )
}
