import { defineEventHandler, readBody } from 'h3'
import { pool } from './pool'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, surname, post } = body

    await pool.query(`
    INSERT INTO workers (name, surname, post)
    VALUES ($1, $2, $3)
  `, [name, surname, post])

    return { success: true }
})
