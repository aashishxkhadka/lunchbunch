import { createFileRoute } from '@tanstack/react-router'
import { ProductByCategory } from '../../../ui/components/product/product-by-category'

export const Route = createFileRoute('/product/category/$categoryId')({
  component: () => <ProductByCategory/>,
})
