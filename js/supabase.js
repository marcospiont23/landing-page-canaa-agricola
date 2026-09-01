const SUPABASE_URL = 'https://sjoxvmfmofdyecqnzhfe.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_xWnQ6DPz67SgKo3saBGwIA_HavE9v_Q';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	}
});