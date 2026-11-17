import { useState } from "react";
import { Calendar } from "../../../components/Calendar/Calendar";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

function todayISO(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function CalendarDemo() {
  const [data, setData] = useState<string | null>(todayISO());
  const [dataComLimites, setDataComLimites] = useState<string | null>(null);

  const hoje = todayISO();
  const [ano, mes] = hoje.split("-").map(Number);
  const minDate = `${ano}-${String(mes).padStart(2, "0")}-01`;
  const maxDate = new Date(ano, mes, 0).getDate();
  const maxDateISO = `${ano}-${String(mes).padStart(2, "0")}-${String(maxDate).padStart(2, "0")}`;

  return (
    <div className={styles.cards}>
      <DemoCard title="Livre" description="Clique no rótulo do mês pra pular direto.">
        <Calendar value={data} onChange={setData} accessibleLabel="Data do evento" />
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--texto-secundario)" }}>
          Selecionado: {data ?? "nenhuma"}
        </p>
      </DemoCard>

      <DemoCard title="Com minDate/maxDate" description="Só o mês atual (minDate/maxDate) e um dia específico bloqueado.">
        <Calendar
          value={dataComLimites}
          onChange={setDataComLimites}
          minDate={minDate}
          maxDate={maxDateISO}
          disabledDate={(iso) => iso.endsWith("-15")}
          accessibleLabel="Data com restrições"
        />
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--texto-secundario)" }}>
          Selecionado: {dataComLimites ?? "nenhuma"}
        </p>
      </DemoCard>
    </div>
  );
}
