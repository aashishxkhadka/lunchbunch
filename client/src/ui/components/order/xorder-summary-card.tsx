import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { CartItem } from "../../pages/user/cart";

export function OrderSummaryCard({
    cart,
}: { cart: CartItem[], onClick: () => void }) {
    const shippingCost = 15.00;
    const taxRate = 0.1;
    const subtotal = cart.reduce((acc: number, product: CartItem) => acc + product.price * product.quantity, 0);
    const tax = subtotal * taxRate;
    const total = subtotal + shippingCost + tax;

    return (
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
                <Button className="w-full" size="lg">
                    Place Order
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                    By placing this order you agree to our Terms of Service and Privacy Policy
                </p>
            </CardContent>
        </Card >
    )
}