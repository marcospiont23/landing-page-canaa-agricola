const SUPABASE_URL = 'https://wmvpzooubmaximjplcgt.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ac2q_kdmvI2d42oGQVdfHw_1PiFUQKt';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	}
});