import { useParams } from "@tanstack/react-router"
import { useGetCategoryById, useGetProductsByCategoryId } from "../../../queries/queries";
import ProductCard from "./product-card";
import { productCardPropsTypes } from "../../../types/product";

export function ProductByCategory() {
    const categoryId = useParams({
        select: (params) => [params.categoryId],
        from: '/product/category/$categoryId'
    });

    const categoryName = useGetCategoryById(categoryId[0]).data?.data?.name;
    const product = useGetProductsByCategoryId(categoryId[0]).data?.data;
    return (
        <div className="px-5 flex flex-col gap-4 py-4">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">All Products in category : {categoryName} </h2>
            </div>
            {
                product && product?.length > 0 ? product.map(
                    (item: productCardPropsTypes) =>
                        <>
                            <ProductCard key={item.productId} product={item} />
                        </>
                ) :
                    <p className="text-center">No items available for this category.</p>
            }
            {
                product && product?.length > 0 &&
                <p className="text-secondary-foreground py-4 text-center">No more products. </p>
            }
        </div>
    )
}