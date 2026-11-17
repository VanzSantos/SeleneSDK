import { StackedText } from "../../../components/StackedText/StackedText";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function StackedTextDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Uso típico" description="Nome + e-mail.">
        <StackedText primaryText="Ana Souza" secondaryText="ana@exemplo.com" />
      </DemoCard>
      <DemoCard title={"align=\"right\""} description="Ex.: célula numérica com unidade.">
        <StackedText primaryText="R$ 240,00" secondaryText="à vista" align="right" />
      </DemoCard>
      <DemoCard title={"align=\"center\""}>
        <StackedText primaryText="Ativo" secondaryText="desde 2024" align="center" />
      </DemoCard>
    </div>
  );
}
