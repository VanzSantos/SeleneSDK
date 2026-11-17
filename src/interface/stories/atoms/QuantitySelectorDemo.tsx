import { useState } from "react";
import { QuantitySelector } from "../../../components/QuantitySelector/QuantitySelector";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function QuantitySelectorDemo() {
  const [quantidade, setQuantidade] = useState(2);

  return (
    <div className={styles.cards}>
      <DemoCard title="Interativo" description="Min=0, max=10.">
        <QuantitySelector
          value={quantidade}
          min={0}
          max={10}
          accessibleLabel="Quantidade"
          onChange={setQuantidade}
        />
      </DemoCard>
      <DemoCard title="Nos limites" description="Desabilita o lado correspondente.">
        <div className={styles.row}>
          <QuantitySelector value={0} min={0} max={10} accessibleLabel="No mínimo" />
          <QuantitySelector value={10} min={0} max={10} accessibleLabel="No máximo" />
        </div>
      </DemoCard>
      <DemoCard title="Desabilitado">
        <QuantitySelector value={3} min={0} max={10} accessibleLabel="Desabilitado" state="disabled" />
      </DemoCard>
    </div>
  );
}
