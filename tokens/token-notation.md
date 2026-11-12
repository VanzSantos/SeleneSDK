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
O antigo `botao-link-raio` (2px) foi removido na Etapa 3: todos os botões link
usam `raio-pp` com o fundo visível.

| Caminho no contrato | CSS | Claro / Escuro | Finalidade |
|---|---|---|---|
| `structural.botao-altura` | `--botao-altura` | 44px / 44px | Altura mínima do botão preenchido; cresce com texto ampliado |
| `structural.borda-espessura` | `--borda-espessura` | 1px / 1px | Espessura atual da borda |
| `structural.foco-deslocamento` | `--foco-deslocamento` | 2px / 2px | Distância atual entre botão e foco |
| `structural.alvo-minimo` | `--alvo-minimo` | 24px / 24px | Alvo mínimo atual do botão link, perfil padrão |
| `structural.botao-demo-largura-maxima` | `--botao-demo-largura-maxima` | 520px / 520px | Largura máxima atual da demo Button |

Contador: reutilizar `semantic.fundo-info-forte` e `semantic.texto-invertido`,
como Badge `info`, sem criar uma segunda paleta azul. Tipografia e espaçamento
também seguem Badge. O azul é próximo, mas não idêntico ao PNG de referência.
Disabled preserva o contador azul legível, como na referência; loading substitui
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
150 combinações por tema (5 variantes × 5 estados × 6 formatos), 300 nos dois temas.

Não renomeamos `acao-sutil`, `acao-sutil-sobreposta`, `acao-sutil-pressionada`
e `acao-sutil-texto`: o novo `secondary` usa exatamente esses mesmos tokens
e valores nos dois temas. `acao-secundaria` está ocupado pelo verde dos checks
do CallControlBar. Renomear o cinza para esse token alteraria outro componente.
Recomendação futura: discutir uma separação dos nomes semânticos com o time/Figma
antes de qualquer renomeação; nesta mudança os nomes e valores compartilhados
permanecem estáveis. Nenhum token novo e nenhum token renomeado nesta fase.

## Button link — estados restritos

O Button link aceita somente default, hover e disabled e cinco formatos, sem
contador. No default e disabled não há sublinhado; no hover textual só aparece
sublinhado, sem fundo ou mudança de cor. Espessura usa `borda-espessura` e offset
usa `espaco-xp` (token de espaçamento existente). No iconOnly o hover muda apenas
a cor do ícone para `acao-link-texto-sobreposto`; não há texto para sublinhar.
Foram removidos `acao-link-fundo-sobreposto`, `acao-link-fundo-pressionado` e
`acao-link-texto-pressionado`, sem outros consumidores. `acao-link-texto-sobreposto`
permanece consumido no hover do iconOnly. Nenhum token novo foi necessário.
A matriz final tem 120 combinações preenchidas + 15 de link por tema = 135,
e 270 nos dois temas. Os aliases anteriores da referência text.png não fazem
mais parte da especificação atual. Foco e alvo mínimo mantêm seus tokens.
