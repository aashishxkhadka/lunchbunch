import { createFileRoute } from '@tanstack/react-router'
import Layout from '../../../ui/admin/dashboard/layout'
import { ProductTable } from '../../../ui/components/product/product-list'

export const Route = createFileRoute('/admin/products/')({
  component: () => <Layout >
    <ProductTable />
  </Layout>
})
