import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Measures.module.css";

/* Peças comuns das seções "Medidas". Nada é digitado à mão: as cotas saem do DOM dos próprios
   componentes renderizados (getBoundingClientRect) e a tabela lê os tokens do :root, então a
   seção acompanha qualquer mudança de token. */

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Mark =
  | { kind: "outline" | "fill" | "target"; box: Box }
  | { kind: "tag"; x: number; y: number; text: string; anchor?: "center" | "end" }
  | { kind: "vline"; x: number; y: number; h: number };

export interface Ctx {
  wrapper: HTMLElement;
  /** Tamanho do wrapper (o componente medido). */
  size: { w: number; h: number };
  /** Caixa do elemento, relativa ao canto do wrapper. */
  box: (el: Element) => Box;
  q: <T extends Element = HTMLElement>(selector: string) => T | null;
  qa: (selector: string) => Element[];
}

export const round = (value: number) => Math.round(value * 10) / 10;

function useMarks(measure: (ctx: Ctx) => Mark[] | null) {
  const ref = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<Mark[] | null>(null);
  const measureRef = useRef(measure);
  measureRef.current = measure;
  useLayoutEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;
    // Os exemplos são só para medir e mostrar: fora da ordem de tabulação.
    wrapper.setAttribute("inert", "");
    const update = () => {
      const origin = wrapper.getBoundingClientRect();
      const ctx: Ctx = {
        wrapper,
        size: { w: origin.width, h: origin.height },
        box: (el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height };
        },
        q: (selector) => wrapper.querySelector(selector) as never,
        qa: (selector) => [...wrapper.querySelectorAll(selector)],
      };
      setMarks(measureRef.current(ctx));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    void document.fonts?.ready.then(update);
    return () => observer.disconnect();
  }, []);
  return { ref, marks };
}

const CLASS = { outline: styles.outline, fill: styles.fill, target: styles.target } as const;

function Overlay({ marks }: { marks: Mark[] }) {
  return (
    <div className={styles.overlay} aria-hidden="true">
      {marks.map((mark, index) => {
        if (mark.kind === "tag") {
          return (
            <span key={index} className={styles.tag} data-anchor={mark.anchor ?? "center"} style={{ left: mark.x, top: mark.y }}>
              {mark.text}
            </span>
          );
        }
        if (mark.kind === "vline") {
          return <span key={index} className={styles.vline} style={{ left: mark.x, top: mark.y, height: mark.h }} />;
        }
        const { x, y, w, h } = mark.box;
        return <span key={index} className={CLASS[mark.kind]} style={{ left: x, top: y, width: w, height: h }} />;
      })}
    </div>
  );
}

interface SpecimenProps {
  caption: string;
  /** Frase abaixo da legenda (usada nas áreas de toque). */
  rule?: string;
  /** O componente, renderizado de verdade. */
  children: ReactNode;
  measure: (ctx: Ctx) => Mark[] | null;
}

/** Quadro pontilhado com o componente real e as cotas por cima. O leitor de tela recebe um
    resumo textual com os mesmos números. */
export function Specimen({ caption, rule, children, measure }: SpecimenProps) {
  const { ref, marks } = useMarks(measure);
  const numbers = (marks ?? []).filter((m): m is Extract<Mark, { kind: "tag" }> => m.kind === "tag").map((m) => m.text);
  const summary = `${caption}${numbers.length ? `: ${numbers.join(", ")}` : ""}${rule ? `. ${rule}` : ""}`;
  return (
    <figure className={styles.figure} aria-label={summary}>
      <div className={styles.stage}>
        <div className={styles.specimen} ref={ref}>
          {children}
          {marks && <Overlay marks={marks} />}
        </div>
      </div>
      <figcaption className={styles.caption}>
        {rule ? <strong>{caption}</strong> : caption}
        {rule && <span>{rule}</span>}
      </figcaption>
    </figure>
  );
}

/** Seção com título, texto de apoio e o conteúdo. */
export function Block({ id, title, lead, children }: { id: string; title: string; lead?: string; children: ReactNode }) {
  return (
    <section className={styles.block} aria-labelledby={id}>
      <h3 id={id} className={styles.heading}>{title}</h3>
      {lead && <p className={styles.lead}>{lead}</p>}
      {children}
    </section>
  );
}

export function Row({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={wide ? `${styles.row} ${styles.rowWide}` : styles.row}>{children}</div>;
}

export function Measures({ children }: { children: ReactNode }) {
  return <div className={styles.measures}>{children}</div>;
}

/* ---- Tabela de medidas (lida dos tokens) ---- */

export type ReadToken = (name: string) => string;

function readToken(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

export interface TableRow {
  measure: string;
  tokens: string[];
  value: (read: ReadToken) => string;
  usage: string;
}

/** Valor tipográfico no formato "Fonte tamanho / entrelinha / peso". */
export const typeValue = (read: ReadToken, style: string) =>
  `${read(`${style}-family`).split(",")[0]} ${read(`${style}-size`)} / ${read(`${style}-line-height`)} / ${read(`${style}-weight`)}`;

export function MeasuresTable({ caption, rows }: { caption: string; rows: TableRow[] }) {
  const [read, setRead] = useState<ReadToken | null>(null);
  useLayoutEffect(() => setRead(() => readToken), []);
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Medida</th>
            <th scope="col">Valor</th>
            <th scope="col">Token</th>
            <th scope="col">Observação</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.measure}>
              <th scope="row">{row.measure}</th>
              <td className={styles.value}>{read ? row.value(read) : "—"}</td>
              <td>
                {row.tokens.length ? row.tokens.map((token) => <code key={token} className={styles.token}>{token}</code>) : "—"}
              </td>
              <td>{row.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Cota de altura à esquerda do componente. */
export function heightMarks(h: number): Mark[] {
  return [
    { kind: "vline", x: -16, y: 0, h },
    { kind: "tag", x: -24, y: h / 2, text: String(round(h)), anchor: "end" },
  ];
}
