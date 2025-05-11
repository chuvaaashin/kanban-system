import { defineEventHandler, getRouterParam, createError } from 'h3'
import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kanban_system',
    port: 5432,
})

export default defineEventHandler(async (event) => {
    const idParam = getRouterParam(event, 'id')
    const id = parseInt(idParam || '', 10)

    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: 'Некорректный ID задачи' })
    }

    const { rows } = await pool.query(`
  SELECT 
    tasks.*, 
    orders.title as order_title, 
    workers.name as worker_name, 
    workers.surname as worker_surname 
  FROM tasks 
  LEFT JOIN orders ON tasks.order_id = orders.id 
  LEFT JOIN workers ON tasks.worker_id = workers.id 
  WHERE tasks.id = $1
`, [id])


    if (rows.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Задача не найдена' })
    }

    return rows[0]
})
