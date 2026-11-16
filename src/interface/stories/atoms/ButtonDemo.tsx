import { Button, type ButtonProps, type ButtonLinkState, type ButtonState, type ButtonVariant } from "../../../components/Button/Button";
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

export function ButtonDemo() {
  return (
    <div className={styles.demo}>
      <p className={styles.note}>Ícones e Spinner usam icone-grande (24px); iconOnly preenchido tem alvo quadrado botao-altura e link acomoda ícone e borda. Matriz: preenchidos com seis formatos e cinco estados; link com cinco formatos e três estados, sem contador. Link textual tem sublinhado permanente apenas no rótulo; hover muda a cor do texto e dos ícones. Disabled mantém o sublinhado; iconOnly não é sublinhado. São 135 combinações por tema. Use o seletor de tema do Playground para conferir a mesma matriz em claro e escuro.</p>
      <div className={styles.matrix} data-button-matrix>
        {VARIANTS.filter((variant) => variant !== "link").map((variant) => (
          <section key={variant} id={BUTTON_PREVIEW_SECTIONS.find((section) => section.title === variant)?.id} className={styles.variant} aria-labelledby={`button-variant-${variant}`} data-variant={variant}>
            <h3 id={`button-variant-${variant}`} className={styles.heading}>{variant}</h3>
            {FORMATS.map((format) => (
              <fieldset key={format.id} className={styles.format} data-format={format.id}>
                <legend className={styles.legend}>{format.title}</legend>
                <div className={styles.states}>
                  {STATES.map((state) => (
                    <div key={state} className={styles.sample}>
                      <span className={styles.stateLabel}>{state}</span>
                      <Button {...format.props} variant={variant} state={state} />
                    </div>
                  ))}
                </div>
              </fieldset>
            ))}
          </section>
        ))}
        <section id={BUTTON_PREVIEW_SECTIONS.find((section) => section.title === "link")?.id} className={styles.variant} aria-labelledby="button-variant-link" data-variant="link">
          <h3 id="button-variant-link" className={styles.heading}>link</h3>
          {LINK_FORMATS.map((format) => (
            <fieldset key={format.id} className={styles.format} data-format={format.id}>
              <legend className={styles.legend}>{format.title}</legend>
              <div className={styles.states}>
                {LINK_STATES.map((state) => (
                  <div key={state} className={styles.sample}>
                    <span className={styles.stateLabel}>{state}</span>
                    <Button {...format.props} state={state} />
                  </div>
                ))}
              </div>
            </fieldset>
          ))}
        </section>
      </div>
      <section id={BUTTON_PREVIEW_SECTIONS.find((section) => section.title === "Limites do contador")?.id} className={styles.variant} aria-label="Limites do contador">
        <h3 className={styles.heading}>Limites do contador</h3>
        <div className={styles.states}>
          <Button label="Notificações" count={0} />
          <Button label="Notificações" count={100} rightIcon="arrow-right" />
          <Button label="Consultar todas as notificações e solicitações pendentes de análise" count={100} leftIcon="bell" rightIcon="arrow-right" />
        </div>
      </section>

    </div>
  );
}
