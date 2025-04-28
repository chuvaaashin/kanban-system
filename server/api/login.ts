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

  const result = await pool.query('SELECT * FROM users WHERE login = $1', [login])

  if (result.rows.length === 0) {
    return {
      statusCode: 400,
      body: { message: 'Пользователь не найден' }
    }
  }

  const user = result.rows[0]

  if (user.password !== password) {
    return {
      statusCode: 400,
      body: { message: 'Неверный пароль' }
    }
  }

  return {
    user: {
      login: user.email,
      name: user.name,
      status: true,
    }
  }
})
