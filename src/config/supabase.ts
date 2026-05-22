import { createClient } from "@supabase/supabase-js";

const role_key = process.env.SUPABASE_ROLE_KEY || ''

const supabaseUrl = process.env.SUPABASE_URL || ''

export const supabase = createClient(supabaseUrl, role_key);