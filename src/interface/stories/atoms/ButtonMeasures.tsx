import { Button } from "../../../components/Button/Button";
import { Block, Measures, MeasuresTable, Row, Specimen, heightMarks, round, typeValue, type Ctx, type Mark, type TableRow } from "../measures/kit";

/* Seção "Medidas" do Button: as cotas vêm do DOM dos próprios botões e a tabela lê os tokens. */

/** Mede o botão: altura, padding, ícones, espaço ícone–rótulo e contador. */
function anatomy(ctx: Ctx): Mark[] | null {
  const button = ctx.q("button");
  const content = button?.firstElementChild as HTMLElement | null;
  if (!button || !content) return null;
  const border = parseFloat(getComputedStyle(button).borderLeftWidth) || 0;
  const c = ctx.box(content);
  const children = [...content.children];
  const icons = children.filter((el) => el.tagName.toLowerCase() === "svg").map(ctx.box);
  const labelEl = children.find((el) => el.tagName === "SPAN" && el.className.includes("label"));
  const countEl = children.find((el) => el.tagName === "SPAN" && el.className.includes("count"));
  const label = labelEl ? ctx.box(labelEl) : null;
  const count = countEl ? ctx.box(countEl) : null;
  const { w, h } = ctx.size;
  // Padding = distância da borda interna ao conteúdo (a borda de 1px não conta).
  const padLeft = c.x - border;
  const padRight = w - (c.x + c.w) - border;
  const marks: Mark[] = [
    ...heightMarks(h),
    { kind: "fill", box: { x: border, y: 0, w: padLeft, h } },
    { kind: "fill", box: { x: w - border - padRight, y: 0, w: padRight, h } },
    { kind: "tag", x: border + padLeft / 2, y: h + 14, text: String(round(padLeft)) },
    { kind: "tag", x: w - border - padRight / 2, y: h + 14, text: String(round(padRight)) },
  ];
  icons.forEach((icon) => {
    marks.push({ kind: "outline", box: icon }, { kind: "tag", x: icon.x + icon.w / 2, y: icon.y - 14, text: String(round(icon.w)) });
  });
  const first = icons[0];
  if (first && label) {
    const gap = label.x - (first.x + first.w);
    if (gap > 0) marks.push({ kind: "fill", box: { x: first.x + first.w, y: c.y, w: gap, h: c.h } }, { kind: "tag", x: first.x + first.w + gap / 2, y: h + 14, text: String(round(gap)) });
  }
  if (count && label) {
    const gap = count.x - (label.x + label.w);
    marks.push(
      { kind: "outline", box: count },
      { kind: "tag", x: count.x + count.w / 2, y: count.y - 14, text: `${round(count.w)}×${round(count.h)}` },
      { kind: "fill", box: { x: label.x + label.w, y: c.y, w: gap, h: c.h } },
      { kind: "tag", x: label.x + label.w + gap / 2, y: h + 14, text: String(round(gap)) },
    );
  }
  return marks;
}

/** Área clicável = o próprio botão. */
function target(ctx: Ctx): Mark[] {
  const { w, h } = ctx.size;
  return [
    { kind: "target", box: { x: 0, y: 0, w, h } },
    { kind: "tag", x: w / 2, y: h + 14, text: `${round(w)} × ${round(h)}` },
  ];
}

/* ---- Tabela de medidas (lida dos tokens) ---- */

const ROWS: TableRow[] = [
  { measure: "Altura mínima (preenchidos)", tokens: ["botao-altura"], value: (t) => t("botao-altura"), usage: "Cresce se o texto quebrar linha ou for ampliado." },
  { measure: "Padding lateral", tokens: ["espaco-m"], value: (t) => t("espaco-m"), usage: "Entre a borda e o conteúdo." },
  { measure: "Padding vertical", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "Somado à altura da linha do rótulo." },
  { measure: "Espaço entre ícone, rótulo e contador", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "O mesmo valor para os três." },
  { measure: "Ícone e Spinner", tokens: ["icone-medio"], value: (t) => `${t("icone-medio")} × ${t("icone-medio")}`, usage: "Ícones decorativos (aria-hidden)." },
  { measure: "Raio dos cantos", tokens: ["raio-pp"], value: (t) => t("raio-pp"), usage: "Todas as variantes preenchidas e o link." },
  { measure: "Borda", tokens: ["borda-espessura"], value: (t) => t("borda-espessura"), usage: "Só no disabled (borda-base)." },
  { measure: "Anel de foco: espessura e distância", tokens: ["foco-espessura", "foco-deslocamento"], value: (t) => `${t("foco-espessura")} / ${t("foco-deslocamento")}`, usage: "Por fora do botão, cor borda-foco." },
  { measure: "Alvo mínimo (link e somente ícone em link)", tokens: ["alvo-minimo"], value: (t) => `${t("alvo-minimo")} × ${t("alvo-minimo")}`, usage: "WCAG 2.5.8, nível AA." },
  { measure: "Contador: largura mínima", tokens: ["icone-pequeno", "espaco-xp"], value: (t) => `${parseFloat(t("icone-pequeno")) + parseFloat(t("espaco-xp"))}px`, usage: "Largura mínima da pílula; cresce com os dígitos." },
  { measure: "Contador: cantos", tokens: ["raio-circular"], value: () => "pílula", usage: "Totalmente arredondado." },
  { measure: "Rótulo: tipografia", tokens: ["texto-rotulo-botao"], value: (t) => typeValue(t, "texto-rotulo-botao"), usage: "Fonte, tamanho / entrelinha / peso." },
  { measure: "Contador: tipografia", tokens: ["texto-micro-forte"], value: (t) => typeValue(t, "texto-micro-forte"), usage: "Fonte, tamanho / entrelinha / peso." },
];

export function ButtonMeasures() {
  return (
    <Measures>
      <Block id="button-medidas-anatomia" title="Anatomia e espaçamentos" lead="Medidas em px tiradas do próprio botão. As áreas coloridas mostram o padding e o espaço entre os elementos; o tracejado marca ícone e contador.">
        <Row>
          <Specimen caption="Somente texto" measure={anatomy}><Button variant="secondary" label="Detalhes" /></Specimen>
          <Specimen caption="Ícone e texto" measure={anatomy}><Button variant="secondary" label="Detalhes" leftIcon="info" /></Specimen>
          <Specimen caption="Com contador" measure={anatomy}><Button variant="secondary" label="Avisos" count={3} /></Specimen>
        </Row>
      </Block>

      <Block id="button-medidas-toque" title="Áreas de toque" lead="A área tracejada é a região clicável. O botão preenchido tem 44 px de altura e o somente ícone é um quadrado de 44 px. O link não tem padding, então usa o alvo mínimo de 24 px.">
        <Row>
          <Specimen caption="Preenchido" rule="Altura mínima 44 px; largura segue o conteúdo." measure={target}><Button variant="primary" label="Detalhes" /></Specimen>
          <Specimen caption="Somente ícone" rule="Quadrado de 44 × 44 px." measure={target}><Button variant="secondary" iconOnly leftIcon="eye" accessibleLabel="Mostrar detalhes" /></Specimen>
          <Specimen caption="Link" rule="Altura da linha do texto, nunca menos de 24 px." measure={target}><Button variant="link" label="Detalhes" /></Specimen>
          <Specimen caption="Link somente ícone" rule="Quadrado de 24 × 24 px." measure={target}><Button variant="link" iconOnly leftIcon="eye" accessibleLabel="Mostrar detalhes" /></Specimen>
        </Row>
      </Block>

      <Block id="button-medidas-tabela" title="Medidas e tokens">
        <MeasuresTable caption="Medidas do Button e os tokens de onde vêm" rows={ROWS} />
      </Block>
    </Measures>
  );
}
