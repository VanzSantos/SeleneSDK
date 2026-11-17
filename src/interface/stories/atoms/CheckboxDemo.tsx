import { useState } from "react";
import { Checkbox } from "../../../components/Checkbox/Checkbox";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function CheckboxDemo() {
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [lembrarMe, setLembrarMe] = useState(true);
  const [selecionarTudo, setSelecionarTudo] = useState(false);

  return (
    <div className={styles.cards}>
      <DemoCard title="Estados">
        <div className={styles.column} style={{ maxWidth: 320 }}>
          <Checkbox label="Desmarcado" checked={false} />
          <Checkbox label="Marcado" checked={true} />
          <Checkbox label="Indeterminado (ex.: 'selecionar tudo')" checked={false} indeterminate />
          <Checkbox label="Desabilitado, desmarcado" checked={false} state="disabled" />
          <Checkbox label="Desabilitado, marcado" checked={true} state="disabled" />
        </div>
      </DemoCard>

      <DemoCard title="Interativo">
        <div className={styles.column} style={{ maxWidth: 320 }}>
          <Checkbox
            label="Lembrar-me"
            checked={lembrarMe}
            onChange={setLembrarMe}
            name="lembrar-me"
          />
          <Checkbox
            label="Selecionar tudo"
            checked={selecionarTudo}
            indeterminate={false}
            onChange={setSelecionarTudo}
          />
        </div>
      </DemoCard>

      <DemoCard title="hideLabel" description="Rótulo continua no DOM, só fica visualmente oculto — usado na coluna de seleção da Datatable.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Checkbox label="Selecionar linha 1002" hideLabel checked={selecionarTudo} onChange={setSelecionarTudo} />
          <span className={styles.itemLabel}>↑ só a caixa aparece, mas o leitor de tela lê "Selecionar linha 1002"</span>
        </div>
      </DemoCard>

      <DemoCard title="Obrigatório + erro">
        <div className={styles.column} style={{ maxWidth: 320 }}>
          <Checkbox
            label="Aceito os termos de uso"
            required
            checked={aceitoTermos}
            onChange={setAceitoTermos}
            state={aceitoTermos ? "default" : "error"}
            helperText={aceitoTermos ? undefined : "Você precisa aceitar os termos pra continuar."}
          />
        </div>
      </DemoCard>
    </div>
  );
}
