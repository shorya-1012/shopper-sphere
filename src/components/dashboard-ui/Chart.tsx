'use client'

type Props = {
    chartData: any
}

const Chart = (props: Props) => {
    console.log(props.chartData)
    return (
        <div>Chart</div>
    )
}

export default Chart