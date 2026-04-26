import React from "react"
import { filtersConfig } from "../../../services/mockData.api"
import "./FiltersBar.scss"

type Props = {
    filters: any
    setFilters: (filters: any) => void
}

const FiltersBar = ({ filters, setFilters }: Props) => {

    const handleChange = (key: string, value: string) => {
        setFilters((prev: any) => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <div className="filters">
            {React.Children.toArray(filtersConfig.map((filter) => (
                <div>
                    {filter?.key === 'model' && <label className="filters__label">{"Model:"}</label>}
                    <select
                        value={filters[filter.key as keyof typeof filters]}
                        onChange={(e) => handleChange(filter.key, e.target.value)}
                    >
                        <option value="" disabled hidden>
                            {filter.placeholder}
                        </option>

                        {filter.options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            )))}
            <button className="filters__btn">
                {"+ New Report"}
            </button>

        </div>
    )
}

export default FiltersBar