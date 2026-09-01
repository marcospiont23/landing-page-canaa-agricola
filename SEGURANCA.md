# Segurança e Proteção de Dados - Canaã Soluções Agrícolas

## ⚠️ Informações Críticas de Segurança

Este documento descreve os recursos de segurança implementados e as melhores práticas para operação segura do sistema administrativo.

---

## 1. Configuração Inicial Obrigatória

### Alterar Credenciais Padrão

**IMPORTANTE**: Antes de colocar o sistema em produção, você DEVE alterar as credenciais padrão:

1. Acesse `login.html` via navegador
2. O sistema detectará que não há credenciais configuradas e inicializará com um usuário e senha de demonstração
3. Faça login com essas credenciais temporárias
4. No painel administrativo, clique em "⚙️ Conta & Acesso"
5. Altere o e-mail e a senha para seus valores reais
6. **Guarde em local seguro** (gerenciador de senhas recomendado)

### Geração de Senha Forte

Use uma combinação de:
- Mínimo 8 caracteres
- Letras maiúsculas e minúsculas
- Números
- Caracteres especiais (!@#$%^&*)

**Exemplo válido**: `Admin@2024!Seguro`

---

## 2. Proteção Contra Ataque de Força Bruta

### Rate Limiting em Login

O sistema implementa proteção automática contra tentativas de login repetidas:

- **Limite**: 3 tentativas incorretas
- **Tempo de bloqueio**: 5 minutos
- **Mensagem exibida**: "Muitas tentativas falhadas. Tente novamente em 5 minutos."

A contagem é zerada automaticamente após 5 minutos.

**Monitoramento**: Os eventos de login (sucesso e falha) são registrados em logs de segurança.

---

## 3. Timeout de Sessão

### Proteção por Inatividade

Para prevenir roubo de sessão:

- **Limite de inatividade**: 30 minutos
- **Hard limit de sessão**: 1 hora (após login)
- **Ação**: Logout automático e redirecionamento para login

Qualquer interação (clique, digitação, scroll) reseta o timer de 30 minutos.

---

## 4. Headers de Segurança

### Content-Security-Policy (CSP)

Implementado em todas as páginas HTML:

```
default-src 'self'
script-src 'self'
style-src 'self' 'unsafe-inline'
img-src 'self' https: data:
base-uri 'self'
form-action 'self'
```

**Benefícios**:
- Previne injeção de scripts maliciosos
- Bloqueia carregamento de recursos de origens não autorizadas
- Protege contra ataques XSS (Cross-Site Scripting)

---

## 5. Armazenamento Seguro de Dados

### Dados no LocalStorage

O sistema usa `localStorage` para:
- Catálogo de produtos
- Credenciais administrativas (⚠️ ver seção abaixo)
- Logs de segurança (últimos 100 eventos)

### ⚠️ Limitações Críticas

**LocalStorage é armazenamento do navegador CLIENT-SIDE**, não seguro para:
- Senhas não devem ser salvas em texto plano (uso atual é apenas para demonstração)
- Dados sensíveis não devem ser expostos

**Para produção com dados sensíveis**:
- Implemente backend com autenticação criptografada
- Use JWT com tokens com expiração
- Implemente HTTPS obrigatório
- Use cookies HttpOnly com flag Secure

---

## 6. Backup e Recuperação

### Exportar Backup

No painel administrativo, clique em **"💾 Exportar Backup"**:

- Cria arquivo JSON com todos os dados
- Nome: `canaa-backup-YYYY-MM-DD.json`
- Contém: catálogo de produtos e configurações

### Restaurar Backup

Clique em **"📂 Importar Backup"**:

1. Selecione arquivo `.json` previamente exportado
2. Sistema valida integridade
3. Página recarrega com dados restaurados
4. Evento é registrado em logs de segurança

**Boas práticas**:
- Faça backup regularmente (mínimo 1x por semana)
- Armazene backups em local seguro (cloud, disco externo criptografado)
- Teste restauração periodicamente

---

## 7. Logging de Eventos de Segurança

### Eventos Registrados

O sistema registra automaticamente:

| Evento | Detalhes |
|--------|----------|
| Admin Login | Sucesso/Falha, e-mail, timestamp |
| Logout | E-mail, timestamp |
| Produto Adicionado | Nome, categoria |
| Produto Editado | Nome, categoria |
| Produto Deletado | Nome, categoria |
| Senha Alterada | E-mail |
| Backup Criado | Timestamp |
| Backup Restaurado | Timestamp |
| Catálogo Resetado | Timestamp |
| Timeout de Sessão | - |

### Acessar Logs

Os logs são armazenados em `localStorage` com chave `canaa_security_logs` (limite de 100 eventos).

**Via console do navegador**:
```javascript
console.table(JSON.parse(localStorage.getItem('canaa_security_logs')))
```

---

## 8. Configuração do Servidor (HTTPS/Apache)

### Arquivo `.htaccess` (Apache)

Crie arquivo `.htaccess` na raiz do projeto:

```apache
# Redirecionar HTTP para HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Headers de Segurança
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Referrer-Policy "strict-origin-when-cross-origin"

# Bloquear acesso a arquivos sensíveis
<FilesMatch "\.env|\.git|\.json$">
    Require all denied
</FilesMatch>

# Cache control
<FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Desabilitar directory listing
Options -Indexes
```

### Configuração Nginx

Se usar Nginx, adicione ao bloco `server`:

```nginx
# Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name seu-dominio.com.br;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com.br;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Headers de Segurança
    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # Bloquear acesso a sensíveis
    location ~ /\. {
        deny all;
    }
    location ~ \.env$ {
        deny all;
    }
}
```

---

## 9. Checklist de Segurança Pré-Produção

- [ ] Alterar e-mail administrativo padrão
- [ ] Alterar senha administrativo para valor forte
- [ ] Configurar HTTPS no servidor
- [ ] Criar arquivo `.htaccess` ou configurar Nginx
- [ ] Fazer backup inicial dos dados
- [ ] Testar restauração de backup
- [ ] Verificar rate limiting (tentar 3+ logins com senha errada)
- [ ] Verificar timeout de sessão (30 minutos de inatividade)
- [ ] Testar CSP headers (F12 → Console → sem erros CSP)
- [ ] Revisar logs de segurança no localStorage
- [ ] Configurar política de backup regularizado
- [ ] Documentar credenciais em local seguro (ex: 1Password, Bitwarden)
- [ ] Revisar permissões de arquivo no servidor (644 para HTML, 755 para diretórios)
- [ ] Desabilitar directory listing (`Options -Indexes`)
- [ ] Implementar monitoramento de falhas de login

---

## 10. Resposta a Incidentes

### Se Detectar Acesso Não Autorizado

1. **Imediatamente**:
   - Alterar senha administrativo
   - Fazer logout de todas as sessões
   - Fazer backup dos dados atuais

2. **Investigação**:
   - Revisar logs de segurança (`canaa_security_logs`)
   - Verificar histórico de produtos alterados/deletados
   - Documentar hora e detalhes do incidente

3. **Recuperação**:
   - Se dados foram comprometidos, restaurar de backup confiável
   - Se possível, identificar origem de acesso não autorizado
   - Aumentar segurança: senha mais forte, 2FA (quando disponível)

### Se Esquecer a Senha

1. Acesse o painel do Supabase.
2. Abra **Authentication > Users**.
3. Selecione o usuário administrador e redefina a senha.
4. Faça login novamente no painel administrativo.

---

## 11. Melhorias Futuras Recomendadas

Para maior segurança em futuras versões:

- [x] Implementar autenticação com Supabase Auth
- [x] Usar sessões com tokens de expiração gerenciados pelo Supabase
- [ ] Adicionar autenticação de dois fatores (2FA)
- [ ] Implementar criptografia end-to-end para dados
- [ ] Adicionar webhooks para notificações de segurança
- [ ] Implementar rate limiting por IP
- [ ] Adicionar CAPTCHA após múltiplas falhas
- [ ] Monitoramento em tempo real de atividades suspeitas

---

## 12. Contato e Suporte

Para questões de segurança ou dúvidas:

📧 **E-mail**: contato@empresa.com.br  
📱 **WhatsApp**: Disponível na página de contato  
🌐 **Website**: [seu-dominio.com.br](https://seu-dominio.com.br)

---

**Última atualização**: $(date)  
**Versão**: 1.0  
**Status**: Segurança em Produção

⚠️ Leia este documento completamente antes de colocar o sistema em produção.
