import { ShoppingCart } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Badge } from '../../../components/ui/badge'
import { productCardPropsTypes } from '../../../types/product'
import { useGetCategoryById } from '../../../queries/queries'
import { atom, useRecoilState } from "recoil"
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { toast } from '../../../hooks/use-toast'
import { cn } from '../../../lib/utils'

type CartItem = {
    productId: string,
    name: string,
    imageUrl: string,
    price: number,
    quantity: number
}

export default function ProductCard({ product, classname }: { product: productCardPropsTypes, classname?: string }) {
    const category = useGetCategoryById(product?.categoryId).data?.data?.name;

    // Load the initial cart from local storage or default to an empty array
    const initialCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];

    // Atom for the cart list, using Recoil state
    const cartListState = atom<CartItem[]>({
        key: 'CartList',
        default: initialCart
    });

    const [cartList, setCartList] = useRecoilState(cartListState);

    function addToCart(newItem: CartItem) {
        const existingProduct = cartList.find(item => item.productId === newItem.productId);

        if (existingProduct) {
            toast({
                title: 'Product already in cart',
                variant: "warning"
            });
        } else {
            const updatedCart = [...cartList, newItem];
            setCartList(updatedCart);
            toast({
                title: 'Product added to cart',
                variant: "success"
            });
        }
    }

    // Save cart to local storage whenever the cart list changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartList));
    }, [cartList]);

    return (
        <>
            <Card className={cn("max-w-sm mx-auto overflow-hidden flex flex-col justify-between", classname)}>
                <CardContent className="p-4">
                    <Link key={product.productId} to={`/product/${product.productId}`}>
                        <div className="relative size-[350px] overflow-hidden rounded-lg">
                            <img
                                src={product?.imageUrl}
                                className='object-fit h-full w-full'
                                alt={product?.name} />
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">{category}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-1 sm:text-xl">{product?.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 sm:text-base">
                            {product?.description}
                        </p>
                    </Link>
                    <div className="flex justify-between">
                        <Link key={product.productId} to={`/product/${product.productId}`}>
                            <div className='flex items-center'>
                                <span className="text-2xl font-bold sm:text-3xl">${product?.price}</span>
                            </div>
                        </Link>
                        <Button size="sm" className="sm:hidden mt-2"
                            onClick={() => addToCart({ productId: product.productId, name: product.name, imageUrl: product.imageUrl, price: product.price, quantity: 1 })}>
                            <ShoppingCart className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 hidden sm:block">
                    <Button className="w-full"
                        onClick={() => addToCart({ productId: product.productId, name: product.name, imageUrl: product.imageUrl, price: product.price, quantity: 1 })}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
