import { createFileRoute } from '@tanstack/react-router'
import { ProductDescription } from '../../ui/pages/product/product-description'

export const Route = createFileRoute('/product/$productId')({
  component: () => <ProductDescription/>,
})
