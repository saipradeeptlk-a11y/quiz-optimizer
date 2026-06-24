import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params

    const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', id)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}