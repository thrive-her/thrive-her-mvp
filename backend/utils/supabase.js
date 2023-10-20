import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const getSupabase = (userId) => {
  const options = {}

  if (userId) {
    const payload = {
      userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }
    const token = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET)

    options.global = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
   }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    options
  )
  return supabase
}

export { getSupabase }
