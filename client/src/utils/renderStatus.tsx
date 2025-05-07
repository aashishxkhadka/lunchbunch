export function renderStatus(status: string) {
    switch (status) {
        case "processing":
            return <span className="border-2 border-yellow-500 py-1 px-2 rounded-2xl  ">Processing</span>
        case "pending":
            return <span className="border-2 border-yellow-400 py-1 px-2 rounded-2xl  ">Pending</span>
        case "shipped":
            return <span className="border-2 border-orange-500 py-1 px-2 rounded-2xl  ">Shipped</span>
        case "delivered":
            return <span className="border-2 border-green-500 py-1 px-2 rounded-2xl  ">Delivered</span>
        case "Ordered":
            return <span className="border-2 border--500 py-1 px-2 rounded-2xl  ">Ordered</span>

        default:
            return <span className="border-2 border-red-500 py-1 px-2 rounded-2xl  ">Cancelled</span>
    }
}