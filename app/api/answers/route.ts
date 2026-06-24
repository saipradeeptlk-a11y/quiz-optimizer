import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const { user_id, quiz_id, answers } = body

    if (!user_id || !quiz_id || !answers) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('answers')
        .insert(answers.map((a: any) => ({
            user_id,
            quiz_id,
            question_id: a.question_id,
            selected_answer: a.selected_answer
        })))

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}