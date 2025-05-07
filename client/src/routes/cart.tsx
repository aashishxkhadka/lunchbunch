import { createFileRoute } from '@tanstack/react-router'
import { Cart } from '../ui/pages/user/cart'

export const Route = createFileRoute('/cart')({
  component: () => <Cart />,
})
