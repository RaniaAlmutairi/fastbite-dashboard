import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://ycegxdwxicsdyyjdqxur.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljZWd4ZHd4aWNzZHl5amRxeHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NTkyNjAsImV4cCI6MjA2OTUzNTI2MH0._Pq1xC3dj1g6UxDiRXKN72IJT9bZLptYMLCkRNwB908";


export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    },
});
