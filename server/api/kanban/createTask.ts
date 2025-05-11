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
  const { name, status, description, worker_id, order_id } = body

  const created_at = new Date().toISOString()

  await pool.query(`
    INSERT INTO tasks (name, status, description, created_at, worker_id, order_id)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [name, status, description, created_at, worker_id, order_id])

  return { success: true }
})
