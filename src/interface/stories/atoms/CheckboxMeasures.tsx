import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { Block, Measures, MeasuresTable, Row, Specimen, heightMarks, round, typeValue, type Ctx, type Mark, type TableRow } from "../measures/kit";

/* Seção "Medidas" do Checkbox: cotas medidas do DOM real; a tabela lê os tokens do :root. */

/** Linha clicável (o <label>), caixa visual e texto do rótulo. */
function parts(ctx: Ctx) {
  const row = ctx.q("label");
  const box = row?.querySelector("span[aria-hidden]");
  const text = row ? [...row.children].filter((el) => el.tagName === "SPAN").pop() : null;
  if (!row || !box || !text || text === box) return null;
  return { row: ctx.box(row), box: ctx.box(box), text: ctx.box(text) };
}

function anatomy(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  const gap = p.text.x - (p.box.x + p.box.w);
  return [
    ...heightMarks(p.row.h),
    { kind: "outline", box: p.box },
    { kind: "tag", x: p.box.x + p.box.w / 2, y: p.box.y - 14, text: `${round(p.box.w)}×${round(p.box.h)}` },
    { kind: "fill", box: { x: p.box.x + p.box.w, y: p.box.y, w: gap, h: p.box.h } },
    { kind: "tag", x: p.box.x + p.box.w + gap / 2, y: p.row.y + p.row.h + 14, text: String(round(gap)) },
  ];
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
  { measure: "Caixa", tokens: ["icone-medio"], value: (t) => `${t("icone-medio")} × ${t("icone-medio")}`, usage: "Decorativa (aria-hidden); o estado real vive no input." },
  { measure: "Borda da caixa", tokens: [], value: () => "2px", usage: "Valor fixo no CSS; cor borda-campo (borda-erro no erro)." },
  { measure: "Raio dos cantos", tokens: ["raio-xp"], value: (t) => t("raio-xp"), usage: "Caixa desmarcada e marcada." },
  { measure: "Espaço entre caixa e rótulo", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "Também é o recuo do texto de apoio, somado à largura da caixa." },
  { measure: "Altura da linha (alvo de toque)", tokens: [], value: () => "44px", usage: "Valor fixo no CSS; a linha inteira, caixa e rótulo, é clicável." },
  { measure: "Largura mínima sem rótulo visível", tokens: [], value: () => "44px", usage: "Valor fixo no CSS (hideLabel); caixa centralizada." },
  { measure: "Ícone de marcado e indeterminado", tokens: ["icone-pequeno"], value: (t) => `${t("icone-pequeno")} × ${t("icone-pequeno")}`, usage: "Check ou traço dentro da caixa." },
  { measure: "Anel de foco: espessura", tokens: ["foco-espessura"], value: (t) => t("foco-espessura"), usage: "Halo ao redor da caixa, cor borda-foco." },
  { measure: "Rótulo: tipografia", tokens: ["texto-m"], value: (t) => typeValue(t, "texto-m"), usage: "Fonte, tamanho / entrelinha / peso." },
];

export function CheckboxMeasures() {
  return (
    <Measures>
      <Block id="checkbox-medidas-anatomia" title="Anatomia e espaçamentos" lead="Medidas em px tiradas do próprio componente. A área colorida mostra o espaço entre a caixa e o rótulo; o tracejado marca a caixa.">
        <Row>
          <Specimen caption="Desmarcado" measure={anatomy}><Checkbox label="Aceito os termos" checked={false} /></Specimen>
          <Specimen caption="Marcado" measure={anatomy}><Checkbox label="Aceito os termos" checked /></Specimen>
          <Specimen caption="Indeterminado" measure={anatomy}><Checkbox label="Selecionar tudo" checked={false} indeterminate /></Specimen>
        </Row>
      </Block>

      <Block id="checkbox-medidas-toque" title="Área de toque" lead="A área tracejada é a região clicável: a linha inteira, caixa e rótulo, com 44 px de altura.">
        <Row>
          <Specimen caption="Com rótulo" rule="Altura de 44 px; a largura segue o texto." measure={target}><Checkbox label="Lembrar-me" checked={false} /></Specimen>
          <Specimen caption="Rótulo oculto (hideLabel)" rule="Quadrado de 44 × 44 px; o texto continua no DOM para o leitor de tela." measure={target}><Checkbox label="Selecionar linha 1002" hideLabel checked={false} /></Specimen>
          <Specimen caption="Rótulo longo" rule="A área cresce junto com o texto." measure={target}><Checkbox label="Li e aceito os termos de uso e a política de privacidade" checked={false} /></Specimen>
        </Row>
      </Block>

      <Block id="checkbox-medidas-tabela" title="Medidas e tokens">
        <MeasuresTable caption="Medidas do Checkbox e os tokens de onde vêm" rows={ROWS} />
      </Block>
    </Measures>
  );
}
