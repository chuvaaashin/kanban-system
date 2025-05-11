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
    const { login, password } = body

    await pool.query(`
    INSERT INTO users (login, password)
    VALUES ($1, $2)
  `, [login, password])

    return { success: true }
})
