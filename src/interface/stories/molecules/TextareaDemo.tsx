import { useState } from "react";
import { Textarea } from "../../../components/Textarea/Textarea";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function TextareaDemo() {
  const [descricao, setDescricao] = useState("");
  const [comErro, setComErro] = useState("");
  const [fixo, setFixo] = useState("Altura fixa, sem redimensionar (resizable=false).");
  const [semBloqueio, setSemBloqueio] = useState(
    "Este texto já passou dos 60 caracteres permitidos neste exemplo específico."
  );

  return (
    <div className={styles.cards}>
      <DemoCard title="Com contador" description="Limite de 280 caracteres, que bloqueia a digitação.">
        <Textarea
          label="Descrição"
          withInfo
          infoText="Conte com suas palavras o que aconteceu."
          placeholder="Digite uma descrição..."
          value={descricao}
          onChange={setDescricao}
          maxLength={280}
          showCharacterCount
        />
      </DemoCard>

      <DemoCard title="Sem bloqueio físico" description="enforceMaxLength=false: deixa passar do limite e avisa.">
        <Textarea
          label="Sem bloqueio físico (enforceMaxLength=false)"
          value={semBloqueio}
          onChange={setSemBloqueio}
          maxLength={60}
          enforceMaxLength={false}
          showCharacterCount
          helperText={semBloqueio.length > 60 ? "Limite de 60 caracteres excedido." : undefined}
          state={semBloqueio.length > 60 ? "error" : "default"}
        />
      </DemoCard>

      <DemoCard title="Obrigatório com erro">
        <Textarea
          label="Comentário"
          required
          state={comErro ? "default" : "error"}
          helperText={comErro ? undefined : "Este campo é obrigatório."}
          value={comErro}
          onChange={setComErro}
        />
      </DemoCard>

      <DemoCard title="Altura fixa" description="resizable=false.">
        <Textarea label="Altura fixa" value={fixo} onChange={setFixo} resizable={false} rows={3} />
      </DemoCard>

      <DemoCard title="Somente leitura">
        <Textarea label="Somente leitura" state="readOnly" value="Valor fixo, não editável." />
      </DemoCard>

      <DemoCard title="Desabilitado">
        <Textarea label="Desabilitado" state="disabled" placeholder="Indisponível" />
      </DemoCard>
    </div>
  );
}
