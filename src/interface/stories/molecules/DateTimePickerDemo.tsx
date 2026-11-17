import { useState } from "react";
import { DateTimePicker } from "../../../components/DateTimePicker/DateTimePicker";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function DateTimePickerDemo() {
  const [inicioEvento, setInicioEvento] = useState<string | null>(null);
  const [intervalo, setIntervalo] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [soDigitacao, setSoDigitacao] = useState<string | null>(null);
  const [semIcone, setSemIcone] = useState<string | null>(null);

  return (
    <div className={styles.cards}>
      <DemoCard title="Campo único" description="Calendar + Hora/Minuto no mesmo popover.">
        <DateTimePicker label="Início do evento" value={inicioEvento} onChange={setInicioEvento} />
      </DemoCard>

      <DemoCard title="Intervalo" description="Início/fim. fim nunca antes de início.">
        <DateTimePicker label="Janela de manutenção" range value={intervalo} onChange={setIntervalo} />
      </DemoCard>

      <DemoCard title="showPicker=false" description="Só digitação, sem popover.">
        <DateTimePicker label="Data e hora (só digitação)" value={soDigitacao} onChange={setSoDigitacao} showPicker={false} />
      </DemoCard>

      <DemoCard title="showIcon=false" description="Sem o ícone de calendário à esquerda.">
        <DateTimePicker label="Data e hora" value={semIcone} onChange={setSemIcone} showIcon={false} />
      </DemoCard>
    </div>
  );
}
