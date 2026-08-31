# Guia de Deploy - Canaã Soluções Agrícolas

Instruções passo a passo para colocar o site em produção.

## 1. Preparação Pré-Deploy

### Checklist de Segurança

- [ ] Alterar credenciais administrativas padrão
- [ ] Revisar política de privacidade
- [ ] Fazer backup de todos os dados
- [ ] Testar todas as funcionalidades em ambiente local
- [ ] Verificar CSP headers (F12 → Console)
- [ ] Validar formulários e tratamento de erros
- [ ] Testar rate limiting (3 tentativas de login)
- [ ] Testar session timeout (30 min inatividade)

### Validação de Código

```bash
# Verificar sintaxe JavaScript
# (usando browser console ou ferramenta como JSHint)

# Verificar estrutura HTML
# Usar W3C HTML Validator: https://validator.w3.org/

# Verificar CSS
# Usar W3C CSS Validator: https://jigsaw.w3.org/css-validator/
```

---

## 2. Escolher Provedor de Hosting

### Opções Recomendadas para Site Estático

| Provedor | Plano Mínimo | HTTPS | Autoescala | Recomendado Para |
|----------|-------------|-------|-----------|-----------------|
| **Netlify** | Gratuito | ✅ | ✅ | Iniciantes, CDN global |
| **Vercel** | Gratuito | ✅ | ✅ | Performance máxima |
| **GitHub Pages** | Gratuito | ✅ | ✅ | Projetos simples |
| **AWS S3 + CloudFront** | $0.50-5/mês | ✅ | ✅ | Escalabilidade |
| **SiteGround** | ~R$50/mês | ✅ | ❌ | Shared hosting com suporte |
| **GoDaddy** | ~R$30/mês | ✅ | ❌ | Domínio + hosting |
| **Hostinger** | ~R$20/mês | ✅ | ❌ | Orçamento limitado |

### Requisitos Mínimos

- Suporte a HTTPS/SSL
- Reescrita de URL (URL rewriting)
- Headers HTTP customizáveis
- Suporte a .htaccess (Apache) ou configuração Nginx

---

## 3. Deploy no Netlify (Recomendado para Iniciantes)

### Passo 1: Preparar Repositório Git

```bash
# Inicialie Git no projeto (se não tiver)
git init

# Adicione todos os arquivos
git add .

# Commit inicial
git commit -m "Deploy inicial - Canaã Soluções Agrícolas"

# Crie repositório no GitHub
# https://github.com/new

# Adicione remote
git remote add origin https://github.com/seu-usuario/canaa-agricola.git

# Push para GitHub
git branch -M main
git push -u origin main
```

### Passo 2: Conectar Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique "Sign up" e conecte com GitHub
3. Clique "New site from Git"
4. Selecione seu repositório
5. Configure:
   - **Build command**: deixar em branco (site estático)
   - **Publish directory**: `.` (raiz do projeto)
6. Clique "Deploy site"

### Passo 3: Configurar Domínio

1. No Netlify, vá a "Domain settings"
2. Clique "Add custom domain"
3. Informe seu domínio (ex: canaa-agricola.com.br)
4. Siga as instruções para apontar DNS

### Passo 4: Configurar Headers (Netlify)

Crie arquivo `netlify.toml` na raiz:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
```

Commit e push:
```bash
git add netlify.toml
git commit -m "Adicionar configuração de headers"
git push
```

---

## 4. Deploy em Servidor Apache (VPS/Shared Hosting)

### Passo 1: Preparar Arquivos

```bash
# Compacte o projeto
zip -r canaa-agricola.zip .

# Ou use tar
tar -czf canaa-agricola.tar.gz .
```

### Passo 2: Upload via FTP/SFTP

Usando FileZilla ou similar:

1. Conecte ao servidor
2. Navegue até `/public_html/` (ou caminho configurado)
3. Upload de todos os arquivos
4. Defina permissões:
   - Arquivos: 644
   - Diretórios: 755

### Passo 3: Ativar HTTPS

**Usando Let's Encrypt (gratuito)**:

```bash
# SSH no servidor
ssh seu-usuario@seu-dominio.com.br

# Instalar Certbot
sudo apt-get install certbot python3-certbot-apache

# Gerar certificado
sudo certbot certonly --apache -d seu-dominio.com.br

# Certificado estará em:
# /etc/letsencrypt/live/seu-dominio.com.br/
```

### Passo 4: Configurar .htaccess

1. Crie arquivo `.htaccess` na raiz (já incluído no projeto)
2. Via FTP, upload como arquivo de texto
3. Verifique se o servidor Apache tem `mod_rewrite` habilitado

```bash
# SSH - verificar módulos
apache2ctl -M | grep rewrite

# Se não estiver habilitado
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Passo 5: Testar HTTPS

```bash
# SSH - testar certificado
sudo certbot renew --dry-run

# Verificar redirecionamento
curl -I http://seu-dominio.com.br

# Deve retornar 301 ou 302 para HTTPS
```

---

## 5. Deploy em Nginx (VPS Ubuntu/CentOS)

### Passo 1: Instalar Nginx

```bash
# Ubuntu
sudo apt-get update
sudo apt-get install nginx

# CentOS
sudo yum install nginx

# Iniciar serviço
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Passo 2: Upload de Arquivos

```bash
# Via SCP
scp -r ./canaa-agricola/* seu-usuario@seu-server:/var/www/canaa-agricola/

# Ou SSH + Git
ssh seu-usuario@seu-server
cd /var/www
git clone https://github.com/seu-usuario/canaa-agricola.git
```

### Passo 3: Configurar Nginx

Crie arquivo `/etc/nginx/sites-available/canaa-agricola`:

```bash
sudo nano /etc/nginx/sites-available/canaa-agricola
```

Cole a configuração do arquivo `nginx.conf.example` (adaptada para seu domínio).

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/canaa-agricola /etc/nginx/sites-enabled/

# Teste configuração
sudo nginx -t

# Reinicie
sudo systemctl restart nginx
```

### Passo 4: Configurar SSL (Let's Encrypt)

```bash
# Instalar Certbot
sudo apt-get install certbot python3-certbot-nginx

# Gerar certificado
sudo certbot --nginx -d seu-dominio.com.br

# Auto-renovar
sudo systemctl enable certbot.timer
```

---

## 6. Verificação Pós-Deploy

### Checklist de Funcionalidade

```bash
# 1. Verificar HTTPS
https://seu-dominio.com.br
# Deve mostrar cadeado verde

# 2. Testar redirecionamento HTTP → HTTPS
curl -I http://seu-dominio.com.br
# Deve retornar 301 ou 302

# 3. Verificar homepage
# Deve carregar sem erros

# 4. Testar admin
https://seu-dominio.com.br/admin.html
# Deve carregar login

# 5. Verificar CSP headers
# F12 → Network → clique em qualquer requisição → Response Headers
# Deve incluir Content-Security-Policy

# 6. Testar carrinho
# Adicionar produtos ao carrinho
# Verificar se funciona

# 7. Testar WhatsApp
# Clicar em "Finalizar Pedido"
# Deve abrir WhatsApp com mensagem formatada

# 8. Testar login
# Tentar fazer login com credenciais
# Deve redirecionar para admin.html

# 9. Testar rate limiting
# Tentar login 3x com senha errada
# Na 4ª vez deve mostrar "muitas tentativas"

# 10. Verificar logs (admin.html)
# F12 → Console → copiar e colar:
console.table(JSON.parse(localStorage.getItem('canaa_security_logs')))
```

### Verificação de Performance

```bash
# Usar Google PageSpeed Insights
https://pagespeed.web.dev/

# Verificar SEO
https://www.seobility.net/

# Testar em múltiplos dispositivos
# Desktop, tablet, mobile
```

### Verificação de Segurança

```bash
# SSL Labs
https://www.ssllabs.com/ssltest/

# Security Headers
https://securityheaders.com/

# Mozilla Observatory
https://observatory.mozilla.org/
```

---

## 7. Manutenção Contínua

### Atualizações e Monitoramento

```bash
# Backup semanal
cron job para exportar backup automaticamente

# Monitorar logs
# SSH para revisar erro logs regularmente

# Renovar certificados SSL
# Let's Encrypt renova automaticamente com Certbot

# Revisar logs de segurança
# Via painel admin - localStorage.canaa_security_logs
```

### Escalabilidade Futura

Se tráfego crescer:

1. **Migrar para CDN** (Cloudflare, AWS CloudFront)
2. **Adicionar cache** (Redis, Varnish)
3. **Implementar backend** (Node.js, PHP) para dados dinâmicos
4. **Usar banco de dados** (MongoDB, PostgreSQL)
5. **Aumentar recursos** (upgrade VPS)

---

## 8. Rollback e Recuperação

### Se algo der errado

```bash
# Restaurar de backup
# Via painel admin: 📂 Importar Backup

# Se perder acesso ao admin
# Limpar localStorage via console:
localStorage.removeItem('canaa_admin_logged');
localStorage.removeItem('canaa_admin_user');
localStorage.removeItem('canaa_admin_pass');
location.reload();

# Se tiver acesso SSH
# Restaurar versão anterior do Git
git revert <commit-hash>
git push
```

---

## 9. Contato e Suporte

Dúvidas sobre deploy? Consulte:

- 📖 **Documentação de segurança**: [SEGURANCA.md](SEGURANCA.md)
- 📄 **README**: [README.md](README.md)
- 🌐 **Netlify Docs**: https://docs.netlify.com/
- 🌐 **Nginx Docs**: https://nginx.org/en/docs/
- 🌐 **Apache Docs**: https://httpd.apache.org/docs/

---

**Última atualização**: 2024  
**Versão**: 1.0  
Bom deploy! 🚀
