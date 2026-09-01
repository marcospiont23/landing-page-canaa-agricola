# Guia Rápido - Começar em 5 Minutos

Para entrar em ação rapidamente! 🚀

---

## 1️⃣ Passo 1: Clone ou Download (1 min)

```bash
# Clone do repositório (se estiver no Git)
git clone https://github.com/seu-usuario/canaa-agricola.git
cd canaa-agricola

# OU extraia o arquivo ZIP se recebeu assim
unzip canaa-agricola.zip
cd canaa-agricola
```

---

## 2️⃣ Passo 2: Inicie um Servidor Local (1 min)

### Opção A: Python (mais comum)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Opção B: Node.js (se tiver)

```bash
# Instale se não tiver
npm install -g http-server

# Inicie
http-server
```

### Opção C: PHP (se tiver)

```bash
php -S localhost:8000
```

---

## 3️⃣ Passo 3: Acesse no Navegador (1 min)

Após iniciar o servidor, acesse:

- **Homepage**: http://localhost:8000
- **Painel Admin**: http://localhost:8000/admin.html
- **Login**: http://localhost:8000/login.html

---

## 4️⃣ Passo 4: Faça Login (1 min)

1. Abra http://localhost:8000/login.html
2. Sistema mostra credenciais de demonstração no console
3. Faça login com as credenciais de demo
4. Você verá o painel administrativo

---

## 5️⃣ Passo 5: Altere as Credenciais (1 min)

⚠️ **IMPORTANTE PARA PRODUÇÃO**

1. No painel admin, clique "⚙️ Conta & Acesso"
2. Altere para:
   - **E-mail**: seu-email@empresa.com.br
   - **Nova Senha**: Uma senha forte (8+ caracteres, números, símbolos)
3. Clique "Atualizar Dados"
4. **Guarde essas credenciais em local seguro**

---

## 6️⃣ Teste as Funcionalidades

### Adicionar Produto

1. Clique "➕ Novo Produto"
2. Preencha os dados
3. Clique "Salvar Produto"

### Adicionar ao Carrinho

1. Homepage → Adicione produto ao carrinho
2. Clique no ícone de carrinho
3. Finalize para enviar pedido via WhatsApp

### Exportar Backup

1. Admin → Clique "💾 Exportar Backup"
2. Arquivo JSON é baixado
3. **Guarde em local seguro**

---

## 📚 Documentação Completa

Após os primeiros passos, leia:

1. **[README.md](README.md)** - Visão geral do projeto
2. **[SEGURANCA.md](SEGURANCA.md)** - Guia de segurança (⚠️ LEIA antes de produção)
3. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Como fazer deploy
4. **[TESTING.md](TESTING.md)** - Testes completos
5. **[IMPLEMENTACAO-SEGURANCA.md](IMPLEMENTACAO-SEGURANCA.md)** - O que foi implementado

---

## ❓ Perguntas Frequentes

### P: Esqueci a senha admin
**R**: No painel do Supabase, acesse **Authentication > Users**, selecione o usuário administrador e redefina a senha.

### P: Como restaurar dados perdidos?
**R**: Use o backup importando arquivo `.json` via "📂 Importar Backup"

### P: Como colocar em produção?
**R**: Leia [DEPLOYMENT.md](DEPLOYMENT.md) para passo-a-passo

### P: Como aumentar a segurança?
**R**: Leia [SEGURANCA.md](SEGURANCA.md) - checklist completo

### P: Posso usar em dispositivo mobile?
**R**: Sim! Site é 100% responsivo. Funciona em celular/tablet.

### P: Qual é a melhor plataforma de hosting?
**R**: Leia tabela em [DEPLOYMENT.md](DEPLOYMENT.md)

### P: Como fazer backup regularizado?
**R**: A cada semana, clique "💾 Exportar Backup" e guarde o arquivo

---

## 🎯 Checklist Rápido

- [ ] Servidor iniciado localmente
- [ ] Páginas carregam sem erros
- [ ] Login funciona
- [ ] Produtos aparecem
- [ ] Carrinho funciona
- [ ] Admin panel acessível
- [ ] Credenciais alteradas
- [ ] Backup feito e guardado
- [ ] Documentação lida
- [ ] Pronto para produção?

---

## 🚀 Próximo: Deploy

Pronto para colocar em produção?

1. **Abra [DEPLOYMENT.md](DEPLOYMENT.md)**
2. Escolha sua plataforma:
   - Netlify (mais fácil)
   - Apache Shared Hosting
   - Nginx VPS
   - AWS/Azure/GCP
3. Siga passo-a-passo
4. Configure HTTPS (obrigatório)
5. Altere credenciais
6. Faça backup
7. Launch!

---

## 💡 Dicas Importantes

✅ **Sempre**: HTTPS em produção  
✅ **Sempre**: Alterar credenciais padrão  
✅ **Sempre**: Fazer backup regularizado  
✅ **Sempre**: Monitorar logs de segurança  

❌ **Nunca**: Deixar credenciais padrão  
❌ **Nunca**: Usar HTTP sem SSL  
❌ **Nunca**: Compartilhar credenciais por email  

---

## 📞 Precisa de Ajuda?

1. Verifique o console (F12 → Console)
2. Procure mensagem de erro
3. Leia [SEGURANCA.md](SEGURANCA.md)
4. Consulte [TESTING.md](TESTING.md)
5. Revise [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Bem-vindo ao Canaã Soluções Agrícolas!** 🌾

Qualquer dúvida, consulte a documentação completa acima.

Bom trabalho! 🚀
