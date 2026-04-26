import { useState, useMemo } from "react"
import FiltersBar from "../../modules/components/filters-bar/FiltersBar"
import ReportsTable from "../../modules/components/reports-table/ReportsTable"
import SummarySection from "../../modules/components/summary-section/SummarySection"
import { evaluationData } from "../../services/mockData.api"

import "./Evaluation.scss"

const Evaluation = () => {
    const [filters, setFilters] = useState(() => {
        const saved = localStorage.getItem("filters")
        return saved ? JSON.parse(saved) :
            {
                date: "",
                template: "",
                model: ""
            }
    })
    const filteredData = useMemo(() => {
        return evaluationData.filter((item) => {
            const modelMatch = filters.model
                ? item.model === filters.model
                : true
            const templateMatch = filters.template
                ? item.template === filters.template
                : true
            const dateMatch = filters.date
                ? (() => {
                    const days = Number(filters.date)
                    const cutoff = new Date()
                    cutoff.setDate(cutoff.getDate() - days)
                    return new Date(item.createdAt) >= cutoff
                })()
                : true
            return modelMatch && templateMatch && dateMatch
        })
    }, [filters])

    return (
        <>
            <div className="evaluation">
                <FiltersBar filters={filters} setFilters={setFilters} />
                <div className="evaluation__summary-sec">
                    <SummarySection data={filteredData} filters={filters} setFilters={setFilters} />
                </div>
            </div>
            <div className="evaluation__reports-sec">
                <ReportsTable data={filteredData} />
            </div>
        </>

    )
}

export default Evaluation