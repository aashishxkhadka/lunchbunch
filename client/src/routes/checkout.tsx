import { createFileRoute } from '@tanstack/react-router'
import Checkout from '../ui/pages/user/checkout'

export const Route = createFileRoute('/checkout')({
  component: () => <Checkout />,
})
