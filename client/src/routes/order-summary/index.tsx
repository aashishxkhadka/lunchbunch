import { createFileRoute } from '@tanstack/react-router'
import ThankYouCard from '../../ui/components/order/order-successfull-card'

export const Route = createFileRoute('/order-summary/')({
    component: () => <ThankYouCard />,
})
