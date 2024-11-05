
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wkznfjfyqcmbxyaoftnx.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrem5mamZ5cWNtYnh5YW9mdG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NjM5MjEsImV4cCI6MjA0NjEzOTkyMX0.j5LIXMu60RrXitVc52VUj3IbVLTwaZpaujdI4BHUY3c"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;