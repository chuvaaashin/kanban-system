import { defineEventHandler, readBody, createError } from 'h3'
import { pool } from './pool'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password } = body

  if (!login || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Логин и пароль обязательны',
    })
  }

  const result = await pool.query('SELECT * FROM users WHERE login = $1', [login])
  if (result.rows.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Пользователь не найден',
    })
  }

  await pool.query(`
    UPDATE users
    SET password = $1
    WHERE login = $2
  `, [password, login])

  return { success: true }
})
