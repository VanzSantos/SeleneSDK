import { Switch } from "../../../components/Switch/Switch";
import { Block, Measures, MeasuresTable, Row, Specimen, heightMarks, round, typeValue, type Ctx, type Mark, type TableRow } from "../measures/kit";

/* Seção "Medidas" do Switch: cotas medidas do DOM real; a tabela lê os tokens do :root. */

function parts(ctx: Ctx) {
  const row = ctx.q("label");
  const track = row?.querySelector("span[aria-hidden]");
  const thumb = track?.firstElementChild;
  const text = row ? [...row.children].filter((el) => el.tagName === "SPAN" && el !== track).pop() : null;
  if (!row || !track || !thumb) return null;
  return { row: ctx.box(row), track: ctx.box(track), thumb: ctx.box(thumb), text: text ? ctx.box(text) : null };
}

function anatomy(ctx: Ctx): Mark[] | null {
  const p = parts(ctx);
  if (!p) return null;
  const marks: Mark[] = [
    ...heightMarks(p.row.h),
    { kind: "outline", box: p.track },
    { kind: "tag", x: p.track.x + p.track.w / 2, y: p.track.y - 14, text: `${round(p.track.w)}×${round(p.track.h)}` },
    { kind: "outline", box: p.thumb },
    { kind: "tag", x: p.thumb.x + p.thumb.w / 2, y: p.thumb.y + p.thumb.h + 14, text: String(round(p.thumb.w)) },
  ];
  if (p.text) {
    const gap = p.text.x - (p.track.x + p.track.w);
    marks.push({ kind: "fill", box: { x: p.track.x + p.track.w, y: p.track.y, w: gap, h: p.track.h } }, { kind: "tag", x: p.track.x + p.track.w + gap / 2, y: p.row.y + p.row.h + 14, text: String(round(gap)) });
  }
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
  { measure: "Trilho: largura", tokens: ["icone-medio", "espaco-xp"], value: (t) => `${(parseFloat(t("icone-medio")) + parseFloat(t("espaco-xp")) * 2) * 2}px`, usage: "Duas vezes a altura do trilho." },
  { measure: "Trilho: altura", tokens: ["icone-medio", "espaco-xp"], value: (t) => `${parseFloat(t("icone-medio")) + parseFloat(t("espaco-xp")) * 2}px`, usage: "Botão deslizante mais uma folga de espaco-xp em cada lado." },
  { measure: "Botão deslizante (padrão)", tokens: ["icone-medio"], value: (t) => `${t("icone-medio")} × ${t("icone-medio")}`, usage: "Círculo que se move entre desligado e ligado." },
  { measure: "Botão deslizante (small)", tokens: ["icone-pequeno"], value: (t) => `${t("icone-pequeno")} × ${t("icone-pequeno")}`, usage: "Para contextos densos, como a coluna de ações da Datatable." },
  { measure: "Borda do trilho", tokens: [], value: () => "2px", usage: "Valor fixo no CSS; cor borda-campo." },
  { measure: "Espaço entre trilho e rótulo", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "Só quando há rótulo visível." },
  { measure: "Altura da linha (alvo de toque)", tokens: [], value: () => "44px", usage: "Valor fixo no CSS; sem rótulo o padding vertical completa os 44 px." },
  { measure: "Anel de foco: espessura", tokens: ["foco-espessura"], value: (t) => t("foco-espessura"), usage: "Halo ao redor do trilho, cor borda-foco." },
  { measure: "Rótulo: tipografia", tokens: ["texto-m"], value: (t) => typeValue(t, "texto-m"), usage: "Fonte, tamanho / entrelinha / peso." },
];

export function SwitchMeasures() {
  return (
    <Measures>
      <Block id="switch-medidas-anatomia" title="Anatomia e espaçamentos" lead="Medidas em px tiradas do próprio componente. O tracejado marca o trilho e o botão deslizante; a área colorida mostra o espaço até o rótulo.">
        <Row>
          <Specimen caption="Desligado" measure={anatomy}><Switch label="Notificações" checked={false} /></Specimen>
          <Specimen caption="Ligado" measure={anatomy}><Switch label="Notificações" checked /></Specimen>
          <Specimen caption="Small" measure={anatomy}><Switch label="Notificações" checked size="small" /></Specimen>
        </Row>
      </Block>

      <Block id="switch-medidas-toque" title="Áreas de toque" lead="A área tracejada é a região clicável. O trilho tem só 28 px de altura, então a linha completa 44 px com o rótulo ou com padding vertical.">
        <Row>
          <Specimen caption="Com rótulo" rule="Altura de 44 px; a largura segue o texto." measure={target}><Switch label="Notificações" checked={false} /></Specimen>
          <Specimen caption="Sem rótulo visível" rule="Trilho com padding vertical, 44 px de altura." measure={target}><Switch accessibleLabel="Ativar notificações" checked={false} /></Specimen>
        </Row>
      </Block>

      <Block id="switch-medidas-tabela" title="Medidas e tokens">
        <MeasuresTable caption="Medidas do Switch e os tokens de onde vêm" rows={ROWS} />
      </Block>
    </Measures>
  );
}
