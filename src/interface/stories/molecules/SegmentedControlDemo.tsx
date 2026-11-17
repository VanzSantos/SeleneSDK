import { useState } from "react";
import { SegmentedControl } from "../../../components/SegmentedControl/SegmentedControl";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function SegmentedControlDemo() {
  const [visualizacao, setVisualizacao] = useState("lista");
  const [periodo, setPeriodo] = useState("semana");
  const [status, setStatus] = useState("ativos");

  return (
    <div className={styles.cards}>
      <DemoCard title="Com ícones">
        <SegmentedControl
          items={[
            { value: "lista", label: "Lista", icon: "list" },
            { value: "grade", label: "Grade", icon: "columns" },
          ]}
          value={visualizacao}
          onChange={setVisualizacao}
          accessibleLabel="Modo de visualização"
        />
      </DemoCard>

      <DemoCard title="3 opções, sem ícone">
        <SegmentedControl
          items={[
            { value: "dia", label: "Dia" },
            { value: "semana", label: "Semana" },
            { value: "mes", label: "Mês" },
          ]}
          value={periodo}
          onChange={setPeriodo}
          accessibleLabel="Período"
        />
      </DemoCard>

      <DemoCard title="Com opção desabilitada">
        <SegmentedControl
          items={[
            { value: "todos", label: "Todos" },
            { value: "ativos", label: "Ativos" },
            { value: "arquivados", label: "Arquivados", disabled: true },
          ]}
          value={status}
          onChange={setStatus}
          accessibleLabel="Filtro de status"
        />
      </DemoCard>

      <DemoCard title="Grupo inteiro desabilitado">
        <SegmentedControl
          items={[
            { value: "a", label: "A" },
            { value: "b", label: "B" },
          ]}
          value="a"
          onChange={() => {}}
          state="disabled"
          accessibleLabel="Bloqueado"
        />
      </DemoCard>
    </div>
  );
}
