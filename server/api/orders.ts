import { defineEventHandler, readBody, getRouterParam, createError } from 'h3'
import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'kanban_system',
  port: 5432
})

export default defineEventHandler(async (event) => {
  const method = event.method
  const userId = getHeader(event, "Authorization")?.replace(`Bearer `, '')
  if (method === 'GET') {
    const { rows } = await pool.query(`
      SELECT
        orders.id,
        orders.title,
        orders.description,
        COALESCE(
            (SELECT COUNT(*) FROM tasks WHERE tasks.order_id = orders.id AND tasks.status = 'done'),
            0
        ) as completed_tasks,
        (SELECT COUNT(*) FROM tasks WHERE tasks.order_id = orders.id) as total_tasks
      FROM orders
      WHERE orders.user_id = $1\
      ORDER BY orders.id DESC`,[Number(userId)])

    const ordersWithProgress = rows.map(order => {
      const progress = order.total_tasks > 0 ? (order.completed_tasks / order.total_tasks) * 100 : 0
      return {
        ...order,
        progress: Math.round(progress)
      }
    })

    return ordersWithProgress
  }

  if (method === 'POST') {
    const body = await readBody(event)
    const { title, description } = body

    if (!title || !description) {
      throw createError({ statusCode: 400, statusMessage: 'Название и описание обязательны' })
    }

    const { rows } = await pool.query(`
      INSERT INTO orders (title, description)
      VALUES ($1, $2)
      RETURNING id, title, description
    `, [title, description])

    return rows[0]
  }

  if (method === 'DELETE') {
    const query = getQuery(event)
    const id = query.id

    if (!id) {
      return { success: false, error: 'ID не передан' }
    }

    const result = await pool.query(`
      DELETE FROM orders WHERE id = $1 AND NOT EXISTS (
        SELECT 1 FROM tasks WHERE tasks.order_id = orders.id
      ) RETURNING id
    `, [id])

    if (result.rowCount === 0) {
      throw createError({ statusCode: 400, statusMessage: 'Цель не найдена или она используется в задачах' })
    }

    return { success: true }
  }

  throw createError({ statusCode: 405, statusMessage: 'Метод не поддерживается' })
})
