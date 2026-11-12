import type { StoryMeta } from "../types";
import { ButtonDemo } from "../atoms/ButtonDemo";

const story: StoryMeta = {
  id: "button",
  order: 230,
  title: "Button",
  group: "Átomos",
  status: "draft",
  category: "action",
  contractFile: "contratos/button.contract.json",
  dependencies: ["Icon", "Spinner"],
  tokensSummary: ["semantic.acao-* (variantTokenMap)", "structural.raio-pp", "type-style.texto-rotulo-botao", "semantic.fundo-info-forte / texto-invertido (contador)"],
  description: "Dispara uma ação em seis formatos: texto, ícone esquerdo, ícone direito, dois ícones, contador e somente ícone. Variantes: primary, secondary, neutral, destructive e link. Loading nunca usa disabled nativo. Breaking change: secondary verde removido; o antigo nome subtle passa a secondary cinza, com o mesmo visual. outlined, ActionCard.secondaryOutlined e FileUpload.buttonOutlined foram removidos. Migração: subtle → secondary; secondary verde foi removido, e seus gatilhos auxiliares agora usam o secondary cinza. outlined → variante: cancelar/voltar/anterior e Sidebar usam secondary; uploads de campo e logins alternativos usam neutral. ActionCard usa secondaryVariant='secondary' por padrão; FileUpload preserva buttonVariant='link' para gatilhos link. count omite undefined, mostra 0 e limita acima de 99 a 99+; valores inválidos são omitidos com aviso em dev. iconOnly exige accessibleLabel e exatamente um ícone, sem label nem count.",
  code: `<Button variant="primary" label="Salvar" />
<Button variant="primary" leftIcon="info" label="Detalhes" />
<Button variant="primary" rightIcon="arrow-right" label="Avançar" />
<Button variant="primary" leftIcon="info" rightIcon="arrow-right" label="Ambos" />
<Button variant="primary" label="Notificações" count={3} />
<Button variant="primary" label="Notificações" count={0} />
<Button variant="primary" label="Notificações" count={100} />
<Button variant="secondary" label="Cancelar" />
<Button variant="neutral" label="Entrar com Google" />
<Button variant="primary" iconOnly leftIcon="eye" accessibleLabel="Mostrar senha" />`,
  Demo: ButtonDemo,
};

export default story;
