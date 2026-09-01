const loginForm = document.getElementById('login-form');
const alertBox = document.getElementById('login-alert');
const togglePasswordButton = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

function showLoginAlert(message, type) {
	alertBox.className = `login-alert ${type}`;
	alertBox.textContent = message;
	alertBox.style.display = 'flex';
}

togglePasswordButton.addEventListener('click', () => {
	const isPassword = passwordInput.type === 'password';
	passwordInput.type = isPassword ? 'text' : 'password';
	togglePasswordButton.textContent = isPassword ? 'Ocultar senha' : 'Mostrar senha';
});

async function redirectIfAuthenticated() {
	const { data: { session } } = await window.supabaseClient.auth.getSession();
	if (session) window.location.replace('./admin.html');
}

redirectIfAuthenticated();

loginForm.addEventListener('submit', async (event) => {
	event.preventDefault();

	if (isAccountLocked()) {
		showLoginAlert('Muitas tentativas falhadas. Tente novamente em 5 minutos.', 'error');
		return;
	}

	const username = document.getElementById('username').value.trim();
	const password = passwordInput.value;

	if (!username || !password) {
		showLoginAlert('Por favor, preencha todos os campos.', 'error');
		return;
	}

	const { error } = await window.supabaseClient.auth.signInWithPassword({
		email: username,
		password
	});

	if (!error) {
		clearLoginAttempts();
		showLoginAlert('Autenticado com sucesso! Redirecionando...', 'info');
		logSecurityEvent('admin_login', { email: username, success: true });

		setTimeout(() => {
			window.location.href = './admin.html';
		}, 600);
		return;
	}

	recordFailedAttempt();
	const attempts = getLoginAttempts();
	const remaining = Math.max(0, SECURITY_CONFIG.MAX_ATTEMPTS - attempts.count);
	showLoginAlert(
		remaining > 0
			? `Credenciais incorretas. Tentativas restantes: ${remaining}`
			: 'Muitas tentativas falhadas. Tente novamente em 5 minutos.',
		'error'
	);
	logSecurityEvent('admin_login', { email: username, success: false });
	passwordInput.value = '';
	passwordInput.focus();
});