# React Memória

Jogo da memória feito em **React + TypeScript**, desenvolvido durante o curso de **React da B7Web**.

O objetivo é encontrar todos os pares de cartas no menor tempo e com o menor número de movimentos possível.

## Funcionalidades

- Grid com cartas embaralhadas (pares)
- Contador de **tempo** (mm:ss)
- Contador de **movimentos**
- Verificação de par:
  - ao abrir 2 cartas, valida se são iguais
  - se forem iguais, ficam permanentemente visíveis
  - se não, “fecham” após um pequeno delay
- Botão de **Reiniciar** (gera um novo grid embaralhado)

## Tecnologias

- React
- TypeScript
- Styled-components
- Create React App

## Estrutura do projeto (resumo)

- `src/App.tsx`  
  Contém a lógica principal do jogo (timer, movimentos, controle de cartas abertas e reset do grid).
- `src/data/items.data.ts`  
  Lista de itens do jogo (nome + ícone SVG).
- `src/components`
  - `grid-item/` (carta do jogo)
  - `info-item/` (exibe “Tempo” e “Movimentos”)
  - `button/` (botão de reiniciar com ícone)
- `src/utils/format-time-elapsed.util.ts`  
  Converte segundos para `mm:ss`.
- `src/svgs/` e `src/assets/`  
  Ícones e imagens usados na interface.

## Como rodar

```bash
npm install
npm start
```

Acesse: `http://localhost:3000`

## Como jogar

1. Clique em uma carta para revelar o ícone.
2. Clique em outra carta para tentar formar o par.
3. Ao completar todos os pares, o jogo para o timer automaticamente.
4. Clique em **Reiniciar** para começar novamente.