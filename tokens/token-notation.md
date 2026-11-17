# Notação de tokens usada nos contratos

O `tokens.json` real (enviado por você) já tem 5 coleções, e os contratos abaixo referenciam
tokens dela usando o formato `<colecao>.<caminho-do-token>`:

| Prefixo usado no contrato | Coleção real no tokens.json | Modo |
|---|---|---|
| `primitive.*`   | Cores Primitivas     | Mode 1 |
| `semantic.*`    | Cores Semânticas     | Claro / Escuro |
| `structural.*`  | Estrutural           | Mode 1 |
| `type-primitive.*` | Tipografia Primitiva | Base |
| `type-style.*`  | Tipografia Estilo    | Base |

Exemplos reais confirmados no seu arquivo:

- `semantic.acao-primaria` → resolve para `Verde Medsenior/verde-medsenior-700` (Claro) — grupo "Ações/Primárias/acao-primaria".
- `structural.raio-pp` → `8` — grupo "Raios de Borda/raio-pp".
- `structural.icone-medio` → `20` — grupo "Ícones/icone-medio".
- `structural.foco-espessura` → `3` — grupo "Foco/foco-espessura".
- `type-style.texto-rotulo-botao` → tamanho 16 / peso médio / entrelinha 150.

**Regra que os contratos seguem:** nenhum componente referencia `primitive.*` ou
`type-primitive.*` diretamente — só `semantic.*`, `structural.*` e `type-style.*`. Isso já
é verdade na sua estrutura atual; os contratos só precisam parar de vazar essa regra (o que
acontecia quando a descrição em prosa citava "cinza-900" em vez de "texto-primario", por
exemplo — não encontrei esse vazamento nos seus `.md`, então o problema real não está na
camada de token).

**Decisão de nomenclatura:** os nomes dos tokens em si (`acao-primaria`, `texto-primario`,
`raio-pp`...) continuam em português, porque são o nome real das variáveis no seu arquivo
Figma — traduzir aqui criaria uma segunda fonte da verdade dessincronizada do arquivo real.
Nomes de **componente** e de **prop**, que você pediu para virar inglês, são uma camada
diferente (a API do código) e não têm esse vínculo direto com o Figma.

## Tokens complementares do Button

Adicionados em `tokens.css` para a necessidade real de alinhamento com AuroraDS;
pendentes de reconciliação com as coleções do Figma em `tokens.json`. Não representam
uma nova exportação do Figma nem uma alteração dos tokens compartilhados existentes.
O consumo e a whitelist foram incorporados às etapas do contrato e da implementação.
Todos os botões link usam `raio-pp` e permanecem sem fundo em todos os estados.

| Caminho no contrato | CSS | Claro / Escuro | Finalidade |
|---|---|---|---|
| `structural.botao-altura` | `--botao-altura` | 44px / 44px | Altura mínima do botão preenchido; cresce com texto ampliado |
| `structural.borda-espessura` | `--borda-espessura` | 1px / 1px | Espessura atual da borda |
| `structural.foco-deslocamento` | `--foco-deslocamento` | 2px / 2px | Distância atual entre botão e foco |
| `structural.alvo-minimo` | `--alvo-minimo` | 24px / 24px | Alvo mínimo atual do botão link, perfil padrão |

Contador: par invertido ao do botão, sem token novo. A pílula usa a cor do texto do
botão (`acao-<variante>-texto`) e o número usa a cor do fundo dele
(`acao-<variante>`), então contrasta em todos os estados e nos dois temas
(texto/pílula ≥ 4,91:1 e pílula/fundo ≥ 4,91:1 em default, hover e pressed). Em
secondary a pílula é cinza escuro no claro e cinza claro no escuro. Disabled usa
`semantic.texto-secundario` como pílula e `semantic.fundo-superficie` como número
(7,56:1 claro / 8,70:1 escuro). Tipografia e espaçamento seguem o Badge. Loading substitui
o conteúdo visual pelo Spinner e preserva rótulo e contador no nome acessível.
O Spinner durante loading usa `semantic.texto-secundario` sobre
`semantic.acao-carregando`; `semantic.acao-carregando-texto` permanece inalterado
para outros consumidores. O par escolhido atende ao mínimo de 3:1 nos dois temas.

## Convenção de CSS custom property (fixada após teste de determinismo)

Ao gerar CSS/Tailwind a partir de um token, a variável CSS usa o nome do token **sem**
prefixo de camada — `semantic.borda-erro` vira `--borda-erro`, nunca `--semantic-borda-erro`.
Essa é a convenção que o `tokens.css` de referência já usa; qualquer geração precisa bater
com ela, porque componentes e arquivo de tokens são gerados em momentos diferentes e
precisam casar pelo nome exato da variável.

Exemplo: `semantic.acao-primaria` → `var(--acao-primaria)`; `structural.raio-pp` →
`var(--raio-pp)`; `type-style.texto-m` → `var(--texto-m-size)` / `var(--texto-m-weight)` /
`var(--texto-m-line-height)` (tipografia se decompõe em 3+ variáveis, uma por propriedade CSS).

## Remoção do secondary verde — Fase 1

A variante Button `secondary` verde foi removida; seus dois gatilhos auxiliares
foram migrados para `subtle`. `acao-secundaria-sobreposta`,
`acao-secundaria-pressionada` e `acao-secundaria-texto` foram removidos do CSS
por ausência de consumo. `acao-secundaria` base permanece verde, consumido
pelos checks do CallControlBar; não representa uma variante disponível do Button.
A exportação original `tokens.json` permanece intacta.

## Secondary cinza — Fase 2

Variantes finais do Button: `primary`, `secondary`, `neutral`, `destructive`,
`link`. O nome antigo `subtle` foi removido da API e migra para `secondary`;
o antigo secondary verde não é mais uma variante do Button. A matriz contém
135 combinações por tema (120 preenchidas + 15 de link), 270 no total.

Não renomeamos `acao-sutil`, `acao-sutil-sobreposta`, `acao-sutil-pressionada`
e `acao-sutil-texto`: o novo `secondary` usa exatamente esses mesmos tokens
e valores nos dois temas. `acao-secundaria` está ocupado pelo verde dos checks
do CallControlBar. Renomear o cinza para esse token alteraria outro componente.
Recomendação futura: discutir uma separação dos nomes semânticos com o time/Figma
antes de qualquer renomeação; nesta mudança os nomes e valores compartilhados
permanecem estáveis. Nenhum token novo e nenhum token renomeado nesta fase.

## Button link — estados restritos

O Button link aceita somente default, hover e disabled e cinco formatos, sem
contador. O rótulo textual mantém sublinhado em default, hover e disabled;
hover muda texto e ícones para `acao-link-texto-sobreposto`, sem fundo.
Espessura usa `borda-espessura` e offset
usa `espaco-xp` (token de espaçamento existente). No iconOnly o hover muda apenas
a cor do ícone para `acao-link-texto-sobreposto`; não há texto para sublinhar.
Foram removidos `acao-link-fundo-sobreposto`, `acao-link-fundo-pressionado` e
`acao-link-texto-pressionado`, sem outros consumidores. `acao-link-texto-sobreposto`
permanece consumido no hover de todos os formatos do link. Nenhum token novo foi necessário.
A matriz final tem 120 combinações preenchidas + 15 de link por tema = 135,
e 270 nos dois temas. Os aliases anteriores da referência text.png não fazem
mais parte da especificação atual. Foco e alvo mínimo mantêm seus tokens.

## Button — ícones e Spinner de 20px

Button usa `structural.icone-medio` (`--icone-medio`, 20px nos dois temas),
via `size="medium"` de Icon e Spinner, por decisão validada com a liderança.
Não cria token nem altera os tokens compartilhados; `icone-grande` permanece disponível.
O SVG conserva viewBox e proporção; apenas a caixa muda. iconOnly preenchido
usa `botao-altura` nos dois eixos (44×44) e padding zero. Link iconOnly mantém
`alvo-minimo` como piso; ícone e borda ficam dentro do alvo mínimo de 24×24, sem corte do foco externo.
