import { createFileRoute } from '@tanstack/react-router'
import Layout from '../../../ui/admin/dashboard/layout'
import Promotions from '../../../ui/admin/notifications/notification'

export const Route = createFileRoute('/admin/notifications/')({
    component: () =>
        <Layout>
            <Promotions/>
        </Layout>
})
