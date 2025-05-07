import { Order, columns } from "./columns"
import { DataTable } from "./data-table"
import { useGetOrders } from "../../../queries/queries";
import Layout from "../dashboard/layout";

export default function OrdersList() {
    const data: Order[] = useGetOrders().data;
    console.log('data', data)
    return (
        <Layout>
            <div className="p-4 container flex flex-col gap-4 mx-auto">
                <h2 className="text-2xl font-bold"> Manage Orders</h2>
                {
                    data &&
                    <DataTable columns={columns} data={data} />
                }
            </div>
        </Layout>
    )
}
