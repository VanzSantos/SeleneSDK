import { useState } from "react";
import { TimePicker } from "../../../components/TimePicker/TimePicker";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function TimePickerDemo() {
  const [horario, setHorario] = useState<string | null>(null);
  const [horarioComercial, setHorarioComercial] = useState<string | null>(null);
  const [intervalo, setIntervalo] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [horarioSoDigitacao, setHorarioSoDigitacao] = useState<string | null>(null);
  const [horarioSemIcone, setHorarioSemIcone] = useState<string | null>(null);

  return (
    <div className={styles.cards}>
      <DemoCard title="Campo único" description="Step=5.">
        <TimePicker label="Horário do compromisso" value={horario} onChange={setHorario} />
      </DemoCard>

      <DemoCard title="Com minTime/maxTime" description="Horário comercial, step=30.">
        <TimePicker
          label="Horário de atendimento"
          value={horarioComercial}
          onChange={setHorarioComercial}
          minTime="08:00"
          maxTime="18:00"
          step={30}
        />
      </DemoCard>

      <DemoCard title="Intervalo" description="Início/fim. fim nunca antes de início.">
        <TimePicker label="Janela de entrega" range value={intervalo} onChange={setIntervalo} />
      </DemoCard>

      <DemoCard title="showPicker=false" description="Só digitação, sem popover.">
        <TimePicker label="Horário (só digitação)" value={horarioSoDigitacao} onChange={setHorarioSoDigitacao} showPicker={false} />
      </DemoCard>

      <DemoCard title="showIcon=false" description="Sem o ícone de relógio à esquerda.">
        <TimePicker label="Horário" value={horarioSemIcone} onChange={setHorarioSemIcone} showIcon={false} />
      </DemoCard>
    </div>
  );
}
