import {
  WineIcon,
  Shapes,
  Users2,
  LayoutDashboardIcon,
  ShoppingCartIcon,
  MessageCircleWarning,
  BellDot,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Notifications",
    url: "/admin/notifications",
    icon: BellDot,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Shapes,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: WineIcon,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users2,
  },
  {
    title: "Reviews",
    url: "/admin/reviews",
    icon: MessageCircleWarning,
  },
];
