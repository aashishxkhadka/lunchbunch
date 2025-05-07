import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import ProductCard from './product-card'
import { Category } from '../../pages/landing-page/homepage'
import { useGetCategories, useGetProducts } from '../../../queries/queries'
import { Product, productCardPropsTypes } from '../../../types/product'

export default function ProductCatalog() {
    const products = useGetProducts().data?.data
    const categories: Category[] = useGetCategories().data?.data;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const filteredProducts = selectedCategory
        ? products.filter((product: Product) => product.categoryId === selectedCategory)
        : products

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Product Catalog</h1>

            <div className="grid  p-4 grid-cols-2 lg:grid-cols-8 gap-4 ">
                <Button
                    onClick={() => setSelectedCategory(null)}
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="flex-shrink-0"
                >
                    All Products
                </Button>
                {categories?.map(category => (
                    <Button
                        key={category.categoryId}
                        onClick={() => setSelectedCategory(category.categoryId)}
                        variant={selectedCategory === category.categoryId ? "default" : "outline"}
                        className="flex items-center justify-center truncate text-ellipsis max-w-full min-w-[100px] px-4 py-2"
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 lg:gap-16">
                {filteredProducts?.map((product: productCardPropsTypes) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>

            {filteredProducts?.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No products found in this category.</p>
            )}
        </div>
    )
}