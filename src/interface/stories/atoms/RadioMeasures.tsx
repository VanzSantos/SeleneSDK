import { Radio } from "../../../components/Radio/Radio";
import { Block, Measures, MeasuresTable, Row, Specimen, heightMarks, round, typeValue, type Ctx, type Mark, type TableRow } from "../measures/kit";

/* Seção "Medidas" do Radio: cotas medidas do DOM real; a tabela lê os tokens do :root. */

function parts(ctx: Ctx) {
  const row = ctx.q("label");
  const circle = row?.querySelector("span[aria-hidden]");
  const text = row ? [...row.children].filter((el) => el.tagName === "SPAN").pop() : null;
  if (!row || !circle || !text || text === circle) return null;
  const dot = circle.firstElementChild;
  return { row: ctx.box(row), circle: ctx.box(circle), dot: dot ? ctx.box(dot) : null, text: ctx.box(text) };
}

function anatomy(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  const gap = p.text.x - (p.circle.x + p.circle.w);
  const marks: Mark[] = [
    ...heightMarks(p.row.h),
    { kind: "outline", box: p.circle },
    { kind: "tag", x: p.circle.x + p.circle.w / 2, y: p.circle.y - 14, text: `${round(p.circle.w)}×${round(p.circle.h)}` },
    { kind: "fill", box: { x: p.circle.x + p.circle.w, y: p.circle.y, w: gap, h: p.circle.h } },
    { kind: "tag", x: p.circle.x + p.circle.w + gap / 2, y: p.row.y + p.row.h + 14, text: String(round(gap)) },
  ];
  if (p.dot) marks.push({ kind: "outline", box: p.dot }, { kind: "tag", x: p.dot.x + p.dot.w / 2, y: p.circle.y + p.circle.h + 14, text: String(round(p.dot.w)) });
  return marks;
}

function target(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  return [
    { kind: "target", box: p.row },
    { kind: "tag", x: p.row.x + p.row.w / 2, y: p.row.y + p.row.h + 14, text: `${round(p.row.w)} × ${round(p.row.h)}` },
  ];
}

const ROWS: TableRow[] = [
  { measure: "Círculo", tokens: ["icone-medio"], value: (t) => `${t("icone-medio")} × ${t("icone-medio")}`, usage: "Decorativo (aria-hidden); o estado real vive no input." },
  { measure: "Borda do círculo", tokens: [], value: () => "2px", usage: "Valor fixo no CSS; cor borda-campo (acao-primaria quando marcado)." },
  { measure: "Ponto de marcado", tokens: [], value: () => "10px × 10px", usage: "Valor fixo no CSS; cor acao-primaria." },
  { measure: "Cantos", tokens: ["raio-circular"], value: () => "círculo", usage: "Círculo e ponto totalmente arredondados." },
  { measure: "Espaço entre círculo e rótulo", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "Entre a borda do círculo e o texto." },
  { measure: "Altura da linha (alvo de toque)", tokens: [], value: () => "44px", usage: "Valor fixo no CSS; a linha inteira, círculo e rótulo, é clicável." },
  { measure: "Anel de foco: espessura", tokens: ["foco-espessura"], value: (t) => t("foco-espessura"), usage: "Halo ao redor do círculo, cor borda-foco (borda-erro no erro)." },
  { measure: "Rótulo: tipografia", tokens: ["texto-m"], value: (t) => typeValue(t, "texto-m"), usage: "Fonte, tamanho / entrelinha / peso." },
];

export function RadioMeasures() {
  return (
    <Measures>
      <Block id="radio-medidas-anatomia" title="Anatomia e espaçamentos" lead="Medidas em px tiradas do próprio componente. O tracejado marca o círculo (20 px) e o ponto interno (10 px); a área colorida mostra o espaço até o rótulo.">
        <Row>
          <Specimen caption="Desmarcado" measure={anatomy}><Radio name="m-radio-a" value="a" label="Opção A" checked={false} /></Specimen>
          <Specimen caption="Marcado" measure={anatomy}><Radio name="m-radio-b" value="b" label="Opção B" checked /></Specimen>
        </Row>
      </Block>

      <Block id="radio-medidas-toque" title="Área de toque" lead="A área tracejada é a região clicável: a linha inteira, círculo e rótulo, com 44 px de altura.">
        <Row>
          <Specimen caption="Rótulo curto" rule="Altura de 44 px; a largura segue o texto." measure={target}><Radio name="m-radio-c" value="c" label="Sim" checked={false} /></Specimen>
          <Specimen caption="Rótulo longo" rule="A área cresce junto com o texto." measure={target}><Radio name="m-radio-d" value="d" label="Receber novidades por e-mail" checked={false} /></Specimen>
        </Row>
      </Block>

      <Block id="radio-medidas-tabela" title="Medidas e tokens">
        <MeasuresTable caption="Medidas do Radio e os tokens de onde vêm" rows={ROWS} />
      </Block>
    </Measures>
  );
}
