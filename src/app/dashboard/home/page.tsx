import Chart from "@/components/dashboard-ui/Chart"
import { db } from "@/lib/db"

const page = async () => {

    const data = await db.order.groupBy({
        by: ['createdAt']
    })

    return (
        <div className="w-screen min-h-screen flex flex-col items-center">
            <h1>Home</h1>
            <Chart chartData={data} />
        </div>
    )
}

export default page