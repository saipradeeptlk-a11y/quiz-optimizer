import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { Question } from '@/types'

function knapsack(questions: Question[], totalTime: number) {
    const n = questions.length
    const dp = new Array(totalTime + 1).fill(0)
    const selected = new Array(totalTime + 1).fill(0)

    for (let i = 0; i < n; i++) {
        const { score, time_required } = questions[i]
        for (let t = totalTime; t >= time_required; t--) {
            if (dp[t - time_required] + score > dp[t]) {
                dp[t] = dp[t - time_required] + score
                selected[t] = i
            }
        }
    }
    const result: Question[] = []
    let t = totalTime
    const used = new Set<number>()

    while (t > 0 && dp[t] > 0) {
        const i = selected[t]
        if (used.has(i)) break
        used.add(i)
        result.push(questions[i])
        t -= questions[i].time_required
    }

    return {
        questions: result,
        totalScore: dp[totalTime],
        timeUsed: result.reduce((sum, q) => sum + q.time_required, 0)
    }

}
export async function POST(request: Request) {
    const body = await request.json()
    const { quiz_id } = body

    if (!quiz_id) {
        return NextResponse.json({ error: 'quiz_id is required' }, { status: 400 })
    }

    // Get quiz to find total_time
    const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quiz_id)
        .single()

    if (quizError) {
        return NextResponse.json({ error: quizError.message }, { status: 500 })
    }

    // Get all questions for this quiz
    const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quiz_id)

    if (questionsError) {
        return NextResponse.json({ error: questionsError.message }, { status: 500 })
    }

    const result = knapsack(questions, quiz.total_time)

    return NextResponse.json(result)
}