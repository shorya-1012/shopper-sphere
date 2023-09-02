import DashboardNavbar from "@/components/dashboard-ui/DashboardNavbar"
import { db } from "@/lib/db"
import { DataTable } from "../data-table"
import { ProductInfo, columns } from './columns'
import Link from "next/link"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

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

    const products = await db.product.findMany({
        include: {
            ProdcutImage: true
        }
    })

    const tableData: ProductInfo[] = products.map(product => {
        return {
            id: product.id,
            image: product.ProdcutImage[0].imageURL,
            name: product.name,
            price: '₹' + Intl.NumberFormat("in").format(parseInt(product.price.toString())).toString()
        }
    })

    return (
        <div className="w-screen relative top-[-93px] flex flex-col bg-white overflow-x-hidden z-0">
            <DashboardNavbar />
            <div className="w-full px-5 pt-[70px]">
                <DataTable columns={columns} data={tableData} />
            </div>
            <Link href={'/dashboard/add-product'}>
                <div className="fixed bottom-5 right-10 w-[75px] h-[75px] rounded-[50%] bg-red-500 flex justify-center items-center hover:bg-red-700 duration-300">
                    <p className="text-3xl text-white font-semibold mb-2">+</p>
                </div>
            </Link>
        </div>
    )
}

export default page