'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Question } from '@/types'

export default function QuizPage() {
    const { id } = useParams()
    const router = useRouter()
    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const userId = 'user-001'

    useEffect(() => {
        fetch(`/api/quizzes/${id}/questions`)
            .then(res => res.json())
            .then(data => {
                setQuestions(Array.isArray(data) ? data : [])
                setLoading(false)
            })
    }, [id])
    const handleAnswerChange = (questionId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }))
    }

    const handleSubmit = async () => {
        const formattedAnswers = Object.entries(answers).map(([question_id, selected_answer]) => ({
            question_id,
            selected_answer
        }))

        await fetch('/api/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userId,
                quiz_id: id,
                answers: formattedAnswers
            })
        })

        router.push(`/quizzes/${id}/result`)
    }

    if (loading) return <p>Loading questions...</p>

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Quiz Questions</h1>
            {questions.map((q, index) => (
                <div key={q.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                    <h3>Q{index + 1}: {q.text}</h3>
                    <p>Score: {q.score} | Time Required: {q.time_required} mins</p>
                    <textarea
                        placeholder='Type your answer here...'
                        value={answers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        style={{ width: '100%', height: '80px', marginTop: '0.5rem' }}
                    />
                </div>
            ))}
            <button onClick={handleSubmit} style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                Submit Quiz
            </button>
        </main>
    )
}