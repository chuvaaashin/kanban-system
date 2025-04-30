import { defineEventHandler, readBody } from 'h3'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kanban_system',
  port: 5432,
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {id, name, description, status, created_at} = body

    const result = await pool.query('SELECT * FROM tasks')
    return result
})
