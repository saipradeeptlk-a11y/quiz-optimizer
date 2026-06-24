'use client'

import { useEffect, useState } from 'react'
import { Quiz } from '@/types'
import Link from 'next/link'

export default function Home() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/quizzes')
      .then(res => res.json())
      .then(data => {
        setQuizzes(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading quizzes...</p>

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Available Quizzes</h1>
      {quizzes.map(quiz => (
        <div key={quiz.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <p>Time Limit: {quiz.total_time} minutes</p>
          <Link href={`/quizzes/${quiz.id}`}>
            <button>Start Quiz</button>
          </Link>
        </div>
      ))}
    </main>
  )
}