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

- E-mail: canaa.agricola01@gmail.com
- Senha: admin

Após o login, o usuário pode alterar o e-mail e a senha no próprio painel administrativo.

## Observações importantes

- O catálogo é persistido no localStorage do navegador.
- O carrinho e o pedido são enviados para o WhatsApp com mensagem pré-formatada.
- Para uso em produção, revise o conteúdo da política de privacidade e as informações de contato com base no real fluxo de dados da operação.