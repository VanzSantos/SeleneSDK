import type { StoryMeta } from "../types";
import { ButtonDemo, BUTTON_PREVIEW_SECTIONS } from "../atoms/ButtonDemo";

const story: StoryMeta = {
  id: "button",
  order: 230,
  title: "Button",
  group: "Átomos",
  status: "draft",
  category: "action",
  contractFile: "contratos/button.contract.json",
  dependencies: ["Icon", "Spinner"],
  tokensSummary: ["semantic.acao-* (variantTokenMap)", "structural.raio-pp", "structural.icone-grande (24px, ícones e Spinner)", "type-style.texto-rotulo-botao", "semantic.fundo-info-forte / texto-invertido (contador)", "structural.espaco-pp (8px entre ícone, rótulo e contador)"],
  description: "Ícones e Spinner de 24px (icone-grande); iconOnly preenchido quadrado de 44px (botao-altura), link iconOnly de 26px incluindo borda. Dispara uma ação em seis formatos: texto, ícone esquerdo, ícone direito, dois ícones, contador e somente ícone. Variantes: primary, secondary, neutral, destructive e link. As quatro variantes preenchidas têm cinco estados e seis formatos; link tem default/hover/disabled e cinco formatos, sem contador. Link textual mantém o rótulo sublinhado em default, hover e disabled; hover muda texto e ícones para acao-link-texto-sobreposto, sem fundo. iconOnly não tem sublinhado e muda apenas a cor do ícone. Loading das variantes preenchidas nunca usa disabled nativo. Breaking change: secondary verde removido; o antigo nome subtle passa a secondary cinza, com o mesmo visual. outlined, ActionCard.secondaryOutlined e FileUpload.buttonOutlined foram removidos. Migração: subtle → secondary; secondary verde foi removido, e seus gatilhos auxiliares agora usam o secondary cinza. outlined → variante: cancelar/voltar/anterior e Sidebar usam secondary; uploads de campo e logins alternativos usam neutral. ActionCard usa secondaryVariant='secondary' por padrão; FileUpload preserva buttonVariant='link' para gatilhos link. Breaking change do link: pressed/loading e count removidos; migre link com count para secondary, e loading/pressed para uma variante preenchida ou remova o estado. count nas variantes preenchidas omite undefined, mostra 0 e limita acima de 99 a 99+; valores inválidos são omitidos com aviso em dev. iconOnly exige accessibleLabel e exatamente um ícone, sem label nem count.",
  code: `<Button variant="primary" label="Salvar" />
<Button variant="primary" leftIcon="info" label="Detalhes" />
<Button variant="primary" rightIcon="arrow-right" label="Avançar" />
<Button variant="primary" leftIcon="info" rightIcon="arrow-right" label="Ambos" />
<Button variant="primary" label="Notificações" count={3} />
<Button variant="primary" label="Notificações" count={0} />
<Button variant="primary" label="Notificações" count={100} />
<Button variant="secondary" label="Cancelar" />
<Button variant="neutral" label="Entrar com Google" />
<Button variant="link" label="Detalhes" state="hover" />
<Button variant="link" iconOnly leftIcon="eye" accessibleLabel="Mostrar detalhes" />
<Button variant="primary" iconOnly leftIcon="eye" accessibleLabel="Mostrar senha" />`,
  previewSections: BUTTON_PREVIEW_SECTIONS,
  Demo: ButtonDemo,
};

export default story;
