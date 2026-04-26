export const dateLabelMap: Record<string, string> = {
    "7": "Last 7 Days",
    "30": "Last 30 Days",
    "90": "Last 3 Months",
    "365": "Last Year"
}

export const modelLabelMap: Record<string, string> = {
    "GPT-4": "GPT-4",
    "Claude": "Claude",
    "Gemini": "Gemini"
}


export const templateLabelMap: Record<string, string> = {
    email: "Email",
    summary: "Summarization",
    chatbot: "Chatbot"
}

export const tableColumns = [
    {
        key: "name",
        label: "Prompt Name",
        render: (item: any) => item.name
    },
    {
        key: "prompt",
        label: "Prompt",
        render: (item: any) => item.prompt
    },
    {
        key: "model",
        label: "Model",
        render: (item: any) => item.model
    },
    {
        key: "evaluation",
        label: "Evaluation",
        render: (item: any) => item.rating
    }
]

