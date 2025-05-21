import { defineEventHandler } from 'h3'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kanban_system',
  port: 5432,
})

export default defineEventHandler(async (event) => {
  const userId = getHeader(event, "Authorization")?.replace(`Bearer `, '')
  const result = await pool.query(
      'SELECT id, name, status, description, created_at, user_id FROM tasks WHERE user_id = $1',
      [Number(userId)]
    )
  return result.rows
})
