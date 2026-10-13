import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwuztvqcpivcusypwkft.supabase.co';
const supabaseAnonKey = 'sb_publishable_xiF9rhFKUZ8oE1XIg1VXpw_opqK96Ej';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);