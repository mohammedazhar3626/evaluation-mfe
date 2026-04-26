import React, { useMemo, useEffect } from "react"
import { X } from "lucide-react"
import ChartsSection from "../charts-sections/ChartsSections"
import { dateLabelMap, templateLabelMap, modelLabelMap } from "../../../constants/filterLabels"
import "./SummarySection.scss"

type Props = {
    data: any[]
    filters: {
        model?: string
        date?: string
        template?: string
    }
    setFilters: React.Dispatch<React.SetStateAction<any>>
}

const SummarySection = ({ data, filters, setFilters }: Props) => {
    const high = data?.filter((d) => d.rating >= 4).length
    const low = data?.filter((d) => d.rating <= 2).length
    const total = high + low

    const removeFilter = (key: keyof typeof filters) => {
        setFilters((prev: any) => ({
            ...prev,
            [key]: ""
        }))
    }
    const clearAllFilters = () => {
        setFilters({
            model: "",
            date: "",
            template: ""
        })
    }

    const hasActiveFilters = useMemo(
        () => Object.values(filters).some(Boolean), [filters]
    )

    useEffect(() => {
        localStorage.setItem("filters", JSON.stringify(filters))
    }, [filters])

    return (
        <div className="summary">
            <div className="summary__header">
                <h3 className="summary__title">Overall Summary</h3>
                <div className="summary__tags">
                    <label className="summary__tags-label">{"Tags:"}</label>
                    {!hasActiveFilters && (
                        <span className="tag">{"All Data"}</span>
                    )}
                    {filters?.date && (
                        <span className="tag clickable" onClick={() => removeFilter("date")}
                        >
                            {dateLabelMap[filters?.date] || filters?.date}
                            <X size={12} />
                        </span>
                    )}
                    {filters?.template && (
                        <span className="tag clickable" onClick={() => removeFilter("template")}
                        >
                            {templateLabelMap[filters?.template] || filters?.template}
                            <X size={12} />
                        </span>
                    )}
                    {filters?.model && (
                        <span className="tag clickable" onClick={() => removeFilter("model")}
                        >
                            {modelLabelMap[filters?.model] || filters?.model}
                            <X size={12} />
                        </span>
                    )}
                    {hasActiveFilters && (
                        <span className="clear-filters" onClick={clearAllFilters}
                        >
                            {"Clear All"}
                        </span>
                    )}
                </div>
            </div>
            <div className="summary-cards">
                <div className="summary-card">
                    <div className="summary-card__row">
                        <p>{"Total Tests:"}</p>
                        <h3>{total}</h3>
                    </div>
                </div>
                <div className="summary-card summary-card--high">
                    <div className="summary-card__row">
                        <p>{"High Performing"}</p>
                        <h3>{high}</h3>
                    </div>
                </div>
                <div className="summary-card summary-card--low">
                    <div className="summary-card__row">
                        <p>{"Low Performing"}</p>
                        <h3>{low}</h3>
                    </div>
                </div>
            </div>
            <ChartsSection data={data} />
        </div>
    )
}

export default SummarySection