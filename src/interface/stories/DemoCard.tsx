import { Children, Fragment, isValidElement, useId, type ReactNode, type ReactElement } from "react";
import { SectionCard } from "./SectionCard";
import { CopyButton } from "../../components/CopyButton/CopyButton";
import styles from "./DemoCard.module.css";

interface DemoCardProps {
  title: string;
  /** Texto de apoio curto, abaixo do título. */
  description?: string;
  /** Código mostrado abaixo. Sem ele, é gerado a partir dos elementos renderizados. */
  code?: string;
  children: ReactNode;
}

/** Nome do componente React (ou null para elementos do DOM). */
function nameOf(type: unknown): string | null {
  if (typeof type === "string") return null;
  const t = type as { displayName?: string; name?: string; render?: { name?: string }; type?: unknown };
  return t.displayName || t.name || t.render?.name || (t.type ? nameOf(t.type) : null) || "Componente";
}

function formatProp(key: string, value: unknown): string | null {
  if (key === "key" || key === "ref" || key === "children" || key === "className" || key === "style" || value === undefined) return null;
  if (typeof value === "function") return `${key}={${key.startsWith("on") ? `handle${key.slice(2)}` : key}}`;
  if (value === true) return key;
  if (typeof value === "string") return `${key}=${JSON.stringify(value)}`;
  if (isValidElement(value)) return `${key}={${toJsx(value, 0)}}`;
  try {
    return `${key}={${literal(value)}}`;
  } catch {
    return null;
  }
}

/** Objetos e listas em JS legível (chaves sem aspas, uma linha quando cabe). */
function literal(value: unknown): string {
  const flat = JSON.stringify(value).replace(/"(\w+)":/g, "$1: ").replace(/,"/g, ', "').replace(/\{/g, "{ ").replace(/\}/g, " }");
  if (flat.length <= 60) return flat.replace(/\{ \}/g, "{}");
  const multi = JSON.stringify(value, null, 2).replace(/"(\w+)":/g, "$1:");
  return multi.replace(/\n/g, "\n  ");
}

/** Serializa os elementos de um exemplo em JSX. Elementos do DOM (div, span…) são só layout da
    demonstração e ficam de fora; ficam os componentes do SDK com as props realmente usadas. */
function toJsx(node: ReactNode, depth: number): string {
  const pad = "  ".repeat(depth);
  const out: string[] = [];
  Children.forEach(node, (child) => {
    if (child === null || child === undefined || typeof child === "boolean") return;
    if (typeof child === "string" || typeof child === "number") return;
    if (!isValidElement(child)) return;
    const el = child as ReactElement<Record<string, unknown>>;
    if (el.type === Fragment || typeof el.type === "string") {
      const inner = toJsx(el.props.children as ReactNode, depth);
      if (inner) out.push(inner);
      return;
    }
    const name = nameOf(el.type);
    const props = Object.entries(el.props).map(([k, v]) => formatProp(k, v)).filter((p): p is string => p !== null);
    const inline = `<${name}${props.length ? " " + props.join(" ") : ""}`;
    const kids = el.props.children as ReactNode;
    const textKids: string[] = [];
    Children.forEach(kids, (c) => {
      if (typeof c === "string" || typeof c === "number") textKids.push(String(c));
    });
    const innerJsx = toJsx(kids, depth + 1);
    const body = innerJsx || (textKids.length ? `${pad}  ${textKids.join("")}` : "");
    const open = inline.length > 72 && props.length > 1 ? `<${name}\n${props.map((p) => `${pad}  ${p}`).join("\n")}\n${pad}` : inline;
    out.push(body ? `${pad}${open}>\n${body}\n${pad}</${name}>` : `${pad}${open}${open === inline ? " " : ""}/>`);
  });
  return out.join("\n");
}

export function DemoCard({ title, description, code, children }: DemoCardProps) {
  const id = `demo-${useId().replace(/:/g, "")}`;
  const source = (code ?? toJsx(children, 0)).trim();
  return (
    <SectionCard id={id} title={title} headingLevel={3}>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.stage}>{children}</div>
      {source && (
        <div className={styles.codeBlock}>
          <pre className={styles.code}>
            <code>{source}</code>
          </pre>
          <div className={styles.copy}>
            <CopyButton value={source} accessibleLabel={`Copiar código: ${title}`} />
          </div>
        </div>
      )}
    </SectionCard>
  );
}
