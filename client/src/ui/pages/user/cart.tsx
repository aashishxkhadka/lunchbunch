import { useEffect, useState } from 'react'
import { Minus, Plus, ShoppingBag, ShoppingBasket, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { useNavigate } from '@tanstack/react-router'
import {  CardContent, CardDescription, CardTitle } from '../../../components/ui/card'

export interface CartItem {
    productId: string
    name: string
    price: number
    quantity: number
    imageUrl: string
}

export function Cart() {
    const navigate = useNavigate();
    const savedCart = localStorage.getItem("cart")
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        savedCart
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const removeItem = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId))
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <div className="container mx-auto p-4 max-w-3xl ">
            <CardTitle>Your Cart</CardTitle>
            <CardDescription className='py-2 font-semibold flex justify-between'>
                <p>Estimated: ${totalPrice}</p>
                <p>Total Items: {cartItems?.length}</p>
            </CardDescription>
            {cartItems.length == 0 ? (
                <CardContent className='p-4 flex flex-col items-center h-[80vh] justify-center'>
                    <ShoppingBasket size={42}/>
                    <p className='text-center'>Your cart is empty.</p>
                    <Button className="w-full mt-6" size="lg" onClick={() => {
                        navigate({
                            to: "/",
                            replace: true,
                        })
                    }} >
                        <ShoppingCart className="mr-2 h-5 w-5" /> Go Shopping
                    </Button>
                </CardContent>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.productId} className="flex  gap-4 py-4 border-b">
                            <div className="flex  space-x-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className=" min-w-24 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p className="text-yellow-500 font-bold ">${(item.price).toFixed(2)}</p>
                                </div>
                                <div className="flex  rounded-md items-center">
                                    <div className='border p-1 rounded-lg mr-4'>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                        <Button
                                            variant="secondary"
                                            size="icon"
                                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeItem(item.productId)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Total:</h3>
                        <p className="text-xl">${(totalPrice).toFixed(2)}</p>
                    </div>
                    <Button className="w-full mt-6" size="lg" onClick={() => {
                        console.log(cartItems)
                        navigate({
                            to: "/checkout",
                            replace: true,
                        })
                    }} >
                        <ShoppingCart className="mr-2 h-5 w-5" /> Proceed to Checkout
                    </Button>
                </>
            )}
        </div>
    )
}