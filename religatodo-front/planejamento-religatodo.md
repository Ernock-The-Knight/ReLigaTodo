# Planejamento de Implementação — ReLigaTodo

> 📌 Documento vivo: será atualizado a cada nova decisão tomada no projeto.
> Última atualização: 29/06/2026 (tokens de design extraídos do Lovable)

---

## 1. Contexto

- O front-end original foi criado no **Lovable**; a imagem da Home anexada é a referência visual a ser reproduzida.
- Já existe uma base em **React + Vite** criada para este novo projeto.
- A lib de componentes escolhida é o **PrimeReact**.
- O projeto deve seguir separação clara entre `components/` (reutilizáveis) e `pages/` (telas/rotas).
- Este documento cobre, por enquanto, apenas a **Home Page**. Outras páginas/seções (Solução, Histórias, Temas, login da plataforma) entram em planejamentos futuros.

## 2. Stack técnica

| Camada | Tecnologia | Status |
|---|---|---|
| Build tool | Vite | ✅ já configurado |
| Framework | React | ✅ já configurado |
| Lib de componentes | PrimeReact + PrimeIcons | ✅ decidido |
| Ícones | **PrimeIcons** | ✅ decidido |
| Estilização visual | CSS Modules + tema padrão do PrimeReact | ✅ decidido |
| Roteamento | **react-router-dom** | ✅ decidido |
| Tipografia | **Plus Jakarta Sans** (display/headings) + **Inter** (body) | ✅ decidido |

## 3. Estrutura de pastas proposta

```
src/
├── assets/                        # imagens e ícones estáticos
├── components/
│   ├── layout/                    # Header e Footer
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   └── sections/                  # seções da Home
│       ├── HeroSection.jsx
│       ├── HeroSection.module.css
│       ├── StatsSection.jsx
│       ├── StatsSection.module.css
│       ├── FeaturesSection.jsx
│       └── FeaturesSection.module.css
├── pages/
│   └── Home.jsx                   # monta as seções em ordem
├── routes/
│   └── AppRoutes.jsx
├── styles/
│   └── tokens.css                 # variáveis CSS globais (cores, fonte, espaçamentos)
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

**Convenção de estilo:** cada componente tem seu `.module.css` no mesmo nível. Todos referenciam as variáveis de `styles/tokens.css`.

**Regra de dependência:** `components/` nunca importa de `pages/`. As `pages/` compõem as seções.

## 4. Análise visual da Home (a partir do print)

### 4.1 Header
- Logo (ícone + "ReLigaTodo")
- Menu: *Solução · Histórias · Temas*
- CTA: botão "Acessar plataforma"

### 4.2 Hero
- Tag/etiqueta: "Conectando o Brasil"
- Título: "Conectando a educação no Brasil" (trecho final com destaque em gradiente verde/teal)
- Parágrafo de apoio
- 2 CTAs: "Entrar/Cadastrar" (botão sólido) e "Acessar plataforma" (botão outline)
- Card lateral: logo do produto + seletor de perfil (Aluno / Professor / Tutor)

### 4.3 Stats
- 3 indicadores — **75%**, **1:1**, **TEA/TDAH** — cada um com legenda curta e divisores verticais entre eles

### 4.4 Seção "Religar quem ensina a quem precisa aprender"
- Etiqueta + título + subtítulo
- 3 cards: **Acesso** / **Qualidade** / **Inclusão** (ícone + texto curto, borda superior colorida)

### 4.5 ~~Seção "Três pilares"~~
> ❌ Removida do escopo — não será implementada.

> ⚠️ Os parágrafos e bullets menores das seções restantes foram lidos de forma aproximada a partir da imagem. Confirmar o copy exato no projeto Lovable antes da implementação final.

## 5. Inventário de componentes

| Componente | Responsabilidade | PrimeReact base |
|---|---|---|
| `Header` | Navbar: logo, links de menu, CTA | `Menubar` ou composição com `Button` |
| `Footer` | Rodapé (conteúdo a confirmar) | — |
| `HeroSection` | Título, subtítulo, 2 CTAs, card de preview | `Button`, `Tag` |
| `PlatformPreviewCard` | Mockup com seletor Aluno/Professor/Tutor | `SelectButton` ou `TabView` |
| `StatsSection` | 3 indicadores numéricos com divisores | `Divider` |
| `FeaturesSection` | 3 cards Acesso/Qualidade/Inclusão | `Card` |

> Preferir sempre componentes do PrimeReact em vez de criar do zero. CSS Modules cobre apenas layout e sobrescritas pontuais de estilo.

## 6. Tokens de design

Valores extraídos diretamente do `style.css` do Lovable. Serão declarados em `styles/tokens.css` e consumidos pelos `.module.css`.

### 6.1 Paleta de cores

| Token | oklch | Hex aproximado | Uso |
|---|---|---|---|
| `--brand-blue` | `oklch(0.49 0.09 245)` | `#2C5F8A` | Primário, botão sólido, anel de foco, navbar |
| `--brand-green` | `oklch(0.52 0.10 150)` | `#3A6B45` | Destaque de seção, gradiente |
| `--brand-orange` | `oklch(0.68 0.16 50)` | `#E07B2E` | Accent, topo dos cards, etiquetas |
| `--brand-yellow` | `oklch(0.83 0.14 85)` | `#F2C94C` | Detalhe, badge |
| `--paper` | `oklch(0.985 0.005 80)` | `#FAF8F4` | Fundo Hero e seções claras |
| `--paper-2` | `oklch(0.96 0.008 80)` | `#F2EFE8` | Fundo alternado de seção |
| `--background` | `oklch(0.99 0.003 80)` | ≈ branco quente | Fundo padrão da página |
| `--foreground` | `oklch(0.17 0.01 60)` | `#1C1A17` | Texto principal |
| `--border` | `oklch(0.89 0.01 70)` | — | Bordas e inputs |
| `--muted-foreground` | `oklch(0.45 0.015 60)` | — | Texto secundário/legendas |

> Os valores oklch são os usados no Lovable. CSS oklch é suportado em todos os browsers modernos — usar direto nas variáveis, sem conversão.

### 6.2 Tipografia

| Token | Valor | Uso |
|---|---|---|
| `--font-display` | `"Plus Jakarta Sans", system-ui, sans-serif` | `h1`–`h6` |
| `--font-sans` | `"Inter", system-ui, sans-serif` | Body, parágrafos, labels |
| `letter-spacing` headings | `-0.02em` | Aplicar a todos os headings |

### 6.3 Border-radius

| Token | Valor | Equivalente |
|---|---|---|
| `--radius` (base) | `0.75rem` | 12px |
| `--radius-sm` | `0.5rem` | 8px |
| `--radius-md` | `0.625rem` | 10px (≈ 0.75rem − 2px) |
| `--radius-lg` | `0.75rem` | 12px |
| `--radius-xl` | `1rem` | 16px |

### 6.4 Gradiente da marca

```css
/* Usar como classe utilitária ou valor direto */
background-image: linear-gradient(
  135deg,
  var(--brand-blue)   0%,
  var(--brand-green)  50%,
  var(--brand-orange) 100%
);
```

Aplica-se ao destaque do título da Hero ("no Brasil") e possivelmente ao CTA principal.

### 6.5 Animação

```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
/* duração sugerida: 0.6s ease forwards */
```

Usar nas seções ao entrarem na viewport (HeroSection, FeaturesSection).

## 7. Roadmap de implementação (fases)

**Fase 0 — Setup e dependências**

```bash
# 1. Instalar PrimeReact e PrimeIcons
npm install primereact primeicons

# 2. Instalar react-router-dom
npm install react-router-dom

# 3. Instalar as fontes via Fontsource
npm install @fontsource/plus-jakarta-sans @fontsource/inter
```

Após as instalações:
- Criar a estrutura de pastas conforme seção 3
- Importar no `main.jsx`:
  - Tema do PrimeReact (ex.: `lara-light-indigo`) + `primeicons/primeicons.css`
  - `@fontsource/plus-jakarta-sans`
  - `@fontsource/inter`
  - `styles/tokens.css`
- CSS Modules é nativo do Vite — nenhuma configuração adicional necessária

**Fase 1 — Tokens e estilos globais**
- Criar `styles/tokens.css` declarando todas as variáveis da seção 6 (cores, radius, fontes)
- No `index.css`, aplicar as fontes globalmente:

```css
body {
  font-family: var(--font-sans);       /* Inter */
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);    /* Plus Jakarta Sans */
  letter-spacing: -0.02em;
}
```

- Declarar o `@keyframes fade-up` em `index.css` para reutilização global
- Verificar que o tema padrão do PrimeReact não sobrescreve variáveis de fonte; ajustar se necessário

**Fase 2 — Roteamento e layout base**
- Criar `routes/AppRoutes.jsx` com a rota `/` apontando para `Home.jsx`
- Implementar `Header` (logo, links, CTA) com `Header.module.css`
- Implementar `Footer` (conteúdo a confirmar)

**Fase 3 — Hero Section**
- `HeroSection.jsx` + `HeroSection.module.css`
- Texto, gradiente no título, 2 `Button` do PrimeReact (sólido e outline)
- `PlatformPreviewCard` com `SelectButton` ou `TabView` para Aluno/Professor/Tutor

**Fase 4 — Stats Section**
- `StatsSection.jsx` + `StatsSection.module.css`
- 3 blocos de indicadores separados por `Divider` do PrimeReact

**Fase 5 — Features Section**
- `FeaturesSection.jsx` + `FeaturesSection.module.css`
- 3 `Card` do PrimeReact (Acesso / Qualidade / Inclusão) com borda superior colorida via CSS Module

**Fase 6 — Responsividade**
- Breakpoints mobile/tablet/desktop em todas as seções via CSS Modules (`@media`)

**Fase 7 — Revisão comparativa**
- Comparação lado a lado com o Lovable original e ajustes finos de espaçamento, cores e tipografia

## 8. Decisões técnicas — todas confirmadas ✅

| Decisão | Escolha | Data |
|---|---|---|
| Estilização | CSS Modules + tema padrão do PrimeReact | 29/06/2026 |
| Lib de componentes | PrimeReact (preferir sobre criar do zero) | 29/06/2026 |
| Ícones | PrimeIcons | 29/06/2026 |
| Roteamento | react-router-dom | 29/06/2026 |
| Tipografia | Plus Jakarta Sans (display) + Inter (body) | 29/06/2026 |
| Seção "Três pilares" | ❌ Removida do escopo | 29/06/2026 |

## 9. Próximos passos imediatos

1. ✅ ~~Extrair os valores de cor do Lovable~~ — tokens completos na seção 6
2. Confirmar se há mais seções abaixo das mostradas no print (depoimentos, footer, etc.)
3. Executar os comandos da **Fase 0** e iniciar a implementação

## 10. Histórico de atualizações

| Data | Decisão / Mudança |
|---|---|
| 29/06/2026 | Criação do planejamento inicial com base no print da Home (Lovable) |
| 29/06/2026 | Estilização: CSS Modules + tema padrão do PrimeReact |
| 29/06/2026 | Ícones: PrimeIcons (confirmado) |
| 29/06/2026 | Roteamento: react-router-dom (confirmado) |
| 29/06/2026 | Tipografia: Plus Jakarta Sans (confirmado) |
| 29/06/2026 | Seção 4.5 "Três pilares" removida do escopo |
| 29/06/2026 | Tokens extraídos do `style.css` do Lovable: cores oklch, duas fontes (Plus Jakarta Sans + Inter), radius e gradiente da marca |
| 29/06/2026 | Estrutura de pastas simplificada; inventário de componentes atualizado |
