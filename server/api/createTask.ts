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
  const { name, status, description } = body

  const created_at = new Date().toISOString()

  await pool.query(`
    INSERT INTO tasks (name, status, description, created_at)
    VALUES ($1, $2, $3, $4)
  `, [name, status, description, created_at])

  return { success: true }
})
