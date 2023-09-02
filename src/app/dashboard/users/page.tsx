import DashboardNavbar from "@/components/dashboard-ui/DashboardNavbar"
import { db } from "@/lib/db"
import { DataTable } from "../data-table"
import { UserInfo, columns } from "./columns"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const page = async () => {

    const { userId } = auth()
    if (!userId) redirect('/')

    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user || user.role !== 'ADMIN') {
        redirect('/')
    }

    const users = await db.user.findMany({
        orderBy: {
            role: "desc"
        }
    })

    const tableData: UserInfo[] = users.map(user => {
        return {
            id: user.id,
            image: user.profileImageUrl,
            username: user.username,
            role: user.role
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