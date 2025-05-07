import { createFileRoute } from '@tanstack/react-router'
import ProductCatalog from '../../ui/components/product/explore-product'

export const Route = createFileRoute('/product/explore')({
    component: () => <ProductCatalog />,
})
