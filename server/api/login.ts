import { defineEventHandler, readBody, createError } from 'h3'
import { pool } from './pool'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { login, password } = body

  const result = await pool.query('SELECT * FROM users WHERE login = $1', [login])

  if (result.rows.length === 0) {
    throw createError( {
      statusCode: 404,
      statusMessage: 'Пользователь не найден'
    })
  }

  const user = result.rows[0]

  if (user.password !== password) {
    throw createError( {
      statusCode: 401,
      statusMessage: 'Неверный пароль'
    })
  }

  return {
    user: {
      id: user.id,
      login: user.login,
      name: user.name,
      status: true,
    }
  }
})
