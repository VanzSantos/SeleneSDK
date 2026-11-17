import { useState } from "react";
import { DatePicker } from "../../../components/DatePicker/DatePicker";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function DatePickerDemo() {
  const [data, setData] = useState<string | null>(null);
  const [dataComErro, setDataComErro] = useState<string | null>(null);
  const [intervalo, setIntervalo] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  });
  const [dataSoDigitacao, setDataSoDigitacao] = useState<string | null>(null);
  const [dataSemIcone, setDataSemIcone] = useState<string | null>(null);

  return (
    <div className={styles.cards}>
      <DemoCard title="Campo único">
        <DatePicker
          label="Data de nascimento"
          value={data}
          onChange={setData}
          maxDate="2026-08-18"
          helperText="Data selecionada só pode ser hoje ou antes."
        />
      </DemoCard>

      <DemoCard title="Estado de erro">
        <DatePicker
          label="Data de entrega"
          value={dataComErro}
          onChange={setDataComErro}
          state="error"
          helperText="Escolha uma data válida."
        />
      </DemoCard>

      <DemoCard title="Intervalo" description="Início/fim. fim nunca antes de início.">
        <DatePicker label="Período da reserva" range value={intervalo} onChange={setIntervalo} />
      </DemoCard>

      <DemoCard title="showPicker=false" description="Só digitação, sem popover.">
        <DatePicker label="Data (só digitação)" value={dataSoDigitacao} onChange={setDataSoDigitacao} showPicker={false} />
      </DemoCard>

      <DemoCard title="showIcon=false" description="Sem o ícone de calendário à esquerda.">
        <DatePicker label="Data" value={dataSemIcone} onChange={setDataSemIcone} showIcon={false} />
      </DemoCard>
    </div>
  );
}
