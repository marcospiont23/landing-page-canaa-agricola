/**
 * Módulo de Segurança - Canaã Soluções Agrícolas
 * Rate limiting, logging de eventos e proteção básica
 */

const SECURITY_CONFIG = {
    LOGIN_ATTEMPT_KEY: 'canaa_login_attempts',
    MAX_ATTEMPTS: 3,
    LOCKOUT_TIME: 5 * 60 * 1000, // 5 minutos
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutos
    SECURITY_LOGS_KEY: 'canaa_security_logs',
    MAX_LOGS: 100
};

/**
 * Obtém tentativas de login do localStorage
 */
function getLoginAttempts() {
    try {
        const data = localStorage.getItem(SECURITY_CONFIG.LOGIN_ATTEMPT_KEY);
        return data ? JSON.parse(data) : { count: 0, timestamp: 0 };
    } catch (e) {
        console.error('Erro ao ler tentativas de login:', e);
        return { count: 0, timestamp: 0 };
    }
}

/**
 * Salva tentativas de login no localStorage
 */
function setLoginAttempts(attempts) {
    try {
        localStorage.setItem(SECURITY_CONFIG.LOGIN_ATTEMPT_KEY, JSON.stringify(attempts));
    } catch (e) {
        console.error('Erro ao salvar tentativas de login:', e);
    }
}

/**
 * Verifica se a conta está bloqueada por rate limiting
 */
function isAccountLocked() {
    const attempts = getLoginAttempts();
    const now = Date.now();
    const timeSinceLock = now - attempts.timestamp;

    if (attempts.count >= SECURITY_CONFIG.MAX_ATTEMPTS && timeSinceLock < SECURITY_CONFIG.LOCKOUT_TIME) {
        return true;
    }

    if (timeSinceLock >= SECURITY_CONFIG.LOCKOUT_TIME) {
        setLoginAttempts({ count: 0, timestamp: 0 });
        return false;
    }

    return false;
}

/**
 * Registra uma tentativa de login falhada
 */
function recordFailedAttempt() {
    let attempts = getLoginAttempts();
    const now = Date.now();

    if (now - attempts.timestamp > SECURITY_CONFIG.LOCKOUT_TIME) {
        attempts = { count: 1, timestamp: now };
    } else {
        attempts.count += 1;
        attempts.timestamp = now;
    }

    setLoginAttempts(attempts);
}

/**
 * Limpa o registro de tentativas de login
 */
function clearLoginAttempts() {
    try {
        localStorage.removeItem(SECURITY_CONFIG.LOGIN_ATTEMPT_KEY);
    } catch (e) {
        console.error('Erro ao limpar tentativas:', e);
    }
}

/**
 * Registra evento de segurança no localStorage
 */
function logSecurityEvent(type, details = {}) {
    try {
        const event = {
            timestamp: new Date().toISOString(),
            type,
            details,
            userAgent: navigator.userAgent.substring(0, 100)
        };

        const logs = JSON.parse(localStorage.getItem(SECURITY_CONFIG.SECURITY_LOGS_KEY) || '[]');
        logs.push(event);
        
        // Guardar apenas últimos N eventos
        const trimmedLogs = logs.slice(-SECURITY_CONFIG.MAX_LOGS);
        localStorage.setItem(SECURITY_CONFIG.SECURITY_LOGS_KEY, JSON.stringify(trimmedLogs));
    } catch (e) {
        console.error('Erro ao registrar evento de segurança:', e);
    }
}

/**
 * Obtém logs de segurança
 */
function getSecurityLogs() {
    try {
        return JSON.parse(localStorage.getItem(SECURITY_CONFIG.SECURITY_LOGS_KEY) || '[]');
    } catch (e) {
        console.error('Erro ao obter logs de segurança:', e);
        return [];
    }
}

/**
 * Limpa todos os logs de segurança
 */
function clearSecurityLogs() {
    try {
        localStorage.removeItem(SECURITY_CONFIG.SECURITY_LOGS_KEY);
    } catch (e) {
        console.error('Erro ao limpar logs:', e);
    }
}

/**
 * Cria backup completo de dados do admin
 */
function createBackup() {
    try {
        const backup = {
            version: 1,
            timestamp: new Date().toISOString(),
            data: {
                products: localStorage.getItem('canaa_products'),
                settings: localStorage.getItem('canaa_admin_settings')
            },
            checksum: 'manual'
        };

        return JSON.stringify(backup, null, 2);
    } catch (e) {
        console.error('Erro ao criar backup:', e);
        return null;
    }
}

/**
 * Restaura dados de um backup
 */
function restoreBackup(backupData) {
    try {
        const backup = JSON.parse(backupData);

        if (backup.version !== 1) {
            throw new Error('Versão de backup incompatível');
        }

        if (backup.data.products) {
            localStorage.setItem('canaa_products', backup.data.products);
        }

        logSecurityEvent('backup_restored', { timestamp: backup.timestamp });

        return { success: true, message: 'Backup restaurado com sucesso!' };
    } catch (e) {
        console.error('Erro ao restaurar backup:', e);
        return { success: false, message: `Erro ao restaurar: ${e.message}` };
    }
}

/**
 * Valida força da senha
 */
function validatePasswordStrength(password) {
    const rules = {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumbers: /\d/.test(password),
        hasSpecial: /[!@#$%^&*]/.test(password)
    };

    const passed = Object.values(rules).filter(Boolean).length;
    const strength = passed < 2 ? 'fraca' : passed < 4 ? 'media' : 'forte';

    return { strength, rules, passed };
}

/**
 * Faz logout seguro
 */
async function secureLogout() {
    try {
        await window.supabaseClient?.auth.signOut();
        logSecurityEvent('admin_logout');
        
        sessionStorage.removeItem('canaa_session_start');
        
        return true;
    } catch (e) {
        console.error('Erro ao fazer logout:', e);
        return false;
    }
}

/**
 * Monitora timeout de inatividade
 */
function monitorSessionTimeout() {
    const SESSION_TIMEOUT = SECURITY_CONFIG.SESSION_TIMEOUT;
    let inactivityTimer;

    function resetTimer() {
        clearTimeout(inactivityTimer);
        
        inactivityTimer = setTimeout(async () => {
            console.warn('Sessão expirada por inatividade');
            logSecurityEvent('session_timeout', {});
            await secureLogout();
            window.location.href = './login.html';
        }, SESSION_TIMEOUT);
    }

    // Resetar timer em qualquer atividade
    ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'].forEach(event => {
        document.addEventListener(event, resetTimer, true);
    });

    // Iniciar timer
    resetTimer();
}

