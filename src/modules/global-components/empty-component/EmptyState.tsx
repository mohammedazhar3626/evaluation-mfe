import "./EmptyState.scss"

type Props = {
    title: string
    description?: string
}

const EmptyState = ({ title, description }: Props) => {
    return (
        <div className="empty">
            <h4 className="empty__title">{title}</h4>
            {description && <p>{description}</p>}
        </div>
    )
}

export default EmptyState