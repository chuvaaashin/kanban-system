import { defineEventHandler, readBody, createError } from 'h3'
import { Pool } from 'pg'
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kanban_system',
    password: '',
    port: 5432,
})

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { id, status } = body
    if (!id || !status) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing id or status in request body',
        })
    }
    const validStatuses = ['backlog', 'in_progress', 'paused', 'done']
    if (!validStatuses.includes(status)) {
        throw createError({
            statusCode: 400,
            statusMessage: `Invalid status. Allowed values: ${validStatuses.join(', ')}`,
        })
    }
    try {
        const result = await pool.query(
            'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        )
        if (result.rowCount === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Task not found',
            })
        }
        return { success: true, task: result.rows[0] }
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update task',
            data: error,
        })
    }
})