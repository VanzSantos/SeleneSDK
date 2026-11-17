import { useState } from "react";
import { Switch } from "../../../components/Switch/Switch";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function SwitchDemo() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [modoEscuro, setModoEscuro] = useState(false);

  return (
    <div className={styles.cards}>
      <DemoCard title="Estados">
        <div className={styles.column} style={{ maxWidth: 320 }}>
          <Switch label="Desligado" checked={false} />
          <Switch label="Ligado" checked={true} />
          <Switch label="Desabilitado, desligado" checked={false} state="disabled" />
          <Switch label="Desabilitado, ligado" checked={true} state="disabled" />
        </div>
      </DemoCard>

      <DemoCard title="Interativo">
        <div className={styles.column} style={{ maxWidth: 320 }}>
          <Switch
            label="Notificações por e-mail"
            checked={notificacoes}
            onChange={setNotificacoes}
            name="notificacoes"
          />
        </div>
      </DemoCard>

      <DemoCard title={"size=\"small\""} description="Contextos densos, ex.: coluna de ações de Datatable.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Switch accessibleLabel="Ativo" size="small" checked={notificacoes} onChange={setNotificacoes} />
          <Switch accessibleLabel="Ativo, desabilitado" size="small" checked={true} state="disabled" />
        </div>
      </DemoCard>

      <DemoCard title="Sem label visível" description="AccessibleLabel.">
        <div className={styles.column} style={{ maxWidth: 320 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span>Modo escuro (texto vem de fora do componente)</span>
            <Switch accessibleLabel="Modo escuro" checked={modoEscuro} onChange={setModoEscuro} />
          </div>
        </div>
      </DemoCard>
    </div>
  );
}
