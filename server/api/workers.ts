import { defineEventHandler, getHeader, createError, getQuery } from 'h3'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kanban_system',
  port: 5432
})

interface Worker {
  id: number
  name: string
  surname: string
  post: string
}

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, "Authorization")
  const userID = authHeader ? Number(authHeader.replace('Bearer ', '')) : NaN
  if (isNaN(userID)) {
    throw createError({ statusCode: 401, statusMessage: 'Неавторизованный доступ' })
  }
  const method = event.method

  if (method === 'GET') {
    const { rows } = await pool.query(
      'SELECT id, name, surname, post FROM workers WHERE user_id = $1 ORDER BY name DESC',
      [userID]
    )
    return rows
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id

    if (!id) {
      return { success: false, error: 'ID не передан' }
    }

    await pool.query('DELETE FROM workers WHERE id = $1 AND user_id = $2',
      [id, userID]
    )
    return { success: true }
  }
})
