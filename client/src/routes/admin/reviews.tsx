import { createFileRoute } from '@tanstack/react-router'
import { FeedbackTable } from '../../ui/admin/feedbacks/manage-feedback'
import Layout from '../../ui/admin/dashboard/layout'

export const Route = createFileRoute('/admin/reviews')({
    component: () => <Layout>
        <FeedbackTable />
    </Layout>,
})
