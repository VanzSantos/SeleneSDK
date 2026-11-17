import { Tooltip } from "../../../components/Tooltip/Tooltip";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function TooltipDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard
        title="Gatilho com dica"
        description="Aparece no hover, no foco por teclado (Tab) e no toque."
        code={`<Tooltip text="Dica curta e objetiva, ancorada ao gatilho." placement="top">
  <button type="button">Passe o mouse, foque (Tab) ou toque</button>
</Tooltip>`}
      >
        <Tooltip text="Dica curta e objetiva, ancorada ao gatilho." placement="top">
          <button className={styles.trigger} type="button">
            Passe o mouse, foque (Tab) ou toque
          </button>
        </Tooltip>
      </DemoCard>
    </div>
  );
}
