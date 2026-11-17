import { useState } from "react";
import { Stepper } from "../../../components/Stepper/Stepper";
import { Button } from "../../../components/Button/Button";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function StepperDemo() {
  const [passo, setPasso] = useState(1);

  const etapas = [
    { label: "Dados pessoais", description: "Nome e e-mail" },
    { label: "Endereço", description: "Entrega" },
    { label: "Pagamento", description: "Cartão ou Pix", icon: "check-circle" as const },
    { label: "Revisão" },
  ];

  return (
    <div className={styles.cards}>
      <DemoCard title={"variant=\"stacked\""} description="Padrão. conector ligando os marcadores, texto abaixo.">
        <Stepper items={etapas} currentStep={1} accessibleLabel="Etapas do cadastro" variant="stacked" />
      </DemoCard>

      <DemoCard title={"variant=\"inline\""} description="Texto ao lado do marcador, sem conector.">
        <Stepper items={etapas} currentStep={1} accessibleLabel="Etapas do cadastro (inline)" variant="inline" />
      </DemoCard>

      <DemoCard title="Interativo" description="OnStepClick — só etapas concluídas/atual são clicáveis.">
        <Stepper
          items={etapas}
          currentStep={passo}
          accessibleLabel="Etapas do cadastro interativo"
          onStepClick={setPasso}
        />
        <div className={styles.row} style={{ marginTop: 16 }}>
          <Button
            variant="secondary"
            label="Anterior"
            onPress={() => setPasso((p) => Math.max(0, p - 1))}
            state={passo === 0 ? "disabled" : "default"}
          />
          <Button
            variant="primary"
            label="Próxima etapa"
            onPress={() => setPasso((p) => Math.min(etapas.length - 1, p + 1))}
            state={passo === etapas.length - 1 ? "disabled" : "default"}
          />
        </div>
      </DemoCard>

      <DemoCard title="Última etapa" description="Todas concluídas exceto a atual.">
        <Stepper items={etapas} currentStep={etapas.length - 1} accessibleLabel="Etapas quase completas" />
      </DemoCard>
    </div>
  );
}
