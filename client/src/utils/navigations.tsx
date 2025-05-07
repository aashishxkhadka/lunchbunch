import { BellRing, Home, User, ShoppingBag, ShoppingBasket, BellDot } from "lucide-react";

const isLoggedIn = true
export const navigations = [
    {
        label: "Home",
        path: "/",
        icon: <Home />,
    },
    {
        label: "cart",
        // icon: <Cart />,
        icon: <ShoppingBasket />,
        path: "/cart",
    },
    {
        label: "notifications", 
        path: "/notifications",
        icon: <BellDot />,
    },
    {
        label: "profile", path: isLoggedIn ? "/me" : "/admin/auth",
        icon: <User />,
    },
]