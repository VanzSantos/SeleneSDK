import { TextField, type TextFieldProps } from "../../../components/TextField/TextField";
import { Block, Measures, MeasuresTable, Row, Specimen, round, typeValue, type Ctx, type Mark, type TableRow } from "../measures/kit";

/* Seção "Medidas" do TextField: cotas medidas do DOM real; a tabela lê os tokens do :root. */

function parts(ctx: Ctx) {
  const container = ctx.q("[data-state]");
  if (!container) return null;
  const field = container.parentElement as HTMLElement;
  const label = field.querySelector("label");
  const helper = container.nextElementSibling;
  const icons = [...container.children].filter((el) => el.tagName.toLowerCase() === "svg");
  const toggle = container.querySelector("button");
  const input = container.querySelector("input");
  return {
    container: ctx.box(container),
    label: label ? ctx.box(label) : null,
    helper: helper ? ctx.box(helper) : null,
    icons: icons.map(ctx.box),
    toggle: toggle ? ctx.box(toggle) : null,
    input: input ? ctx.box(input) : null,
    border: parseFloat(getComputedStyle(container).borderLeftWidth) || 0,
  };
}

function anatomy(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  const c = p.container;
  const marks: Mark[] = [
    { kind: "vline", x: c.x - 16, y: c.y, h: c.h },
    { kind: "tag", x: c.x - 24, y: c.y + c.h / 2, text: String(round(c.h)), anchor: "end" },
  ];
  // Padding lateral: da borda interna até o primeiro / último elemento.
  const first = p.icons[0] && p.icons[0].x < (p.input?.x ?? Infinity) ? p.icons[0] : p.input;
  const last = p.toggle ?? (p.icons.length && p.icons[p.icons.length - 1].x > (p.input?.x ?? 0) ? p.icons[p.icons.length - 1] : p.input);
  if (first && last) {
    const left = first.x - c.x - p.border;
    const right = c.x + c.w - p.border - (last.x + last.w);
    marks.push(
      { kind: "fill", box: { x: c.x + p.border, y: c.y, w: left, h: c.h } },
      { kind: "tag", x: c.x + p.border + left / 2, y: c.y + c.h / 2, text: String(round(left)) },
      { kind: "fill", box: { x: c.x + c.w - p.border - right, y: c.y, w: right, h: c.h } },
      { kind: "tag", x: c.x + c.w - p.border - right / 2, y: c.y + c.h / 2, text: String(round(right)) },
    );
  }
  p.icons.forEach((icon) => {
    marks.push({ kind: "outline", box: icon });
  });
  if (p.label) {
    const gap = c.y - (p.label.y + p.label.h);
    marks.push(
      { kind: "fill", box: { x: c.x + c.w / 2 - 6, y: p.label.y + p.label.h, w: 12, h: gap } },
      { kind: "tag", x: c.x + c.w / 2 + 18, y: p.label.y + p.label.h + gap / 2, text: String(round(gap)) },
    );
  }
  if (p.helper) {
    const gap = p.helper.y - (c.y + c.h);
    marks.push(
      { kind: "fill", box: { x: c.x + c.w / 2 - 6, y: c.y + c.h, w: 12, h: gap } },
      { kind: "tag", x: c.x + c.w / 2 + 18, y: c.y + c.h + gap / 2, text: String(round(gap)) },
    );
  }
  return marks;
}

function targets(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  const c = p.container;
  const marks: Mark[] = [
    { kind: "target", box: c },
    { kind: "tag", x: c.x + c.w / 2, y: c.y + c.h + 14, text: `${round(c.w)} × ${round(c.h)}` },
  ];
  if (p.toggle) marks.push({ kind: "target", box: p.toggle }, { kind: "tag", x: p.toggle.x + p.toggle.w / 2, y: p.toggle.y - 8, text: `${round(p.toggle.w)} × ${round(p.toggle.h)}` });
  return marks;
}

function Case({ caption, rule, measure, ...props }: { caption: string; rule?: string; measure: (ctx: Ctx) => Mark[] | null } & TextFieldProps) {
  return (
    <Specimen caption={caption} rule={rule} measure={measure}>
      <div style={{ width: 260, maxWidth: "100%", padding: "20px 0" }}>
        <TextField {...props} />
      </div>
    </Specimen>
  );
}

const ROWS: TableRow[] = [
  { measure: "Altura do campo (alvo de toque)", tokens: [], value: () => "44px", usage: "Valor fixo no CSS; o campo inteiro recebe o foco ao clicar." },
  { measure: "Padding lateral", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "Entre a borda e o ícone, DDI ou texto." },
  { measure: "Espaço entre ícone, DDI, texto e botão", tokens: ["espaco-xp"], value: (t) => t("espaco-xp"), usage: "O mesmo valor entre todos os elementos de dentro do campo." },
  { measure: "Espaço entre rótulo, campo e texto de apoio", tokens: ["espaco-xp"], value: (t) => t("espaco-xp"), usage: "Pilha vertical do campo." },
  { measure: "Borda", tokens: [], value: () => "1px", usage: "Valor fixo no CSS; cor borda-campo (borda-foco no foco, borda-erro no erro)." },
  { measure: "Raio dos cantos", tokens: ["raio-pp"], value: (t) => t("raio-pp"), usage: "Todos os estados." },
  { measure: "Ícones", tokens: ["icone-medio"], value: (t) => `${t("icone-medio")} × ${t("icone-medio")}`, usage: "Ícone à esquerda, à direita e o do botão de mostrar senha." },
  { measure: "Botão de mostrar senha", tokens: ["alvo-minimo"], value: (t) => `${t("alvo-minimo")} × ${t("alvo-minimo")}`, usage: "Alvo mínimo, WCAG 2.5.8." },
  { measure: "Prefixo +55 (DDI)", tokens: ["espaco-xp"], value: () => "1px de divisória", usage: "Padding à direita de espaco-xp e borda-base de 1px." },
  { measure: "Anel de foco: espessura", tokens: ["foco-espessura"], value: (t) => t("foco-espessura"), usage: "Halo ao redor do campo, cor borda-foco (borda-erro no erro)." },
  { measure: "Texto digitado: tipografia", tokens: ["texto-m"], value: (t) => typeValue(t, "texto-m"), usage: "Fonte, tamanho / entrelinha / peso." },
  { measure: "Rótulo: tipografia", tokens: ["texto-rotulo-campo"], value: (t) => typeValue(t, "texto-rotulo-campo"), usage: "Fonte, tamanho / entrelinha / peso." },
];

export function TextFieldMeasures() {
  return (
    <Measures>
      <Block id="textfield-medidas-anatomia" title="Anatomia e espaçamentos" lead="Medidas em px tiradas do próprio campo. As áreas coloridas mostram o padding lateral e o espaço entre rótulo, campo e texto de apoio; o tracejado marca os ícones (20 px).">
        <Row wide>
          <Case caption="Rótulo e texto de apoio" measure={anatomy} label="Nome" value="" placeholder="Digite seu nome" helperText="Como está no documento." onChange={() => {}} />
          <Case caption="Ícone à esquerda" measure={anatomy} label="Buscar" leftIcon="info" value="" placeholder="Buscar" onChange={() => {}} />
          <Case caption="Senha" measure={anatomy} label="Senha" type="password" value="12345678" onChange={() => {}} />
        </Row>
      </Block>

      <Block id="textfield-medidas-toque" title="Áreas de toque" lead="As áreas tracejadas são as regiões clicáveis: o campo todo, com 44 px de altura, e o botão de mostrar senha, com o alvo mínimo de 24 px.">
        <Row wide>
          <Case caption="Campo" rule="Altura de 44 px; ocupa a largura disponível." measure={targets} label="Nome" value="" onChange={() => {}} />
          <Case caption="Botão de mostrar senha" rule="Quadrado de 24 × 24 px dentro do campo." measure={targets} label="Senha" type="password" value="" onChange={() => {}} />
        </Row>
      </Block>

      <Block id="textfield-medidas-tabela" title="Medidas e tokens">
        <MeasuresTable caption="Medidas do TextField e os tokens de onde vêm" rows={ROWS} />
      </Block>
    </Measures>
  );
}
