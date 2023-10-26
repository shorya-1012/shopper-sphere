import Chart from "@/components/dashboard-ui/Chart"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import moment from "moment"
import { redirect } from "next/navigation"
import { Card, Metric } from "@tremor/react"
import DashboardNavbar from "@/components/dashboard-ui/DashboardNavbar"
import isAdmin from "@/lib/authHelpers"

export type ChartData = {
    month: string;
    sales: number;
}

const page = async () => {

    const { userId } = auth()
    const isAuthorized = await isAdmin(userId)
    if (!isAuthorized) redirect('/')

    const startOfYear = moment().startOf('year')

    const orders = await db.order.findMany({
        where: {
            createdAt: {
                gt: new Date(startOfYear.toString())
            }
        }
    })

    const usersCount = await db.user.count()
    const productsCount = await db.product.count()
    const totalSales = await db.order.aggregate({
        _sum: {
            amount: true
        }
    })

    let chartData: ChartData[] = [];
    const currMonth = moment();

    while (currMonth.isSameOrAfter(startOfYear, 'month')) {
        const month = startOfYear.format("MMM")
        chartData.push({
            month,
            sales: 0
        })

        startOfYear.add(1, 'month')
    }

    chartData.forEach(data => {
        for (let i = 0; i < orders.length; i++) {
            const orderMonth = moment(new Date(orders[i].createdAt)).format('MMM')

            if (orderMonth == data.month) {
                data.sales += orders[i].amount
            }
        }
    })

    return (
        <div className="w-screen relative top-[-93px] flex flex-col bg-white overflow-x-hidden z-0">
            <DashboardNavbar />
            <div className="w-screen flex flex-col items-center overflow-x-hidden px-5 pt-[70px] ">
                <div className="w-full h-max flex flex-col md:flex-row items-center justify-around shrink-0 gap-3 mt-10 mb-5">
                    <Card className="mx-auto rounded-xl">
                        <h3 className="text-2xl font-semibold text-blue-500">Total Users</h3>
                        <Metric className="text-3xl">{usersCount}</Metric>
                    </Card>
                    <Card className="mx-auto rounded-xl">
                        <h3 className="text-2xl font-semibold text-blue-500">Total Products</h3>
                        <Metric className="text-3xl">{productsCount}</Metric>
                    </Card>
                    <Card className="mx-auto rounded-xl">
                        <h3 className="text-2xl font-semibold text-blue-500">Total Sales</h3>
                        <Metric className="text-3xl">₹{totalSales._sum.amount}</Metric>
                    </Card>
                </div>
                <div className="w-full my-5">
                    <Chart chartData={chartData} />
                </div>
            </div>
        </div>
    )
}

export default page