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
      ORDER BY orders.id DESC
    `)

    // Вычисление прогресса
    const ordersWithProgress = rows.map(order => {
      const progress = order.total_tasks > 0 ? (order.completed_tasks / order.total_tasks) * 100 : 0
      return {
        ...order,
        progress: Math.round(progress)
      }
    })

    return ordersWithProgress
  }
})
