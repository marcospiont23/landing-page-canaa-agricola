# 👟 SyntaxWear — Tênis & Sneakers Online

<div align="center">

![SyntaxWear Banner](./images/banners/hero.jpg)

**Transforme qualquer passo em presença.**  
Uma landing page moderna, responsiva e elegante para um e-commerce especializado em sneakers e calçados urbanos.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![Responsive Design](https://img.shields.io/badge/Design-Responsivo-6329A2?style=for-the-badge)](https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Responsive_Design)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [✨ Funcionalidades e Seções](#-funcionalidades-e-seções)
- [🎨 Identidade Visual e Tipografia](#-identidade-visual-e-tipografia)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [📂 Estrutura de Arquivos](#-estrutura-de-arquivos)
- [📱 Responsividade & Layout](#-responsividade--layout)
- [🚀 Como Executar o Projeto](#-como-executar-o-projeto)
- [👥 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 📖 Sobre o Projeto

O **SyntaxWear** é uma interface web front-end de e-commerce desenvolvida com foco em alta performance, fidelidade visual e ótima experiência do usuário (UX/UI). 

O projeto foi construído utilizando **HTML5 semântico** e uma **arquitetura de CSS modular**, sem a necessidade de frameworks pesados, aplicando recursos modernos como **CSS Grid Layout (Template Areas)**, **Flexbox**, **Variáveis CSS (Custom Properties)** e um menu mobile interativo desenvolvido inteiramente em CSS puro.

---

## ✨ Funcionalidades e Seções

A página inicial do e-commerce é composta pelas seguintes seções:

1. **Cabeçalho Fixo (Header & Navigation):**
   - Barra de navegação flutuante fixa no topo com cantos arredondados.
   - Logotipo da marca vetorizado (SVG).
   - Links para categorias principais: *Masculino*, *Feminino* e *Outlet*.
   - Acesso rápido a utilitários: *Nossas lojas*, *Sobre*, *Minha Conta*, *Ajuda* e *Carrinho de Compras*.
   - Menu hambúrguer lateral dinâmico para dispositivos móveis baseado em CSS Puro (Checkbox Hack).

2. **Seção Principal (Hero Section):**
   - Banner de destaque com o lançamento **Krypton One** e call-to-action (CTA).
   - Chamadas com botões interativos estilizados (*"Ver modelos"* e *"Comprar"*).
   - Otimizado com imagem de fundo dedicada para desktop e mobile (`hero.jpg` e `hero-mobile.jpg`).

3. **Categorias de Produtos (Categories Section):**
   - Cards visuais com overlays graduados para as principais linhas:
     - 👟 **Casual**
     - 🏃 **Esporte**
     - ⚡ **Moderno**
     - 🚀 **Futurista**

4. **Vitrine em Grade Assimétrica (Product Grid):**
   - Layout sofisticado utilizando **CSS Grid (`grid-template-areas`)** com múltiplos formatos de cards:
     - Destaque principal do modelo Krypton One com filtros masculino/feminino.
     - Exibição de modelos reais e fotos de tênis em ângulos conceituais.

5. **Rodapé Completo (Site Footer):**
   - Formulário de captura para Newsletter.
   - Ícones de redes sociais: Instagram, WhatsApp, TikTok e Facebook.
   - Navegação institucional e links categorizados organizados em colunas.
   - Informações de direitos autorais (*Copyright*).

---

## 🎨 Identidade Visual e Tipografia

- **Tipografia:** [Ubuntu](https://fonts.google.com/specimen/Ubuntu) via Google Fonts (pesos 300, 400, 500, 700).
- **Paleta de Cores Principal:**
  - `Roxo Destaque / Hover:` `#6329A2` / `#7C3AED`
  - `Texto Principal:` `#333333`
  - `Texto Secundário / Bordas Suaves:` `#EDEDED` / `#AAAAAA` / `#EEEEEE`
  - `Fundos e Superfícies:` `#FFFFFF` (Claro) e `#333333` (Footer Escuro)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica de tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, etc.) e acessibilidade com atributos `aria-label`.
- **CSS3 Moderno:**
  - **Reset:** Baseado nas diretrizes modernas de reset do *Andy Bell*.
  - **CSS Variables:** Definições reutilizáveis e centralizadas em `variables.css`.
  - **Flexbox & CSS Grid:** Posicionamento multidimensional fluido com `grid-template-areas`.
  - **Media Queries:** Breakpoints adaptados para Desktop, Tablets e Smartphones.
  - **Acessibilidade de Movimento:** Suporte a `prefers-reduced-motion` para usuários sensíveis a animações.
- **Vetores SVG:** Ícones de interface leves e escaláveis para qualquer densidade de pixels.

---

## 📂 Estrutura de Arquivos

```text
ecommerce-syntaxwear/
├── css/
│   ├── components/
│   │   ├── footer.css              # Estilização do rodapé, newsletter e redes sociais
│   │   ├── header.css              # Cabeçalho flutuante, barra de navegação e menu mobile
│   │   ├── hero.css                # Seção hero com banner, títulos e botões de chamada
│   │   ├── product-category.css    # Cards de categorias em flexbox e overlays
│   │   └── product-grid.css        # Grid assimétrico de produtos com CSS Grid Areas
│   ├── base.css                    # Estilos globais (body, main, classes de botões)
│   ├── reset.css                   # Normalização e reset CSS cross-browser
│   └── variables.css               # Importação de fontes e variáveis raiz (:root)
├── images/
│   ├── banners/                    # Banners responsivos (desktop e mobile)
│   ├── icons/                      # Ícones SVG de navegação, carrinho e redes sociais
│   ├── logo/                       # Logotipo oficial da marca SyntaxWear
│   └── products/                   # Fotos dos produtos, sneakers e modelos
├── index.html                      # Página principal (Landing Page do e-commerce)
└── README.md                       # Documentação do projeto
```

---

## 📱 Responsividade & Layout

O projeto conta com design responsivo planejado através de *Media Queries*:

| Breakpoint | Adaptações Implementadas |
| :--- | :--- |
| **Desktop (> 1280px)** | Header flutuante centralizado (1260px), grid de produtos com 4 colunas x 3 linhas. |
| **Tablets & Laptops (≤ 1280px)** | Menu mobile retrátil lateral direito, header com largura dinâmica e padding adaptativo. |
| **Telas Médias (≤ 1000px / 768px)** | Hero adaptado com banner mobile vertical, grid de produtos reorganizado para 2 colunas e rodapé em fluxo vertical. |
| **Smartphones (≤ 500px)** | Cards de categoria ocupando 100% da largura, tipografia escalada e botões otimizados para toque. |

---

## 🚀 Como Executar o Projeto

Como se trata de um projeto estático em HTML/CSS, você não precisa instalar nenhuma dependência externa:

### Opção 1: Execução Direta
1. Clone este repositório:
   ```bash
   git clone https://github.com/marcospiont23/ecommerce-syntaxwear.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd ecommerce-syntaxwear
   ```
3. Abra o arquivo `index.html` em qualquer navegador web (dando duplo clique no arquivo ou arrastando-o para o navegador).

### Opção 2: Com VS Code (Live Server)
1. Abra a pasta do projeto no [Visual Studio Code](https://code.visualstudio.com/).
2. Instale a extensão **Live Server** (caso ainda não possua).
3. Clique com o botão direito sobre o arquivo `index.html` e selecione **"Open with Live Server"**.

### Opção 3: Servidor Local via Terminal (Node / Python)
```bash
# Com npx (Node.js):
npx serve .

# Ou com Python 3:
python -m http.server 3000
```
Em seguida, acesse no navegador: `http://localhost:3000` (ou a porta informada).

---

## 👥 Contribuição

Contribuições são sempre bem-vindas! Se você deseja sugerir melhorias ou novos recursos:

1. Faça um Fork do projeto (`fork`).
2. Crie uma branch para a sua feature (`git checkout -b feature/NovaFeature`).
3. Faça commit das suas alterações (`git commit -m 'feat: Adiciona nova funcionalidade'`).
4. Faça o push para a branch (`git push origin feature/NovaFeature`).
5. Abra um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Consulte o arquivo para obter mais detalhes.

---

<div align="center">
Desenvolvido para o ecossistema <strong>SyntaxWear</strong> 👟
</div>