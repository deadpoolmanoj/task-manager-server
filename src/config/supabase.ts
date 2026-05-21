import { createClient } from "@supabase/supabase-js";

const url =  'https://kixgynduprtgdtfdboqe.supabase.co'

const role_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeGd5bmR1cHJ0Z2R0ZmRib3FlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTExMTczNywiZXhwIjoyMDk0Njg3NzM3fQ.dnb5LumKDYF6EkGj_STa4pGrtwO_JA6vy5rTP8gU8w8'

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseUrl = url
const supabaseKey = role_key

export const supabase = createClient(supabaseUrl, supabaseKey);