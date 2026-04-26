import React from "react"
import { ChevronRight } from "lucide-react"
import { tableColumns } from "../../../constants/filterLabels"
import EmptyState from "../../global-components/empty-component/EmptyState"

import "./ReportsTable.scss"

type Props = {
    data: any[]
}

const ReportsTable = ({ data }: Props) => {
    const getColor = (rating: number) => {
        if (rating >= 4) return "#34d399"
        if (rating >= 3) return "#f59e0b"
        return "#f87171"
    }

    return (
        <div className="table">
            <div className="table__header">
                {
                    tableColumns?.map((col) => (
                        <div key={col.key}>{col.label}</div>
                    ))
                }
            </div>
            {data?.length === 0 ?
                (
                    <div className="table__empty">
                        <EmptyState
                            title="No results found"
                            description="Try Changing filters"
                        />
                    </div>
                ) :
                (data && React.Children.toArray(data.map((item) => {
                    const progress = item.rating * 20
                    return (
                        <div key={item.id} className="table__row">
                            {
                                tableColumns?.map((col) => {
                                    switch (col.key) {
                                        case "name":
                                            return <div key={col.key} className="cell name">{item.name}</div>
                                        case "prompt":
                                            return <div key={col.key} className="cell prompt"> {item.prompt}</div>
                                        case "model":
                                            return <div key={col.key} className="cell model"> {item.model}</div>
                                        case "evaluation":
                                            return (
                                                <div key={col.key} className="cell evaluation">
                                                    <div className="evaluation__stars">
                                                        <div>
                                                            {"★".repeat(item.rating)}

                                                        </div>
                                                    </div>
                                                    <div className="evaluation__bar">
                                                        <div
                                                            className="evaluation__fill"
                                                            style={{
                                                                width: `${progress}%`,
                                                                background: getColor(item.rating),
                                                                height: "10px"
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="evaluation__icon">
                                                        <ChevronRight size={16} />
                                                    </div>
                                                </div>
                                            )
                                        default:
                                            return null
                                    }
                                })
                            }
                        </div>
                    )
                })))}
        </div>
    )
}

export default ReportsTable