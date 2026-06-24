# Quiz Optimization System

A full-stack web application that suggests the optimal set of quiz questions a user can answer within a time limit to maximize their total score, using a Dynamic Programming algorithm.

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Algorithm**: 0/1 Knapsack Dynamic Programming

## How It Works

Each question has a `score` and `time_required`. Given a quiz's `total_time` limit, the application uses the **0/1 Knapsack algorithm** to compute the optimal subset of questions that maximizes the total score without exceeding the time limit.

## Database Schema

- `users` — stores user information
- `quizzes` — stores quiz metadata (title, description, total_time)
- `questions` — stores question text, score, and time_required
- `answers` — stores user responses linked to questions and quizzes

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account

### Setup

1. Clone the repository
```bash
git clone https://github.com/saipradeeptlk-a11y/quiz-optimizer.git
cd quiz-optimizer
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## API Documentation

### GET `/api/quizzes`
Returns all available quizzes.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "JavaScript Basics",
    "description": "Test your JS fundamentals",
    "total_time": 60
  }
]
```

### GET `/api/quizzes/[id]/questions`
Returns all questions for a specific quiz.

**Response:**
```json
[
  {
    "id": "uuid",
    "text": "What is a closure?",
    "score": 20,
    "time_required": 15
  }
]
```

### POST `/api/answers`
Submits user answers for a quiz.

**Request Body:**
```json
{
  "user_id": "user-001",
  "quiz_id": "uuid",
  "answers": [
    { "question_id": "uuid", "selected_answer": "A closure is..." }
  ]
}
```

### POST `/api/optimize`
Runs the 0/1 Knapsack algorithm and returns the optimal question set.

**Request Body:**
```json
{
  "quiz_id": "uuid"
}
```

**Response:**
```json
{
  "questions": [...],
  "totalScore": 75,
  "timeUsed": 60
}
```

## Algorithm

The optimization uses the **0/1 Knapsack Dynamic Programming** approach:

- Each question = an item with `weight (time_required)` and `value (score)`
- Quiz `total_time` = knapsack capacity
- DP table size = `O(n × total_time)`
- Time complexity: `O(n × total_time)`
- Space complexity: `O(total_time)`

The algorithm finds the subset of questions that **maximizes total score** without exceeding the time limit.