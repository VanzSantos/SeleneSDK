import { Chip } from "../../../components/Chip/Chip";
import { Block, Measures, MeasuresTable, Row, Specimen, heightMarks, round, typeValue, type Ctx, type Mark, type TableRow } from "../measures/kit";

/* Seção "Medidas" do Chip: cotas medidas do DOM real; a tabela lê os tokens do :root. */

function parts(ctx: Ctx) {
  const chip = ctx.wrapper.firstElementChild;
  const label = chip?.querySelector(":scope > .label, :scope > [class*='label']");
  const remove = chip?.querySelector("[class*='removeButton']");
  if (!chip || !label) return null;
  const border = parseFloat(getComputedStyle(chip).borderLeftWidth) || 0;
  return { chip: ctx.box(chip), label: ctx.box(label), remove: remove ? ctx.box(remove) : null, border };
}

function anatomy(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  const padLeft = p.label.x - p.chip.x - p.border;
  const end = p.remove ? p.remove.x + p.remove.w : p.label.x + p.label.w;
  const padRight = p.chip.x + p.chip.w - end - p.border;
  const bottom = p.chip.y + p.chip.h + 14;
  const marks: Mark[] = [
    ...heightMarks(p.chip.h),
    { kind: "fill", box: { x: p.chip.x + p.border, y: p.chip.y, w: padLeft, h: p.chip.h } },
    { kind: "tag", x: p.chip.x + p.border + padLeft / 2, y: bottom, text: String(round(padLeft)) },
    { kind: "fill", box: { x: end, y: p.chip.y, w: padRight, h: p.chip.h } },
    { kind: "tag", x: end + padRight / 2, y: bottom, text: String(round(padRight)) },
  ];
  if (p.remove) {
    const gap = p.remove.x - (p.label.x + p.label.w);
    marks.push(
      { kind: "outline", box: p.remove },
      { kind: "tag", x: p.remove.x + p.remove.w / 2, y: p.remove.y - 14, text: `${round(p.remove.w)}×${round(p.remove.h)}` },
      { kind: "fill", box: { x: p.label.x + p.label.w, y: p.chip.y, w: gap, h: p.chip.h } },
      { kind: "tag", x: p.label.x + p.label.w + gap / 2, y: bottom, text: String(round(gap)) },
    );
  }
  return marks;
}

/** Áreas clicáveis: o rótulo (quando selecionável) e o botão de remover. */
function targets(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  const marks: Mark[] = [];
  const bottom = p.chip.y + p.chip.h + 14;
  if (ctx.q("button[aria-pressed]")) marks.push({ kind: "target", box: p.label }, { kind: "tag", x: p.label.x + p.label.w / 2, y: bottom, text: `${round(p.label.w)} × ${round(p.label.h)}` });
  if (p.remove) marks.push({ kind: "target", box: p.remove }, { kind: "tag", x: p.remove.x + p.remove.w / 2, y: p.remove.y - 14, text: `${round(p.remove.w)} × ${round(p.remove.h)}` });
  return marks;
}

const ROWS: TableRow[] = [
  { measure: "Altura mínima", tokens: [], value: () => "32px", usage: "Valor fixo no CSS; cresce se o texto quebrar ou for ampliado." },
  { measure: "Padding lateral", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "Entre a borda e o conteúdo, nos dois lados." },
  { measure: "Espaço entre rótulo e botão de remover", tokens: ["espaco-xp"], value: (t) => t("espaco-xp"), usage: "Só quando o chip é removível." },
  { measure: "Botão de remover", tokens: [], value: () => "24px × 24px", usage: "Valor fixo no CSS, igual ao alvo mínimo (alvo-minimo) da WCAG 2.5.8." },
  { measure: "Ícone de remover", tokens: ["icone-pequeno"], value: (t) => `${t("icone-pequeno")} × ${t("icone-pequeno")}`, usage: "Decorativo, dentro do botão." },
  { measure: "Raio dos cantos", tokens: ["raio-circular"], value: () => "pílula", usage: "Totalmente arredondado." },
  { measure: "Borda", tokens: ["borda-espessura"], value: () => "1px", usage: "Mesma cor do fundo, exceto no neutral (borda-campo)." },
  { measure: "Anel de foco: espessura", tokens: ["foco-espessura"], value: (t) => t("foco-espessura"), usage: "Em volta do rótulo e do botão de remover, cor borda-foco." },
  { measure: "Rótulo: tipografia", tokens: ["texto-p"], value: (t) => typeValue(t, "texto-p"), usage: "Fonte, tamanho / entrelinha / peso." },
];

export function ChipMeasures() {
  return (
    <Measures>
      <Block id="chip-medidas-anatomia" title="Anatomia e espaçamentos" lead="Medidas em px tiradas do próprio componente. As áreas coloridas mostram o padding e o espaço até o botão de remover; o tracejado marca o botão.">
        <Row>
          <Specimen caption="Estático" measure={anatomy}><Chip label="Neutral" variant="neutral" /></Specimen>
          <Specimen caption="Removível" measure={anatomy}><Chip label="React" removable onRemove={() => {}} /></Specimen>
          <Specimen caption="Selecionável e removível" measure={anatomy}><Chip label="Ativos" selected onToggle={() => {}} removable onRemove={() => {}} /></Specimen>
        </Row>
      </Block>

      <Block id="chip-medidas-toque" title="Áreas de toque" lead="As áreas tracejadas são as regiões clicáveis. O rótulo selecionável ocupa a altura interna do chip; o botão de remover é um quadrado de 24 px.">
        <Row>
          <Specimen caption="Selecionável" rule="Altura interna do chip (32 px menos a borda); largura segue o texto." measure={targets}><Chip label="Pendentes" selected={false} onToggle={() => {}} /></Specimen>
          <Specimen caption="Removível" rule="Botão de remover de 24 × 24 px." measure={targets}><Chip label="Vite" removable onRemove={() => {}} /></Specimen>
        </Row>
      </Block>

      <Block id="chip-medidas-tabela" title="Medidas e tokens">
        <MeasuresTable caption="Medidas do Chip e os tokens de onde vêm" rows={ROWS} />
      </Block>
    </Measures>
  );
}
