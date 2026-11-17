import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Button, type ButtonProps } from "../../../components/Button/Button";
import styles from "./ButtonMeasures.module.css";

/* Seção "Medidas" do Button. Nada aqui é digitado à mão: as cotas dos diagramas são medidas
   no DOM dos próprios botões renderizados, e a tabela lê os tokens do :root. Se um token
   mudar, a seção acompanha. */

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Metrics {
  size: { w: number; h: number };
  /** Espessura da borda do botão (transparente): fica entre a borda externa e o padding. */
  border: number;
  content: Box;
  icons: Box[];
  label: Box | null;
  count: Box | null;
}

const round = (value: number) => Math.round(value * 10) / 10;

/** Mede o botão dentro do wrapper, com coordenadas relativas ao canto do wrapper. */
function measure(wrapper: HTMLElement): Metrics | null {
  const button = wrapper.querySelector("button");
  const content = button?.firstElementChild as HTMLElement | null;
  if (!button || !content) return null;
  const origin = wrapper.getBoundingClientRect();
  const box = (el: Element): Box => {
    const r = el.getBoundingClientRect();
    return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height };
  };
  const children = [...content.children];
  const labelEl = children.find((el) => el.tagName === "SPAN" && el.textContent && !el.textContent.match(/^\d+\+?$/) && el.className.includes("label"));
  const countEl = children.find((el) => el.tagName === "SPAN" && el.className.includes("count"));
  return {
    size: { w: origin.width, h: origin.height },
    border: parseFloat(getComputedStyle(button).borderLeftWidth) || 0,
    content: box(content),
    icons: children.filter((el) => el.tagName.toLowerCase() === "svg").map(box),
    label: labelEl ? box(labelEl) : null,
    count: countEl ? box(countEl) : null,
  };
}

function useMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  useLayoutEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;
    // Os exemplos são só para medir e mostrar: fora da ordem de tabulação.
    wrapper.setAttribute("inert", "");
    const update = () => setMetrics(measure(wrapper));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    void document.fonts?.ready.then(update);
    return () => observer.disconnect();
  }, []);
  return { ref, metrics };
}

/** Cota: rótulo numérico centralizado numa posição absoluta. */
function Tag({ x, y, children, anchor = "center" }: { x: number; y: number; children: ReactNode; anchor?: "center" | "end" }) {
  return (
    <span className={styles.tag} data-anchor={anchor} style={{ left: x, top: y }}>
      {children}
    </span>
  );
}

function Region({ box, className }: { box: Box; className: string }) {
  return <span className={className} style={{ left: box.x, top: box.y, width: box.w, height: box.h }} />;
}

/* ---- Anatomia ---- */

function AnatomySpecimen({ caption, props }: { caption: string; props: ButtonProps }) {
  const { ref, metrics } = useMetrics();
  const m = metrics;
  // Padding = distância da borda interna ao conteúdo (a borda de 1px não conta).
  const padLeft = m ? m.content.x - m.border : 0;
  const padRight = m ? m.size.w - (m.content.x + m.content.w) - m.border : 0;
  const firstIcon = m?.icons[0];
  const gap = m && firstIcon && m.label ? m.label.x - (firstIcon.x + firstIcon.w) : 0;
  const countGap = m && m.count && m.label ? m.count.x - (m.label.x + m.label.w) : 0;
  const summary = m
    ? `${caption}: altura ${round(m.size.h)}, padding lateral ${round(padLeft)} e ${round(padRight)}` +
      (firstIcon ? `, ícone ${round(firstIcon.w)}, espaço ${round(gap)}` : "") +
      (m.count ? `, contador ${round(m.count.w)} por ${round(m.count.h)}, espaço ${round(countGap)}` : "")
    : caption;

  return (
    <figure className={styles.figure} aria-label={summary}>
      <div className={styles.stage}>
        <div className={styles.specimen} ref={ref}>
          <Button {...props} />
          {m && (
            <div className={styles.overlay} aria-hidden="true">
              {/* altura */}
              <span className={styles.vline} style={{ left: -16, top: 0, height: m.size.h }} />
              <Tag x={-24} y={m.size.h / 2} anchor="end">{round(m.size.h)}</Tag>
              {/* padding lateral */}
              <Region className={styles.fill} box={{ x: m.border, y: 0, w: padLeft, h: m.size.h }} />
              <Region className={styles.fill} box={{ x: m.size.w - m.border - padRight, y: 0, w: padRight, h: m.size.h }} />
              <Tag x={m.border + padLeft / 2} y={m.size.h + 14}>{round(padLeft)}</Tag>
              <Tag x={m.size.w - m.border - padRight / 2} y={m.size.h + 14}>{round(padRight)}</Tag>
              {/* ícones */}
              {m.icons.map((icon, index) => (
                <span key={index}>
                  <Region className={styles.outline} box={icon} />
                  <Tag x={icon.x + icon.w / 2} y={icon.y - 14}>{round(icon.w)}</Tag>
                </span>
              ))}
              {/* espaço entre ícone e rótulo */}
              {firstIcon && m.label && gap > 0 && (
                <>
                  <Region className={styles.fill} box={{ x: firstIcon.x + firstIcon.w, y: m.content.y, w: gap, h: m.content.h }} />
                  <Tag x={firstIcon.x + firstIcon.w + gap / 2} y={m.size.h + 14}>{round(gap)}</Tag>
                </>
              )}
              {/* contador */}
              {m.count && m.label && (
                <>
                  <Region className={styles.outline} box={m.count} />
                  <Tag x={m.count.x + m.count.w / 2} y={m.count.y - 14}>{round(m.count.w)}×{round(m.count.h)}</Tag>
                  <Region className={styles.fill} box={{ x: m.label.x + m.label.w, y: m.content.y, w: countGap, h: m.content.h }} />
                  <Tag x={m.label.x + m.label.w + countGap / 2} y={m.size.h + 14}>{round(countGap)}</Tag>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

/* ---- Áreas de toque ---- */

function TargetSpecimen({ caption, rule, props }: { caption: string; rule: string; props: ButtonProps }) {
  const { ref, metrics } = useMetrics();
  const m = metrics;
  const label = m ? `${round(m.size.w)} × ${round(m.size.h)}` : "";
  return (
    <figure className={styles.figure} aria-label={`${caption}: ${label}. ${rule}`}>
      <div className={styles.stage}>
        <div className={styles.specimen} ref={ref}>
          <Button {...props} />
          {m && (
            <div className={styles.overlay} aria-hidden="true">
              <span className={styles.target} style={{ left: 0, top: 0, width: m.size.w, height: m.size.h }} />
              <Tag x={m.size.w / 2} y={m.size.h + 14}>{label}</Tag>
            </div>
          )}
        </div>
      </div>
      <figcaption className={styles.caption}>
        <strong>{caption}</strong>
        <span>{rule}</span>
      </figcaption>
    </figure>
  );
}

/* ---- Tabela de medidas (lida dos tokens) ---- */

function readToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

interface Row {
  measure: string;
  tokens: string[];
  value: (read: (name: string) => string) => string;
  usage: string;
}

const ROWS: Row[] = [
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
  { measure: "Rótulo: tipografia", tokens: ["texto-rotulo-botao"], value: (t) => `${t("texto-rotulo-botao-family").split(",")[0]} ${t("texto-rotulo-botao-size")} / ${t("texto-rotulo-botao-line-height")} / ${t("texto-rotulo-botao-weight")}`, usage: "Fonte, tamanho / entrelinha / peso." },
  { measure: "Contador: tipografia", tokens: ["texto-micro-forte"], value: (t) => `${t("texto-micro-forte-family").split(",")[0]} ${t("texto-micro-forte-size")} / ${t("texto-micro-forte-line-height")} / ${t("texto-micro-forte-weight")}`, usage: "Fonte, tamanho / entrelinha / peso." },
];

function MeasuresTable() {
  const [read, setRead] = useState<((name: string) => string) | null>(null);
  useLayoutEffect(() => setRead(() => readToken), []);
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>Medidas do Button e os tokens de onde vêm</caption>
        <thead>
          <tr>
            <th scope="col">Medida</th>
            <th scope="col">Valor</th>
            <th scope="col">Token</th>
            <th scope="col">Observação</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.measure}>
              <th scope="row">{row.measure}</th>
              <td className={styles.value}>{read ? row.value(read) : "—"}</td>
              <td>
                {row.tokens.map((token) => (
                  <code key={token} className={styles.token}>{token}</code>
                ))}
              </td>
              <td>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ButtonMeasures() {
  return (
    <div className={styles.measures}>
      <section className={styles.block} aria-labelledby="button-medidas-anatomia">
        <h3 id="button-medidas-anatomia" className={styles.heading}>Anatomia e espaçamentos</h3>
        <p className={styles.lead}>Medidas em px tiradas do próprio botão. As áreas coloridas mostram o padding e o espaço entre os elementos; o tracejado marca ícone e contador.</p>
        <div className={styles.row}>
          <AnatomySpecimen caption="Somente texto" props={{ variant: "secondary", label: "Detalhes" }} />
          <AnatomySpecimen caption="Ícone e texto" props={{ variant: "secondary", label: "Detalhes", leftIcon: "info" }} />
          <AnatomySpecimen caption="Com contador" props={{ variant: "secondary", label: "Avisos", count: 3 }} />
        </div>
      </section>

      <section className={styles.block} aria-labelledby="button-medidas-toque">
        <h3 id="button-medidas-toque" className={styles.heading}>Áreas de toque</h3>
        <p className={styles.lead}>A área tracejada é a região clicável. O botão preenchido tem 44 px de altura e o somente ícone é um quadrado de 44 px. O link não tem padding, então usa o alvo mínimo de 24 px.</p>
        <div className={styles.row}>
          <TargetSpecimen caption="Preenchido" rule="Altura mínima 44 px; largura segue o conteúdo." props={{ variant: "primary", label: "Detalhes" }} />
          <TargetSpecimen caption="Somente ícone" rule="Quadrado de 44 × 44 px." props={{ variant: "secondary", iconOnly: true, leftIcon: "eye", accessibleLabel: "Mostrar detalhes" }} />
          <TargetSpecimen caption="Link" rule="Altura da linha do texto, nunca menos de 24 px." props={{ variant: "link", label: "Detalhes" }} />
          <TargetSpecimen caption="Link somente ícone" rule="Quadrado de 24 × 24 px." props={{ variant: "link", iconOnly: true, leftIcon: "eye", accessibleLabel: "Mostrar detalhes" }} />
        </div>
      </section>

      <section className={styles.block} aria-labelledby="button-medidas-tabela">
        <h3 id="button-medidas-tabela" className={styles.heading}>Medidas e tokens</h3>
        <MeasuresTable />
      </section>
    </div>
  );
}
