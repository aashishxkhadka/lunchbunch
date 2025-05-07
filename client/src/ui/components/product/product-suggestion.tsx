import { productCardPropsTypes } from "../../../types/product"
import { useGetProducts } from "../../../queries/queries";
import ProductCard from "./product-card";
import { Card, CardContent } from "../../../components/ui/card";
import { Link } from "@tanstack/react-router";


export default function ProductSuggestion() {
    const products = useGetProducts().data;
    const suggestedProducts = products?.data?.slice(0, 3);
    return (
        <div className="container  mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">You may also like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {suggestedProducts?.map((item: productCardPropsTypes) => (
                    <Link key={item.productId} to={`/product/${item.productId}`}>
                        <Card key={item.productId}>
                            <CardContent className="p-4">
                                <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover mb-2 rounded" />
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm ">{item.description.substring(0, 50)}</p>
                                <p className="py-4 text-sm font-black">${item.price.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}