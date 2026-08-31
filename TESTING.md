# Guia de Testes - Canaã Soluções Agrícolas

Verificação completa de todas as funcionalidades e recursos de segurança.

---

## 1. Testes de Funcionalidade Básica

### 1.1 Homepage (index.html)

- [ ] Página carrega sem erros
- [ ] Logo é exibido e clicável
- [ ] Menu mobile funciona (em telas pequenas)
- [ ] Menu fecha ao clicar em link
- [ ] Menu fecha ao pressionar ESC
- [ ] Menu fecha ao clicar fora
- [ ] Categorias de produtos aparecem
- [ ] Carrinho funciona (adicionar/remover itens)
- [ ] Footer é exibido
- [ ] Link WhatsApp funciona

**Resultado**: ⬜ Passou / ⬜ Falhou / ⬜ Não testado

---

### 1.2 Política de Privacidade (politica-de-privacidade.html)

- [ ] Página carrega sem erros
- [ ] Menu funciona
- [ ] Todas as 9 seções são exibidas
- [ ] Links de navegação funcionam
- [ ] Back-to-home button funciona
- [ ] Conteúdo é legível

**Resultado**: ⬜ Passou / ⬜ Falhou / ⬜ Não testado

---

## 2. Testes de Login (login.html)

### 2.1 Login Normal

1. Acesse `login.html`
2. Observe que sistema mostra credenciais de demonstração
3. Digite credenciais de demonstração
4. Clique "Entrar"
5. Deve redirecionar para `admin.html`

- [ ] Redirecionamento funcionou
- [ ] Alert mostrou "Autenticado com sucesso!"
- [ ] Sem erros no console

**Resultado**: ⬜ Passou / ⬜ Falhou

### 2.2 Credenciais Incorretas

1. Retorne ao `login.html` (logout se necessário)
2. Digite e-mail correto + senha errada
3. Clique "Entrar"
4. Observe contador de tentativas

- [ ] Alert mostrou "E-mail ou senha incorretos"
- [ ] Mostrou "Tentativas restantes: 2"
- [ ] Campo de senha foi limpo
- [ ] Cursor retornou ao campo de senha

**Resultado**: ⬜ Passou / ⬜ Falhou

### 2.3 Toggle de Senha

1. Na tela de login
2. Clique no ícone de olho (toggle password)
3. Verifique se a senha fica visível (tipo text)
4. Clique novamente
5. Verifique se fica oculta (tipo password)

- [ ] Toggle funcionou (👁️ ↔️ 🙈)
- [ ] Senha ficou visível
- [ ] Senha ficou oculta

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 3. Testes de Rate Limiting

### ⚠️ IMPORTANTE: Este teste bloqueará seu acesso por 5 minutos

1. Acesse `login.html`
2. **Tente fazer login 3x com senha INCORRETA**
   - Tentativa 1: Digite e-mail + senha errada → "Tentativas restantes: 2"
   - Tentativa 2: Digite e-mail + senha errada → "Tentativas restantes: 1"
   - Tentativa 3: Digite e-mail + senha errada → "Tentativas restantes: 0"
3. Na 4ª tentativa: clique Entrar
4. Deve aparecer: "Muitas tentativas falhadas. Tente novamente em 5 minutos."

- [ ] Contador decrementou corretamente
- [ ] Message de bloqueio apareceu na 4ª tentativa
- [ ] Não conseguiu fazer login bloqueado
- [ ] Botão Entrar continua desabilitado por 5 min

**Após 5 minutos:**
5. Recarregue a página (F5)
6. Tente fazer login com senha incorreta
7. Contador deve ser zerado: "Tentativas restantes: 2"

- [ ] Contador foi zerado após timeout
- [ ] Pode tentar login novamente

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 4. Testes de Painel Administrativo (admin.html)

### 4.1 Acesso ao Painel

1. Acesse `admin.html` diretamente (sem fazer login)
2. Deve redirecionar para `login.html`
3. Faça login com credenciais corretas
4. Deve redirecionar para `admin.html`

- [ ] Proteção de rota funcionou
- [ ] Redirecionamento funcionou
- [ ] Painel carregou após login

**Resultado**: ⬜ Passou / ⬜ Falhou

### 4.2 Métricas do Dashboard

1. No painel admin, observe as 4 cards de métricas:
   - Total de Produtos
   - Fertilizantes
   - Adubos
   - Defensivos
   - Implementos

- [ ] Todos os cards aparecem
- [ ] Números são maiores que 0
- [ ] Contagem parece correta

**Resultado**: ⬜ Passou / ⬜ Falhou

### 4.3 Tabela de Produtos

1. Observe a tabela mostrando produtos
2. Verifique colunas: Imagem, Nome, Descrição, Categoria, Ações
3. Clique em um produto (edit icon 📝)
4. Modal de edição deve abrir

- [ ] Tabela exibe produtos
- [ ] Descrições aparecem (ou "Sem especificações" em cinza)
- [ ] Buttons de ação aparecem
- [ ] Modal abre ao clicar editar

**Resultado**: ⬜ Passou / ⬜ Falhou

### 4.4 Adicionar Novo Produto

1. Clique "➕ Novo Produto"
2. Modal de adição abre
3. Preencha:
   - Categoria: Fertilizantes
   - Nome: "Produto Teste 123"
   - Descrição: "Descrição de teste"
   - Imagem: Escolha uma ou upload
4. Clique "Salvar Produto"
5. Toast de sucesso aparece
6. Volte à tabela e procure o novo produto

- [ ] Modal abriu
- [ ] Todos os campos puderam ser preenchidos
- [ ] Toast mostrou sucesso
- [ ] Produto aparece na tabela
- [ ] Contagem de produtos aumentou

**Resultado**: ⬜ Passou / ⬜ Falhou

### 4.5 Editar Produto

1. Clique no ícone de edição (📝) de um produto
2. Modal de edição abre com dados preenchidos
3. Altere o nome: adicione " EDITADO" ao final
4. Clique "Salvar Produto"
5. Procure o produto na tabela

- [ ] Modal abriu com dados existentes
- [ ] Alteração foi salva
- [ ] Toast de sucesso apareceu
- [ ] Nome atualizado na tabela
- [ ] Evento registrado em logs

**Resultado**: ⬜ Passou / ⬜ Falhou

### 4.6 Deletar Produto

1. Clique no ícone de deletar (🗑️) de um produto
2. Modal de confirmação abre
3. Clique "Confirmar Exclusão"
4. Procure na tabela

- [ ] Modal de confirmação apareceu
- [ ] Nome do produto foi mostrado
- [ ] Produto foi removido da tabela
- [ ] Contagem de produtos diminuiu
- [ ] Toast mostrou sucesso

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 5. Testes de Segurança

### 5.1 Credenciais e Senha

1. No admin, clique "⚙️ Conta & Acesso"
2. Modal abre
3. Altere para novos valores:
   - E-mail: seu-email@empresa.com.br
   - Nova Senha: Senha@123!Forte
4. Digite novamente a nova senha (confirmação)
5. Clique "Atualizar Dados"
6. Toast de sucesso

- [ ] Modal abriu
- [ ] Toast mostrou sucesso
- [ ] Logout automático ocorreu (se configurado)
- [ ] Novo login funciona com novas credenciais

**Resultado**: ⬜ Passou / ⬜ Falhou

### 5.2 Logs de Segurança

1. F12 → Console (developer tools)
2. Cole: `JSON.parse(localStorage.getItem('canaa_security_logs'))`
3. Pressione Enter
4. Deve aparecer array com eventos

Procure por eventos como:
- `admin_login` (seu login)
- `product_added` (produtos que adicionou)
- `product_deleted` (produtos que deletou)
- `admin_password_changed` (senha alterada)

- [ ] Logs aparecem
- [ ] Eventos são registrados corretamente
- [ ] Timestamps fazem sentido
- [ ] Últimas ações aparecem

**Resultado**: ⬜ Passou / ⬜ Falhou

### 5.3 CSP Headers

1. F12 → Network tab
2. Recarregue a página (F5)
3. Clique no primeiro request (admin.html ou qualquer página)
4. Abra "Response Headers"
5. Procure por "Content-Security-Policy"
6. Verifique a diretiva completa

- [ ] Header existe nas respostas
- [ ] Contém `default-src 'self'`
- [ ] Sem erros de CSP no console
- [ ] Elementos carregam normalmente

**Resultado**: ⬜ Passou / ⬜ Falhou

### 5.4 Session Timeout (30 minutos)

⚠️ Este teste leva 30 minutos. Abreviado para teste:

1. Acesse admin.html (faça login se necessário)
2. Não interaja com a página
3. Aguarde ~30 minutos ou force timeout via JS:
   ```javascript
   // No console
   // Simular 31 minutos de inatividade
   const start = sessionStorage.getItem('canaa_session_start');
   const newStart = new Date(Date.now() - 31 * 60 * 1000).toISOString();
   sessionStorage.setItem('canaa_session_start', newStart);
   // Recarregue a página
   location.reload();
   ```
4. Deve redirecionar para login.html

- [ ] Após 30 min de inatividade, foi feito logout
- [ ] Redirecionou para login.html
- [ ] Event logging registrou o timeout

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 6. Testes de Backup e Restore

### 6.1 Exportar Backup

1. No admin, clique "💾 Exportar Backup"
2. Arquivo JSON é baixado
3. Observe nome do arquivo: `canaa-backup-YYYY-MM-DD.json`
4. Abra o arquivo em editor de texto

- [ ] Arquivo foi baixado
- [ ] Nome contém data
- [ ] Conteúdo é JSON válido
- [ ] Contém dados de produtos

**Resultado**: ⬜ Passou / ⬜ Falhou

### 6.2 Restaurar Backup

1. **Antes**: Adicione um novo produto e anote os dados
2. No admin, clique "📂 Importar Backup"
3. Dialog de file upload aparece
4. Selecione o arquivo backup baixado em 6.1
5. Toast mostra sucesso
6. Página recarrega

- [ ] Dialog de upload apareceu
- [ ] Arquivo foi aceito
- [ ] Toast mostrou "Backup restaurado com sucesso!"
- [ ] Página recarregou
- [ ] Produtos foram restaurados para versão no backup

**Resultado**: ⬜ Passou / ⬜ Falhou

### 6.3 Restaurar Padrões

1. No admin, clique "🔄 Restaurar Padrões"
2. Confirmação: "Tem certeza de que deseja restaurar..."
3. Clique "OK"
4. Toast de sucesso
5. Verifique tabela

- [ ] Confirmação apareceu
- [ ] Toast mostrou sucesso
- [ ] Produtos voltaram aos padrões originais
- [ ] Métricas atualizaram

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 7. Testes de Logout

### 7.1 Logout Seguro

1. No admin, clique "🚪 Sair"
2. Confirmação: "Deseja sair?"
3. Clique "OK"
4. Deve redirecionar para login.html

- [ ] Confirmação apareceu
- [ ] Redirecionamento funcionou
- [ ] sessionStorage foi limpo (F12 → Application → sessionStorage)
- [ ] Event de logout foi registrado

**Resultado**: ⬜ Passou / ⬜ Falhou

### 7.2 Acesso Negado Após Logout

1. Após logout, tente acessar admin.html diretamente na URL
2. Deve redirecionar para login.html

- [ ] Proteção de rota funcionou
- [ ] Impossível acessar admin sem login

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 8. Testes de Responsividade

### 8.1 Mobile (320px width)

1. F12 → Toggle device toolbar
2. Selecione "iPhone SE" ou ajuste para 320px
3. Teste em cada página:
   - Homepage
   - Login
   - Admin
   - Privacy Policy

- [ ] Menu funciona em mobile
- [ ] Conteúdo é legível
- [ ] Buttons são clicáveis
- [ ] Forms são usáveis

**Resultado**: ⬜ Passou / ⬜ Falhou

### 8.2 Tablet (768px width)

1. Ajuste device para 768px (iPad)
2. Teste layout

- [ ] Layout ajusta bem
- [ ] Sem overflow
- [ ] Legibilidade mantida

**Resultado**: ⬜ Passou / ⬜ Falhou

### 8.3 Desktop (1920px width)

1. Maximize janela
2. Teste em resolução grande

- [ ] Layout utiliza espaço bem
- [ ] Sem distorções
- [ ] Elementos não quebram

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 9. Testes de Browser

- [ ] Chrome/Chromium (versão atual)
- [ ] Firefox (versão atual)
- [ ] Safari (se macOS disponível)
- [ ] Edge (se Windows disponível)

Funcionalidades a validar em cada browser:
- [ ] Login funciona
- [ ] Rate limiting funciona
- [ ] Modals aparecem
- [ ] Carrinho funciona
- [ ] WhatsApp link funciona

---

## 10. Testes de Performance

### 10.1 Carregamento de Página

1. F12 → Network tab
2. Recarregue página
3. Observe tempos

- [ ] Tempo total < 3 segundos
- [ ] Sem requisições falhadas (erro 404, 500)
- [ ] Cache headers estão configurados

**Resultado**: ⬜ Passou / ⬜ Falhou

### 10.2 Performance de Recursos

1. F12 → Performance tab (ou Lighthouse)
2. Execute teste
3. Observe scores

- [ ] Performance score > 80
- [ ] Accessibility score > 80
- [ ] Best Practices score > 80

**Resultado**: ⬜ Passou / ⬜ Falhou

---

## 11. Resumo de Resultados

| Categoria | Total Testes | Passaram | Falharam | Resultado |
|-----------|-------------|----------|----------|-----------|
| Funcionalidade Básica | 12 | _ | _ | ⬜ |
| Login | 8 | _ | _ | ⬜ |
| Rate Limiting | 5 | _ | _ | ⬜ |
| Admin | 10 | _ | _ | ⬜ |
| Segurança | 10 | _ | _ | ⬜ |
| Backup | 6 | _ | _ | ⬜ |
| Logout | 4 | _ | _ | ⬜ |
| Responsividade | 6 | _ | _ | ⬜ |
| Browser | 10 | _ | _ | ⬜ |
| Performance | 5 | _ | _ | ⬜ |
| **TOTAL** | **76** | **_** | **_** | ⬜ |

---

## ✅ Checklist Final

- [ ] Todos os testes passaram
- [ ] Sem erros no console
- [ ] Sem avisos de segurança
- [ ] CSP headers implementados
- [ ] Rate limiting funciona
- [ ] Backup/restore funciona
- [ ] Logging registra eventos
- [ ] Responsividade testada
- [ ] Performance aceitável
- [ ] Pronto para produção

---

## 🚀 Próximas Ações

Se tudo passou:
1. ✅ Fazer backup dos dados
2. ✅ Documentar credenciais (seguro)
3. ✅ Deploy para produção
4. ✅ Testar em live environment
5. ✅ Monitorar logs de segurança

Se algo falhou:
1. ❌ Documentar o problema
2. ❌ Revisar [SEGURANCA.md](SEGURANCA.md)
3. ❌ Consultar [IMPLEMENTACAO-SEGURANCA.md](IMPLEMENTACAO-SEGURANCA.md)
4. ❌ Verificar console para erros
5. ❌ Tentar novamente ou contatar suporte

---

**Última revisão**: 2024  
**Versão**: 1.0  
**Status**: Pronto para teste
