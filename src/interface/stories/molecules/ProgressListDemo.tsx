import { ProgressList } from "../../../components/ProgressList/ProgressList";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function ProgressListDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Prioridade" description="Variantes de severidade.">
        <ProgressList
          items={[
            { label: "No prazo", value: 50, count: "50 Qt", variant: "neutral" },
            { label: "Atenção", value: 25, count: "25 Qt", variant: "warning" },
            { label: "Urgente", value: 0, count: "0 Qt", variant: "error" },
            { label: "Atrasado", value: 25, count: "25 Qt", variant: "critical" },
          ]}
        />
      </DemoCard>

      <DemoCard title="Rede de atendimento" description="Mesmo tom pra todas.">
        <ProgressList
          items={[
            { label: "Ambulatorial", value: 40, max: 250, count: "40 Qt", variant: "success" },
            { label: "Internação Eletiva", value: 250, max: 250, count: "250 Qt", variant: "success" },
            { label: "Pronto Socorro", value: 100, max: 250, count: "100 Qt", variant: "success" },
          ]}
        />
      </DemoCard>
    </div>
  );
}
