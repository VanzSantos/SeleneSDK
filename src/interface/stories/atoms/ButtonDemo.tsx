import { Button, type ButtonProps, type ButtonLinkState, type ButtonState, type ButtonVariant } from "../../../components/Button/Button";
import { SectionCard } from "../SectionCard";
import { CopyButton } from "../../../components/CopyButton/CopyButton";
import styles from "./ButtonDemo.module.css";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "neutral", "destructive", "link"];
export const BUTTON_PREVIEW_SECTIONS = [
  ...VARIANTS.map((variant) => ({ id: `button-preview-${variant}`, title: variant })),
  { id: "button-preview-count-limits", title: "Limites do contador" },
];
const STATES: ButtonState[] = ["default", "hover", "pressed", "disabled", "loading"];
const FORMATS: { id: string; title: string; props: Extract<ButtonProps, { variant?: Exclude<ButtonVariant, "link"> }> }[] = [
  { id: "text", title: "Somente texto", props: { label: "Detalhes" } },
  { id: "left", title: "Ícone à esquerda", props: { label: "Detalhes", leftIcon: "info" } },
  { id: "right", title: "Ícone à direita", props: { label: "Detalhes", rightIcon: "arrow-right" } },
  { id: "both", title: "Ícones nos dois lados", props: { label: "Detalhes", leftIcon: "info", rightIcon: "arrow-right" } },
  { id: "count", title: "Com contador", props: { label: "Avisos", count: 3 } },
  { id: "icon", title: "Somente ícone", props: { iconOnly: true, leftIcon: "eye", accessibleLabel: "Mostrar detalhes" } },
];

const LINK_STATES: ButtonLinkState[] = ["default", "hover", "disabled"];
const LINK_FORMATS: { id: string; title: string; props: Extract<ButtonProps, { variant: "link" }> }[] = [
  { id: "text", title: "Somente texto", props: { variant: "link", label: "Detalhes" } },
  { id: "left", title: "Ícone à esquerda", props: { variant: "link", label: "Detalhes", leftIcon: "info" } },
  { id: "right", title: "Ícone à direita", props: { variant: "link", label: "Detalhes", rightIcon: "arrow-right" } },
  { id: "both", title: "Ícones nos dois lados", props: { variant: "link", label: "Detalhes", leftIcon: "info", rightIcon: "arrow-right" } },
  { id: "icon", title: "Somente ícone", props: { variant: "link", iconOnly: true, leftIcon: "eye", accessibleLabel: "Mostrar detalhes" } },
];

/** Monta o JSX de um exemplo a partir das mesmas props usadas no cartão, então o código
    mostrado nunca diverge do que está renderizado. */
function toJsx(props: Record<string, unknown>) {
  const attrs = Object.entries(props).map(([key, value]) =>
    value === true ? key : typeof value === "string" ? `${key}="${value}"` : `${key}={${JSON.stringify(value)}}`,
  );
  return `<Button ${attrs.join(" ")} />`;
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className={styles.codeBlock}>
      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
      <div className={styles.copy}>
        <CopyButton value={code} accessibleLabel={`Copiar código: ${label}`} />
      </div>
    </div>
  );
}

/** Um formato (ex.: "Somente texto") = título + cartão com a linha de estados + o código. */
function FormatBlock({ id, title, code, children }: { id: string; title: string; code: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-labelledby={id} className={styles.format} data-format={id.split("--")[1]}>
      <h4 id={id} className={styles.formatTitle}>{title}</h4>
      <div className={styles.card}>
        <div className={styles.states}>{children}</div>
      </div>
      <CodeBlock code={code} label={title} />
    </div>
  );
}

const COUNT_LIMITS_CODE = [
  toJsx({ label: "Notificações", count: 0 }),
  toJsx({ label: "Notificações", count: 100, rightIcon: "arrow-right" }),
  toJsx({ label: "Consultar todas as notificações e solicitações pendentes de análise", count: 100, leftIcon: "bell", rightIcon: "arrow-right" }),
].join("\n");

export function ButtonDemo() {
  return (
    <div className={styles.demo}>
      <div className={styles.matrix} data-button-matrix>
        {VARIANTS.filter((variant) => variant !== "link").map((variant) => (
          <SectionCard key={variant} id={BUTTON_PREVIEW_SECTIONS.find((section) => section.title === variant)?.id ?? `button-preview-${variant}`} title={variant} headingLevel={3}>
            <div className={styles.variantBody} data-variant={variant}>
            {FORMATS.map((format) => (
              <FormatBlock key={format.id} id={`button-${variant}--${format.id}`} title={format.title} code={toJsx({ variant, ...format.props })}>
                {STATES.map((state) => (
                  <div key={state} className={styles.sample}>
                    <span className={styles.stateLabel}>{state}</span>
                    <Button {...format.props} variant={variant} state={state} />
                  </div>
                ))}
              </FormatBlock>
            ))}
            </div>
          </SectionCard>
        ))}
        <SectionCard id="button-preview-link" title="link" headingLevel={3}>
          <div className={styles.variantBody} data-variant="link">
          {LINK_FORMATS.map((format) => (
            <FormatBlock key={format.id} id={`button-link--${format.id}`} title={format.title} code={toJsx({ ...format.props })}>
              {LINK_STATES.map((state) => (
                <div key={state} className={styles.sample}>
                  <span className={styles.stateLabel}>{state}</span>
                  <Button {...format.props} state={state} />
                </div>
              ))}
            </FormatBlock>
          ))}
          </div>
        </SectionCard>
        <SectionCard id="button-preview-count-limits" title="Limites do contador" headingLevel={3}>
          <div className={styles.card}>
            <div className={styles.states}>
              <Button label="Notificações" count={0} />
              <Button label="Notificações" count={100} rightIcon="arrow-right" />
              <Button label="Consultar todas as notificações e solicitações pendentes de análise" count={100} leftIcon="bell" rightIcon="arrow-right" />
            </div>
          </div>
          <CodeBlock label="Limites do contador" code={COUNT_LIMITS_CODE} />
        </SectionCard>
      </div>
    </div>
  );
}
