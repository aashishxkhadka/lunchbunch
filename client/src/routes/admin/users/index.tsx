import { createFileRoute } from '@tanstack/react-router'
import Layout from '../../../ui/admin/dashboard/layout'
import { UserTable } from '../../../ui/admin/user/list-user'

export const Route = createFileRoute('/admin/users/')({
    component: () =>
        <Layout>
            <UserTable />
        </Layout>
})
