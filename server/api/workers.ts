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
    const { rows } = await pool.query('SELECT id, name, surname, post FROM workers ORDER BY name DESC')
    return rows
  }
  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id
    if (!id) {
      return { success: false, error: 'ID не передан' }
    }
    await pool.query('DELETE FROM workers WHERE id = $1', [id])
    return { success: true }
  }
})
