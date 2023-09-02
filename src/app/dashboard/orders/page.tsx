import DashboardNavbar from "@/components/dashboard-ui/DashboardNavbar"
import { DataTable } from "../data-table"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { OrderInfo, columns } from "./columns"

const page = async () => {

    const { userId } = auth()
    if (!userId) redirect('/')

    const currentUser = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!currentUser || currentUser.role != 'ADMIN') {
        redirect('/')
    }

    const orders = await db.order.findMany({
        include: {
            user: true,
            product: {
                include: {
                    ProdcutImage: true
                }
            }
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    const tableData: OrderInfo[] = orders.map(order => {
        return {
            id: order.id,
            image: order.product.ProdcutImage[0].imageURL,
            name: order.product.name,
            amount: order.amount.toString(),
            status: order.status,
            quantity: (order.amount / parseInt(order.product.price.toString())),
            customer: order.user.username
        }
    })

    return (
        <div className="w-screen relative top-[-93px] flex flex-col bg-white overflow-x-hidden z-0">
            <DashboardNavbar />
            <div className="w-full px-5 pt-[70px]">
                <DataTable columns={columns} data={tableData} />
            </div>
        </div>
    )
}

export default page