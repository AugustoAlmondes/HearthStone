# HearthStone Card Manager

Este é um projeto de gerenciamento de cartas de Hearthstone, desenvolvido como um desafio técnico. A aplicação é uma Single Page Application (SPA) moderna que permite consultar, criar, editar e excluir cartas exclusivas, mantendo todos os dados salvos localmente no navegador (localStorage) sem a necessidade de um backend.

🌍 **Deploy da Aplicação**: [Hearthstone Deck no Netlify](https://my-hearthstone-deck.netlify.app/)  
👨‍💻 **Meu GitHub**: [@AugustoAlmondes](https://github.com/AugustoAlmondes)  
📂 **Repositório**: [Código Fonte - HearthStone](https://github.com/AugustoAlmondes/HearthStone)  

---

## 🚀 Tecnologias e Stack Utilizada

O projeto foi construído seguindo rigorosamente as especificações do plano base, utilizando as seguintes tecnologias:

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Gerenciamento de Estado**: Zustand
- **Formulários e Validação**: React Hook Form + Zod
- **Estilização**: TailwindCSS (com design estético inspirado no Hearthstone)
- **Ícones**: Lucide React / React Icons
- **Identificadores Únicos**: `uuid` (v4)
- **Acessibilidade UI**: Radix UI

---

## 🎯 Funcionalidades Implementadas (Requisitos do Desafio)

- **CRUD Completo**: Sistema 100% funcional para Adicionar, Ler, Editar e Excluir cartas do deck.
- **Filtros e Busca**: Busca reativa por `id` (exato) ou `nome` (parcial), somado a filtros de seleção por `classe` e `tipo` (Múltiplos filtros atuam como 'AND lógico').
- **Persistência Local**: Todos os cards são salvos no `localStorage` sob a chave `hs_cards`.
- **Cartas Iniciais (Seed)**: A aplicação é inteligente para renderizar 5 cartas oficiais com status tematizados caso seja a primeira vez do usuário acessando o site.
- **Formulários com Zod**: Validação em tempo real garantindo que os atributos (Ataque, Defesa e Mana) respeitem o limite fechado de valores `0 a 10` e que textos obedeçam ao limite de caracteres estipulado.
- **Prevenção e Tratamento**: Modais e lógicas impeditivas de quebra de componentes.
- **Design de Alta Fidelidade**: Sidebar estilizada, cards com cores dinâmicas baseadas na "Classe", efeitos overlay de iluminação e consistência visual Premium.
- **Tipagem Forte**: Resolução de todos os tipos via interfaces e build livre de erros de tipagem.

---

## ⚙️ Como compilar e executar

Conforme as diretrizes mínimas do teste, segue abaixo o guia de execução.

### Requisitos
- Node.js >= 18

### Instalação
Faça o clone deste repositório e instale todas as dependências do projeto:

```bash
git clone https://github.com/AugustoAlmondes/HearthStone.git
cd HearthStone
npm install
```

ou

```bash
pnpm install
```
*(Nota: O projeto também suporta perfeitamente o gerenciador pacotes `pnpm`)*

### Desenvolvimento
Para rodar a aplicação localmente:

```bash
npm run dev
```

ou

```bash
pnpm run dev
```

### Build de produção
Para simular e gerar a compilação final utilizada junto ao Deploy:

```bash
npm run build
npm run preview
```



---
