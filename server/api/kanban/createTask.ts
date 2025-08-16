import { defineEventHandler, readBody } from 'h3'
import { pool } from '@/server/api/pool'


export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')
  const userID = parseInt(authHeader?.replace(/^Bearer\s*/, '') || '', 10)

  const body = await readBody(event)
  const { name, status, description, worker_id, order_id } = body

  const created_at = new Date().toISOString()

  await pool.query(`
    INSERT INTO tasks (name, status, description, created_at, worker_id, order_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `, [name, status, description, created_at, worker_id, order_id, userID])

  return { success: true }
})
