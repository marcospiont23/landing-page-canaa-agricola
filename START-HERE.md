# Comece Aqui

Guia rápido para executar, validar e preparar o site da Canaã Soluções Agrícolas.

## Executar Localmente

No terminal, na raiz do projeto:

```bash
py -m http.server 8000
```

Abra os seguintes endereços:

- Página inicial: `http://localhost:8000/`
- Login administrativo: `http://localhost:8000/login.html`
- Painel administrativo: `http://localhost:8000/admin.html`

Use um servidor local. Abrir o arquivo HTML diretamente pode impedir que recursos externos, como o Supabase Auth, funcionem conforme esperado.

## Primeiro Acesso Administrativo

1. No Supabase, abra **Authentication > Users**.
2. Crie ou confirme o usuário administrador.
3. Use esse e-mail e senha em `login.html`.
4. Sem uma sessão válida do Supabase, `admin.html` redireciona para o login.

O projeto não possui credenciais padrão armazenadas no código. A chave secreta do Supabase nunca deve ser adicionada ao repositório ou ao navegador.

## Verificar Antes Do Deploy

Execute:

```bash
npm run build
```

O comando valida as quatro páginas HTML principais e a sintaxe de todos os scripts JavaScript. Em seguida, teste manualmente:

- Categorias e cards de produtos em desktop e celular.
- Carrinho e links do WhatsApp.
- Login, acesso direto ao painel sem sessão e logout.
- Mapa, política de privacidade e erros no console do navegador.

## Limitações Atuais

O login administrativo usa Supabase Auth. Porém, o catálogo ainda é salvo no `localStorage`: alterações feitas no painel são locais ao navegador do administrador e não são publicadas automaticamente para os demais visitantes.

Para publicar edições de catálogo para todos, a próxima evolução é criar uma tabela de produtos no Supabase e aplicar políticas RLS.

## Deploy

1. Confirme que `npm run build` conclui sem erros.
2. Configure HTTPS e os headers de segurança no provedor escolhido.
3. Use [.htaccess](.htaccess) para Apache ou [nginx.conf.example](nginx.conf.example) como base para Nginx.
4. No Supabase, inclua a URL local e o domínio de produção em **Authentication > URL Configuration**.
5. Após publicar, confira login, CSP, Google Fonts, Google Maps e links do WhatsApp no domínio final.

## Referências

- [README.md](README.md): visão geral e estrutura do projeto.
- [SEGURANCA.md](SEGURANCA.md): orientações de segurança.
- [DEPLOYMENT.md](DEPLOYMENT.md): instruções de publicação.
- [TESTING.md](TESTING.md): roteiro de testes manuais.
