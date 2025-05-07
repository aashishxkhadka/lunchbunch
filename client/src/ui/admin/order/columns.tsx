import { ColumnDef } from "@tanstack/react-table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../components/ui/select"
import { useState } from "react";
import { useCreateNotification, useGetUserById, useUpdateOrder } from "../../../queries/queries";
import { renderStatus } from "../../../utils/renderStatus";

export type Order = {
    orderId: string;
    userId: string;
    productId: string[];
    orderDate: string; // ISO format date
    totalPrice: number;
    orderStatus: string;
    shippingAddress: string;
    billingAddress: string;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "orderId",
        header: "Order ID",
        cell: ({ row }) => {
            return (
                <>{"ORD" + row.getValue("orderId").slice(0, 5).toUpperCase()}</>
            )
        }
    },
    {
        accessorKey: "userId",
        header: "Customer Name",
        cell: ({ row }) => {
            const username = useGetUserById(row.getValue("userId")).data?.data?.username;
            return (
                <>
                    {username}
                </>
            )
        }
    },
    {
        accessorKey: "orderStatus",
        header: "Change Status",
        cell: ({ row }) => {
            const updateStatus = useUpdateOrder();
            const createNotification = useCreateNotification();
            const orderId = row.getValue("orderId");
            console.log('order Id', orderId)
            return (
                <>
                    < Select onValueChange={(value) => {
                        updateStatus.mutate({ orderId: orderId, orderStatus: value })
                        setTimeout(() => {
                            createNotification.mutate({
                                notificationType: 1,
                                notificationContext: 0,
                                notificationTitle: "Order Status Update",
                                notificationContent: `Your order ${"ORD" + row.getValue("orderId").split("-")[0].toUpperCase()}  is ${value.toUpperCase()}.`,
                                userId: row.getValue("userId"),
                            }), [3000]
                        })
                    }} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                    </Select >
                </>

            )
        }
    },
    {
        accessorKey: "orderStatus",
        header: "Order Status",
        cell: ({ row }) => {
            return <>
                {renderStatus(row.getValue("orderStatus"))}
            </>
        }
    },
    {
        accessorKey: "orderDate",
        header: "Order Date",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
        accessorKey: "shippingAddress",
        header: "Shipping Address",
    },
]
