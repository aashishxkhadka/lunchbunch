import { Banknote, CreditCard, Package } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select"
import { Input } from "../../../components/ui/input"
import { useState } from "react"
import { useNavigate } from "@tanstack/react-router"
import { useCreateNotification, useCreateOrder, useGetUserById } from "../../../queries/queries"
import { CartItem } from "./cart"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Separator } from "../../../components/ui/separator"
import { Button } from "../../../components/ui/button"
import { toast } from "../../../hooks/use-toast"

export default function Checkout() {
    const savedCart = localStorage.getItem("cart")
    //@ts-ignore
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        savedCart
        return savedCart ? JSON.parse(savedCart) : []
    })
    const [cashOnDelivery, setCashOnDelivery] = useState(false)
    //@ts-ignore
    const userId = JSON.parse(localStorage.getItem("user"))?.userId
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();


    //order summary fields
    const cart = cartItems;
    const shippingCost = 15.00;
    const taxRate = 0.1;
    const subtotal = cart.reduce((acc: number, product: CartItem) => acc + product.price * product.quantity, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;
    const createOrder = useCreateOrder();
    const createNotification = useCreateNotification();
    const createOrderSchema = z.object({
        userId: z.string().optional(),
        productId: z.array(z.string()).min(1),
        totalPrice: z.number(),
        orderStatus: z.string(),
        phone: z.string().min(9, {
            message: "Phone number must be at least 9 digits long."
        }),
        address: z.string().min(5, { message: "Address must be more than 5 characters long." }),
        city: z.string().min(2, { message: "City name can't be shorter than 2 characters." }),
        state: z.string().min(2, { message: "Please select your state." }),
        zip: z.string().min(5, { message: "Zip code is required." }),
        shippingAddress: z.string(),
    })


    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            orderId: null,
            userId: userId,
            productId: cartItems.map((item: CartItem) => item.productId.toString()),
            orderStatus: "Ordered",
            totalPrice: total,
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            shippingAddress: "",
        },
    });

    const fullShippigAddress = `${getValues("address")}, ${getValues("city")}, ${getValues("state")}, ${getValues("zip"), "NP"}`;
    async function handleCheckout(data: any) {
        console.log('data', data)
        const orderData = {
            orderId: data.orderId,
            userId: data.userId,
            productId: data.productId,
            orderStatus: data.orderStatus,
            totalPrice: total,
            shippingAddress: fullShippigAddress,
        }
        if (!cashOnDelivery) {
            toast({
                title: "Please select another payment method.",
                description: "Currently we do not support card payments.",
                variant: "destructive",
            })
            return;
        }
        if (!user) {
            toast({
                title: "Please login to place your order.",
                description: "User not logged in!",
                variant: "destructive",
            });
            navigate({
                to: "/auth",
                replace: true
            })
            return;
        }
        createOrder.mutate(orderData);
        createNotification.mutate({
            notificationType: 1,
            notificationContext: 0,
            notificationTitle: "Order Placed",
            notificationContent: `Your order for ${cartItems.map(item => item.name).join(', ')} has been placed.`,
            userId: userId,
        })
    }

    console.log('form errors', errors)
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Checkout</h1>
                    <p className="text-muted-foreground">Complete your purchase</p>
                </div>
                <form className="grid gap-8 lg:grid-cols-[1fr_400px]" onSubmit={handleSubmit(handleCheckout)}>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Shipping Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="full-name">Full Name</Label>
                                        <Input id="full-name" required defaultValue={user?.username} placeholder="This name will be used in your package." />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" required defaultValue={user?.email} placeholder="Enter your email" type="email" />
                                    <span className="text-secondary-foreground text-xs">*This email will be used to send you information about your order.</span>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" {...register("phone")} required placeholder="Enter your phone number" type="tel" />
                                    <span className="text-red-500 text-sm">{errors.phone && errors.phone.message}</span>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" {...register("address")} placeholder="Enter your street address" />
                                    <span className="text-red-500 text-sm">{errors.address && errors.address.message}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" {...register("city")} required placeholder="City" />
                                        <span className="text-red-500 text-sm">{errors.city && errors.city.message}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Select onValueChange={(value) => {
                                            setValue("state", value)
                                        }}>
                                            <SelectTrigger id="state">
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="GDK">Gandaki</SelectItem>
                                                <SelectItem value="BAG">Bagmati</SelectItem>
                                                <SelectItem value="JNK">Janakpur</SelectItem>
                                                <SelectItem value="KPL">Kapilbastu</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <span className="text-red-500 text-sm">{errors.state && errors.state.message}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" {...register("zip")} placeholder="ZIP Code" />
                                        <span className="text-red-500 text-sm">{errors.zip && errors.zip.message}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Method
                                </CardTitle>
                                <CardDescription>{!cashOnDelivery ?
                                    <span className="text-red-500">
                                        Card support will be available shortly. Currently we are not accepting card payments.
                                    </span> :
                                    "Card support will be available shortly. Currently we are not accepting card payments."
                                }</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <RadioGroup defaultValue="card" onValueChange={() => setCashOnDelivery(!cashOnDelivery)} className="grid grid-cols-3 gap-4">
                                    <Label
                                        htmlFor="card"
                                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                                    >
                                        <RadioGroupItem value="card" id="card" className="sr-only" />
                                        <CreditCard className="mb-3 h-6 w-6" />
                                        Credit Card
                                    </Label>
                                    <Label
                                        htmlFor="cod"
                                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                                    >
                                        <RadioGroupItem value="cod" id="cod" className="sr-only" />
                                        <Banknote className="mb-3 h-6 w-6" />
                                        Cash on Delivery
                                    </Label>
                                </RadioGroup>
                                {!cashOnDelivery &&
                                    <>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="card-number">Card number</Label>
                                                <Input id="card-number" placeholder="Card number" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="month">Expiry Month</Label>
                                                    <Select>
                                                        <SelectTrigger id="month">
                                                            <SelectValue placeholder="Month" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">January</SelectItem>
                                                            <SelectItem value="2">February</SelectItem>
                                                            <SelectItem value="3">March</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="year">Expiry Year</Label>
                                                    <Select>
                                                        <SelectTrigger id="year">
                                                            <SelectValue placeholder="Year" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="2024">2024</SelectItem>
                                                            <SelectItem value="2025">2025</SelectItem>
                                                            <SelectItem value="2026">2026</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input id="cvv" placeholder="CVV" />
                                                </div>
                                            </div>
                                        </div></>
                                }
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order summary */}
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cart.map((product: CartItem, index: number) => {
                                    return (
                                        <div className="space-y-2" key={index}>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{product?.name} x {product?.quantity}</span>
                                                <span>${product?.price}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>${shippingCost}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>${tax}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${total}</span>
                                </div>
                                <Button className="w-full" size="lg"
                                    type="submit"
                                >
                                    Place Order
                                </Button>
                                <p className="text-center text-sm text-muted-foreground">
                                    By placing this order you agree to our Terms of Service and Privacy Policy
                                </p>
                            </CardContent>
                        </Card >
                    </>
                    {/* <OrderSummaryCard cart={cartItems} onClick={() => console.log('order placed')} /> */}
                </form>
            </div>
        </div>
    )
}