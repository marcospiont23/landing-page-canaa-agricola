if (sessionStorage.getItem('canaa_admin_logged') === 'true') {
	window.location.href = './admin.html';
}

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

loginForm.addEventListener('submit', (event) => {
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

	const validUser = localStorage.getItem('canaa_admin_user');
	const validPass = localStorage.getItem('canaa_admin_pass');

	if (!validUser || !validPass) {
		showLoginAlert('Sistema não configurado. Contate o administrador.', 'error');
		return;
	}

	if (username.toLowerCase() === validUser.toLowerCase() && password === validPass) {
		clearLoginAttempts();
		showLoginAlert('Autenticado com sucesso! Redirecionando...', 'info');

		sessionStorage.setItem('canaa_admin_logged', 'true');
		sessionStorage.setItem('canaa_session_start', new Date().toISOString());
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