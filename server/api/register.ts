import { defineEventHandler, readBody } from 'h3'
import { pool } from './pool'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { login, password } = body

    await pool.query(`
    INSERT INTO users (login, password)
    VALUES ($1, $2)
  `, [login, password])

    return { success: true }
})
