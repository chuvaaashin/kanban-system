import { defineEventHandler, getRouterParam, createError } from 'h3'
import { pool } from '@/server/api/pool'


export default defineEventHandler(async (event) => {
    const authHeader = getHeader(event, "Authorization")
    const userID = parseInt(authHeader?.replace(/^Bearer\s*/, '') || '', 10)

    const idParam = getRouterParam(event, 'id')
    const id = parseInt(idParam || '', 10)

    if (!authHeader || isNaN(userID)) {
      throw createError({ statusCode: 401, statusMessage: 'Неавторизованный доступ' })
    }

    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: 'Некорректный ID задачи' })
    }

    if (!userID || isNaN(Number(userID))) {
        throw createError({ statusCode: 401, statusMessage: 'Неавторизованный доступ' })
    }

    const { rows } = await pool.query(
      `SELECT 
        tasks.*, 
        orders.title as order_title, 
        workers.name as worker_name, 
        workers.surname as worker_surname 
      FROM tasks 
      LEFT JOIN orders ON tasks.order_id = orders.id 
      LEFT JOIN workers ON tasks.worker_id = workers.id 
      WHERE tasks.id = $1 AND tasks.user_id = $2
    `, [id, Number(userID)])


    if (rows.length === 0) {
        throw createError({ statusCode: 404, statusMessage: 'Задача не найдена' })
    }

    return rows[0]
})
