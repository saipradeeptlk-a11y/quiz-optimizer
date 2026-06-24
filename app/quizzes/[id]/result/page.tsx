'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Question } from '@/types'
import Link from 'next/link'

interface OptimizeResult {
    questions: Question[]
    totalScore: number
    timeUsed: number
}

export default function ResultPage() {
    const { id } = useParams()
    const [result, setResult] = useState<OptimizeResult | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/optimize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quiz_id: id })
        })
            .then(res => res.json())
            .then(data => {
                setResult(data)
                setLoading(false)
            })
    }, [id])

    if (loading) return <p>Calculating optimal questions...</p>

    return (
        <main style={{ padding: '2rem' }}>
            <h1>Optimal Question Set</h1>
            <p>These are the best questions to maximize your score within the time limit!</p>

            <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <h2>Total Score: {result?.totalScore}</h2>
                <h2>Time Used: {result?.timeUsed} mins</h2>
            </div>

            {result?.questions.map((q, index) => (
                <div key={q.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
                    <h3>Q{index + 1}: {q.text}</h3>
                    <p>Score: {q.score} | Time Required: {q.time_required} mins</p>
                </div>
            ))}

            <Link href='/'>
                <button style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                    Back to Quizzes
                </button>
            </Link>
        </main>
    )
}