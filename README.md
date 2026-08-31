# Canaã Soluções Agrícolas

Site institucional e vitrine de produtos agrícolas para a região de São Roque do Canaã, Espírito Santo. O projeto reúne apresentação da empresa, catálogo de insumos, área administrativa para gestão do catálogo e fluxo de pedido por WhatsApp.

## Funcionalidades

- Página inicial com hero, categorias de produtos e apresentação da unidade.
- Catálogo de fertilizantes, adubos, defensivos e implementos agrícolas.
- Carrinho lateral com soma de itens e envio do pedido para o WhatsApp.
- Painel administrativo para adicionar, editar, remover e filtrar produtos.
- Login administrativo com credenciais salvas no navegador.
- Política de privacidade e documentação do projeto.

## Tecnologias

- HTML5 semântico
- CSS3 modular
- JavaScript vanilla
- LocalStorage para persistência do catálogo e acesso administrativo
- Layout responsivo com CSS Flexbox e Grid

## Estrutura do projeto

```text
.
├── css/
│   ├── components/
│   ├── base.css
│   ├── reset.css
│   └── variables.css
├── images/
│   ├── icons/
│   ├── logo/
│   └── products/
├── js/
│   ├── admin.js
│   ├── cart.js
│   └── products.js
├── admin.html
├── index.html
├── login.html
├── politica-de-privacidade.html
├── README.md
└── LICENSE (se aplicável)
```

## Como executar

Como o projeto é estático, basta abrir qualquer uma das páginas diretamente no navegador ou usar um servidor local simples, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse:

- http://localhost:8000/
- http://localhost:8000/admin.html
- http://localhost:8000/login.html

## Acesso administrativo

Credenciais padrão iniciais:

O sistema inicializa automaticamente com um usuário e senha de demonstração quando nenhuma credencial está configurada. **IMPORTANTE**: Altere essas credenciais imediatamente após o primeiro login.

Para alterar credenciais:
1. Acesse o painel administrativo (login.html)
2. Clique em "⚙️ Conta & Acesso"
3. Informe novo e-mail e nova senha
4. Salve as alterações

## Segurança

### ⚠️ Recursos de Segurança Implementados

- **Content Security Policy (CSP)**: Previne injeção de scripts maliciosos
- **Rate Limiting**: Máximo 3 tentativas de login em 5 minutos
- **Session Timeout**: Logout automático após 30 minutos de inatividade
- **Headers de Segurança**: X-Content-Type-Options, X-Frame-Options, HSTS, etc.
- **Logging de Segurança**: Registro de todas as ações administrativas
- **Backup e Restore**: Exportar/importar dados com um clique

### 🔒 Requisitos de Produção

Para colocar em produção, você DEVE:

1. **Configurar HTTPS**: Certificado SSL/TLS obrigatório
2. **Alterar credenciais**: Remova padrões de demonstração
3. **Configurar servidor**: Implemente `.htaccess` (Apache) ou configuração Nginx
4. **Revisar CSP Headers**: Ajuste políticas conforme necessário
5. **Fazer backup inicial**: Antes de liberar para produção

**📖 Leia [SEGURANCA.md](SEGURANCA.md)** para detalhes completos de segurança e checklist de produção.

## Observações importantes

- O catálogo é persistido no localStorage do navegador.
- O carrinho e o pedido são enviados para o WhatsApp com mensagem pré-formatada.
- Para uso em produção, revise o conteúdo da política de privacidade e as informações de contato com base no real fluxo de dados da operação.
- **Dados no LocalStorage**: Os produtos e credenciais são armazenados no localStorage do navegador. Para produção com dados sensíveis, considere implementar um backend com autenticação segura.
- **HTTPS obrigatório**: Em produção, sempre use HTTPS. O arquivo `.htaccess` inclui redirecionamento automático HTTP → HTTPS.
- **Logs de segurança**: Revise regularmente os logs de segurança (`localStorage.canaa_security_logs`) para detectar atividades suspeitas.
- **Backup regularizado**: Faça backup dos dados pelo menos 1x por semana usando a função de exportação no painel administrativo.