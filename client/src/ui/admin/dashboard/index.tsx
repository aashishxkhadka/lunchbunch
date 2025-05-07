import Layout from "./layout";
import { ChevronRight, ShoppingCart, DollarSign, Package, Users } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Bar, BarChart, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../components/ui/chart"
import { renderStatus } from "../../../utils/renderStatus";
import { useGetOrders, useGetProducts, useGetUsers } from "../../../queries/queries";
import { cn } from "../../../lib/utils";
import { DataTable } from "../order/data-table";
import { columns, Order } from "../order/columns";
import { Link } from "@tanstack/react-router";


export function Dashboard() {
    const orders = useGetOrders().data
    const products = useGetProducts().data?.data;
    const users = useGetUsers().data?.data
    const deliveredOrders = orders?.filter(order => order?.orderStatus == 'delivered')
    const totalSales = deliveredOrders?.map(order => order?.productId.length, 0).reduce((acc, curr) => acc + curr, 0);
    const totalOrders = orders?.map(order => order?.productId.length, 0).reduce((acc, curr) => acc + curr, 0);
    const inventoryStats = products?.map(p => p.stockQuantity).reduce((acc, curr) => acc + curr, 0)
    const customersCount = users?.length;
    const lowStocksItem = products?.filter(p => p.stockQuantity < 50)?.length;
    const data: Order[] = useGetOrders().data?.slice(0,5);

    //for chart
    const productStock = products?.map(product => ({ name: product.name, Stocks: product.stockQuantity }))
    console.log('pchart', productStock)
    const dashboardData = {
        metrics: [
            { id: 1, title: "Total Sales", value: totalSales, change: "", icon: DollarSign },
            { id: 2, title: "Orders", value: totalOrders, change: "", icon: ShoppingCart },
            { id: 3, title: "Inventory", value: inventoryStats, change: lowStocksItem + " items in low stock", icon: Package },
            { id: 4, title: "Customers", value: customersCount, change: "", icon: Users },
        ],
        recentOrders: [
            { id: "1234", customer: { name: "John Doe", avatar: "/avatars/john-doe.png" }, total: "$89.99", status: "Shipped" },
            { id: "1235", customer: { name: "Sarah Smith", avatar: "/avatars/sarah-smith.png" }, total: "$156.50", status: "Processing" },
            { id: "1236", customer: { name: "Mike Johnson", avatar: "/avatars/mike-johnson.png" }, total: "$49.99", status: "Delivered" },
            { id: "1237", customer: { name: "Emily Brown", avatar: "/avatars/emily-brown.png" }, total: "$123.45", status: "Pending" },
            { id: "1238", customer: { name: "Alex Wilson", avatar: "/avatars/alex-wilson.png" }, total: "$78.50", status: "Shipped" },
        ],
    }

    return (
        <Layout>
            <ScrollArea className="h-screen">
                <div className="flex flex-col space-y-6 p-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, Admin</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {dashboardData.metrics.map((metric) => (
                            <Card key={metric.id}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metric.value}</div>
                                    <p className={cn("text-xs ", Number(metric.change) > 0 ? "text-green-600" : "text-red-600")}>{metric.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Stock Levels</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    stock: {
                                        label: "Stock",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                                className="h-[200px]"
                            >
                                <BarChart data={productStock}>
                                    <XAxis dataKey="name" />
                                    <Bar dataKey="Stocks" fill="var(--color-stock)" />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Orders</CardTitle>
                            <CardFooter className="flex gap-2">
                                <Link to="/admin/products">
                                <Button variant={'secondary'} className="hidden sm:block">Add New Product</Button>
                                </Link>
                                <Link to="/admin/orders">
                                <Button  className="w-full">
                                    View All Orders
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                                </Link>
                            </CardFooter>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {
                                    data &&
                                    <DataTable columns={columns} data={data} />
                                }
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </ScrollArea>
        </Layout>
    )
}
