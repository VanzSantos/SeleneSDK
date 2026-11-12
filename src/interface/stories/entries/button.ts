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
  description: "Dispara uma ação em seis formatos: texto, ícone esquerdo, ícone direito, dois ícones, contador e somente ícone. Variantes: primary, neutral, subtle, destructive e link. Loading nunca usa disabled nativo. Breaking change: outlined, ActionCard.secondaryOutlined e FileUpload.buttonOutlined foram removidos. Migração outlined → variante: cancelar/voltar/anterior e Sidebar usam subtle; uploads de campo e logins alternativos usam neutral. ActionCard usa secondaryVariant='subtle' por padrão; FileUpload preserva buttonVariant='link' para gatilhos link. count omite undefined, mostra 0 e limita acima de 99 a 99+; valores inválidos são omitidos com aviso em dev. iconOnly exige accessibleLabel e exatamente um ícone, sem label nem count.",
  code: `<Button variant="primary" label="Salvar" />
<Button variant="primary" leftIcon="info" label="Detalhes" />
<Button variant="primary" rightIcon="arrow-right" label="Avançar" />
<Button variant="primary" leftIcon="info" rightIcon="arrow-right" label="Ambos" />
<Button variant="primary" label="Notificações" count={3} />
<Button variant="primary" label="Notificações" count={0} />
<Button variant="primary" label="Notificações" count={100} />
<Button variant="subtle" label="Cancelar" />
<Button variant="neutral" label="Entrar com Google" />
<Button variant="primary" iconOnly leftIcon="eye" accessibleLabel="Mostrar senha" />`,
  Demo: ButtonDemo,
};

export default story;
