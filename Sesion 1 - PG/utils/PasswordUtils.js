import * as argon2 from 'argon2'

export const HashPassword = async (password) => {
  try {
    return await argon2.hash(password)
  } catch (err) {
    console.error(err)
  }
}

export const VerifyPassword = async (providedPassword, storedPassword) => {
  try {
    return await argon2.verify(storedPassword, providedPassword)
  } catch (err) {
    console.error(err)
  }
}
