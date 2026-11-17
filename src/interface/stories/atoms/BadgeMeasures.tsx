import { Badge, type BadgeProps } from "../../../components/Badge/Badge";
import { Block, Measures, MeasuresTable, Row, Specimen, round, typeValue, type Ctx, type Mark, type TableRow } from "../measures/kit";

/* Seção "Medidas" do Badge: cotas medidas do DOM real; a tabela lê os tokens do :root. O Badge
   não é interativo, então não há seção de área de toque. */

function anatomy(ctx: Ctx): Mark[] | null {
  const badge = ctx.wrapper.firstElementChild as HTMLElement | null;
  if (!badge) return null;
  const style = getComputedStyle(badge);
  const border = parseFloat(style.borderLeftWidth) || 0;
  const b = ctx.box(badge);
  const origin = badge.getBoundingClientRect();
  const icon = badge.querySelector("svg");
  const textNode = [...badge.childNodes].find((n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim());
  let textBox: { x: number; w: number } | null = null;
  if (textNode) {
    const range = document.createRange();
    range.selectNodeContents(textNode);
    const r = range.getBoundingClientRect();
    textBox = { x: r.left - origin.left + b.x, w: r.width };
  }
  const bottom = b.y + b.h + 14;
  const marks: Mark[] = [
    { kind: "vline", x: b.x - 16, y: b.y, h: b.h },
    { kind: "tag", x: b.x - 24, y: b.y + b.h / 2, text: String(round(b.h)), anchor: "end" },
  ];
  // Largura sobrando por causa de min-width (contadores de um dígito): o padding efetivo
  // é a distância da borda até o conteúdo, não o valor do CSS.
  if (textBox) {
    const left = textBox.x - b.x - border - (icon ? ctx.box(icon).w + parseFloat(style.columnGap || "0") : 0);
    const right = b.x + b.w - border - (textBox.x + textBox.w);
    marks.push(
      { kind: "fill", box: { x: b.x + border, y: b.y, w: Math.max(left, 0), h: b.h } },
      { kind: "tag", x: b.x + border + Math.max(left, 0) / 2, y: bottom, text: String(round(left)) },
      { kind: "fill", box: { x: textBox.x + textBox.w, y: b.y, w: Math.max(right, 0), h: b.h } },
      { kind: "tag", x: textBox.x + textBox.w + Math.max(right, 0) / 2, y: bottom, text: String(round(right)) },
    );
  }
  if (icon && textBox) {
    const ib = ctx.box(icon);
    const gap = textBox.x - (ib.x + ib.w);
    marks.push(
      { kind: "outline", box: ib },
      { kind: "tag", x: ib.x + ib.w / 2, y: ib.y - 14, text: String(round(ib.w)) },
      { kind: "fill", box: { x: ib.x + ib.w, y: b.y, w: gap, h: b.h } },
      { kind: "tag", x: ib.x + ib.w + gap / 2, y: bottom, text: String(round(gap)) },
    );
  }
  marks.push({ kind: "tag", x: b.x + b.w / 2, y: b.y - 32, text: `${round(b.w)} de largura` });
  return marks;
}

function Case({ caption, ...props }: { caption: string } & BadgeProps) {
  return (
    <Specimen caption={caption} measure={anatomy}>
      <Badge {...props} />
    </Specimen>
  );
}

const ROWS: TableRow[] = [
  { measure: "Padding lateral", tokens: ["espaco-pp"], value: (t) => t("espaco-pp"), usage: "Entre a borda e o conteúdo, nos dois lados." },
  { measure: "Padding vertical", tokens: ["espaco-xp"], value: (t) => t("espaco-xp"), usage: "Somado à altura da linha do texto." },
  { measure: "Borda", tokens: [], value: () => "1px", usage: "Valor fixo no CSS; mesma cor do fundo (borda-base nas variantes sem cor)." },
  { measure: "Largura mínima", tokens: ["icone-pequeno", "espaco-xp"], value: (t) => `${parseFloat(t("icone-pequeno")) + parseFloat(t("espaco-xp"))}px`, usage: "Piso da largura; na prática o padding lateral já a supera, e o Badge cresce com o texto." },
  { measure: "Espaço entre ícone e texto", tokens: ["espaco-xp"], value: (t) => t("espaco-xp"), usage: "Só quando há ícone." },
  { measure: "Ícone", tokens: ["icone-pequeno"], value: (t) => `${t("icone-pequeno")} × ${t("icone-pequeno")}`, usage: "Decorativo, na cor do texto." },
  { measure: "Cantos", tokens: ["raio-circular"], value: () => "pílula", usage: "Totalmente arredondado." },
  { measure: "Posição sobre outro elemento", tokens: [], value: () => "centro no canto", usage: "Com position, o centro do Badge fica no canto do elemento (translate de 50%)." },
  { measure: "Limite do contador", tokens: [], value: () => "99+", usage: "Acima de max (padrão 99) mostra \"99+\"." },
  { measure: "Tipografia", tokens: ["texto-micro-forte"], value: (t) => typeValue(t, "texto-micro-forte"), usage: "Fonte, tamanho / entrelinha / peso." },
];

export function BadgeMeasures() {
  return (
    <Measures>
      <Block id="badge-medidas-anatomia" title="Anatomia e espaçamentos" lead="Medidas em px tiradas do próprio Badge. As áreas coloridas mostram o padding efetivo e o espaço entre ícone e texto; o tracejado marca o ícone.">
        <Row>
          <Case caption="Texto" variant="info" label="Novo" />
          <Case caption="Ícone e texto" variant="success" label="Pago" icon="check" />
          <Case caption="Contador de 1 dígito" variant="error" count={3} />
          <Case caption="Contador de 2 dígitos" variant="error" count={42} />
          <Case caption="Contador acima do limite" variant="error" count={120} />
        </Row>
      </Block>

      <Block id="badge-medidas-tabela" title="Medidas e tokens">
        <MeasuresTable caption="Medidas do Badge e os tokens de onde vêm" rows={ROWS} />
      </Block>
    </Measures>
  );
}
