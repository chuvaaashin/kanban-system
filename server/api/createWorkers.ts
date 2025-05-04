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
    const { name, surname, post } = body

    await pool.query(`
    INSERT INTO workers (name, surname, post)
    VALUES ($1, $2, $3)
  `, [name, surname, post])

    return { success: true }
})
