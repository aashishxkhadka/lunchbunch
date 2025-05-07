export type Order = {
    billingAddress: string;
    orderDate: string;
    orderId: string;
    orderStatus: string;
    product: null | any;
    productId: string[];
    shippingAddress: string;
    totalPrice: number;
    user: null | any;
    userId: string;
};