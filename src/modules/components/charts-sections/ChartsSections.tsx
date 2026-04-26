import "./ChartsSections.scss"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts"
import EmptyState from "../../global-components/empty-component/EmptyState"

type Props = {
    data: any[]
}

const getColor = (rating: number) => {
    if (rating >= 5) return "#34d399"
    if (rating === 4) return "#60a5fa"
    if (rating === 3) return "#f59e0b"
    return "#f87171"
}

const ChartsSection = ({ data }: Props) => {

    const distributionMap: Record<number, number> = {}

    data.forEach((item) => {
        distributionMap[item.rating] =
            (distributionMap[item.rating] || 0) + 1
    })

    const distributionData = Object.keys(distributionMap).map((key) => ({
        name: `${key}`,
        value: distributionMap[Number(key)]
    }))

    const performanceData = data.map((item) => ({
        name: item.name,
        value: item.rating
    }))

    return (
        <div className="charts">
            {/* LEFT CHART */}
            <div className="chart-card">
                {
                    !distributionData?.length ? (
                        <EmptyState
                            title="No data"
                            description="Try adjusting filters"
                        />
                    )
                        :
                        (<div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={180}>
                                <BarChart data={distributionData} barCategoryGap="50%"
                                    margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
                                >
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 12, right: 12 }} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Bar dataKey="value" barSize={25} radius={[4, 4, 0, 0]}>
                                        {distributionData.map((entry, index) => {
                                            const rating = Number(entry.name.replace("★", ""))
                                            return (
                                                <Cell key={index} fill={getColor(rating)} />
                                            )
                                        })}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        )}
            </div>

            {/* RIGHT CHART */}
            <div className="chart-card">
                {
                    !performanceData?.length ? (
                        <EmptyState
                            title="No data"
                            description="Try adjusting filters"
                        />)
                        : (<div className="chart-wrapper">
                            <ResponsiveContainer width="100%" height={180}>
                                <BarChart data={performanceData} barCategoryGap="50%"
                                    margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
                                >
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 12, right: 12 }} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Bar dataKey="value" barSize={25} radius={[4, 4, 0, 0]}>
                                        {data.map((item, index) => (
                                            <Cell key={index} fill={getColor(item.rating)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>)}
            </div>
        </div>
    )
}

export default ChartsSection