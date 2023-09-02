'use client'

import { ChartData } from '@/app/dashboard/home/page'
import { Card, Title, AreaChart } from '@tremor/react'

type Props = {
    chartData: ChartData[]
}

const Chart = ({ chartData }: Props) => {

    const dataFormater = (sales: number) => {
        return '₹' + Intl.NumberFormat("in").format(sales).toString()
    }

    console.log(chartData)

    return (
        <Card>
            <Title>Sales This Year </Title>
            <AreaChart
                className="mt-6 w-full"
                data={chartData}
                index="month"
                categories={["sales"]}
                colors={["indigo"]}
                valueFormatter={dataFormater}
                yAxisWidth={48}
            />
        </Card>
    )
}

export default Chart