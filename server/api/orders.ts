import { defineEventHandler } from 'h3'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kanban_system',
  port: 5432
})

export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET') {
    const { rows } = await pool.query('SELECT id, title, description, progress FROM orders ORDER BY id DESC')
    return rows
  }
})
