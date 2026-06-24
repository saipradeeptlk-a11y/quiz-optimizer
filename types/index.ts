export interface Quiz {
    id: string
    title: string
    description: string
    total_time: number
    created_at: string
}

export interface Question {
    id: string
    quiz_id: string
    text: string
    score: number
    time_required: number
}

export interface Answer {
    id: string
    user_id: string
    question_id: string
    quiz_id: string
    selected_answer: string
}