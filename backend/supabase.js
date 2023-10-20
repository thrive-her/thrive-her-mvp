const { createClient } = require('@supabase/supabase-js')
const jwt = require('jsonwebtoken')

const getSupabase = () => {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
    )
   
    return supabase
}

module.exports = {getSupabase}


