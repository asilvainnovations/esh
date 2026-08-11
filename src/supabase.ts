import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://sjbdpedlfwwszvsnrspi.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFiZDViOTg0LTk4YzgtNGM3Yy05ZGYzLWMwZjc1NDg1YWYwNiJ9.eyJwcm9qZWN0SWQiOiJzamJkcGVkbGZ3d3N6dnNucnNwaSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc3NTQxNDk5LCJleHAiOjIwOTI5MDE0OTksImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.uhLI2urOMsbOmPXsueWZJsLtB1sVC7i_a6czL7IT9VU';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };