import { useEffect, useState } from "react";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function ProgressBarDemo() {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgresso((p) => (p >= 100 ? 0 : p + 7));
    }, 400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.cards}>
      <DemoCard title="Estático" description="Com showValue.">
        <ProgressBar value={25} accessibleLabel="Progresso de exemplo" showValue />
        <ProgressBar value={70} accessibleLabel="Progresso de exemplo" showValue />
      </DemoCard>

      <DemoCard title="Variantes" description="Concluído / falhou.">
        <ProgressBar value={100} variant="success" accessibleLabel="Envio concluído" showValue />
        <ProgressBar value={35} variant="error" accessibleLabel="Envio falhou aos 35%" showValue />
      </DemoCard>

      <DemoCard title="Variantes de severidade" description="Pra listas de prioridade, ex.: ProgressList.">
        <ProgressBar value={50} variant="neutral" accessibleLabel="No prazo" showValue />
        <ProgressBar value={25} variant="warning" accessibleLabel="Atenção" showValue />
        <ProgressBar value={25} variant="critical" accessibleLabel="Atrasado" showValue />
      </DemoCard>

      <DemoCard title="Dinâmico" description="Animado.">
        <ProgressBar value={progresso} accessibleLabel="Enviando arquivo" showValue />
      </DemoCard>

      <DemoCard title="Value fora do intervalo" description="Clampado.">
        <ProgressBar value={150} max={100} accessibleLabel="Value acima do máximo" showValue />
      </DemoCard>
    </div>
  );
}
