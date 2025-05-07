import { createFileRoute } from '@tanstack/react-router'
import OrdersList from '../../../ui/admin/order/page'

export const Route = createFileRoute('/admin/orders/')({
  component: () => <OrdersList />,
})
