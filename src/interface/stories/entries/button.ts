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
  description: "Dispara ações em seis formatos: somente texto, texto com ícone à esquerda, à direita ou nos dois lados, texto com contador e somente ícone. Oferece as variantes primary, secondary, neutral, destructive e link e os estados default, hover, pressed, disabled e loading; link aceita apenas default, hover e disabled, sem contador.",
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
