import { EvaluationItem } from "../types/evaluation.types"

const models = ["GPT-4", "Claude", "Gemini"]
const templates = ["email", "chatbot", "summary"]

const prompts = [
    "Generate cheat sheet",
    "Summarize article",
    "Write email response",
    "Create chatbot reply",
    "Explain concept",
    "Fix grammar",
    "Generate report",
    "Convert to bullet points"
]

const getRandomRating = () => {
    const pool = [5, 5, 5, 4, 4, 4, 3, 2]
    return pool[Math.floor(Math.random() * pool.length)]
}

const getRandomItem = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)]

export const evaluationData: EvaluationItem[] = Array.from(
    { length: 100 },
    (_, i) => ({
        id: `${i + 1}`,
        name: `Prompt ${i + 1}`,
        prompt: `Task: ${getRandomItem(prompts)} for use case ${i + 1}`,
        model: getRandomItem(models),
        template: getRandomItem(templates),
        rating: getRandomRating(),
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    })
)

export const filtersConfig = [
    {
        key: "date",
        placeholder: "Date Range",
        options: [
            { label: "Last 7 Days", value: "7" },
            { label: "Last 30 Days", value: "30" },
            { label: "Last 3 Months", value: "90" },
            { label: "Last Year", value: "365" }
        ]
    },
    {
        key: "template",
        placeholder: "All Templates",
        options: [
            { label: "Email", value: "email" },
            { label: "Summarization", value: "summary" },
            { label: "Chatbot", value: "chatbot" }
        ]
    },
    {
        key: "model",
        placeholder: "Model",
        options: [
            { label: "GPT-4", value: "GPT-4" },
            { label: "Claude", value: "Claude" },
            { label: "Gemini", value: "Gemini" }
        ]
    }
]