import { createFileRoute, useParams } from '@tanstack/react-router'
import { OrderSummary } from '../../ui/components/order/order-summary'

export const Route = createFileRoute('/order-summary/$orderId')({
  loader: ({ params: { orderId } }) => orderId,
  component: () => <OrderSummary />,
})
