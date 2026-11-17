import { useState } from "react";
import { RadioGroup } from "../../../components/RadioGroup/RadioGroup";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function RadioGroupDemo() {
  const [plano, setPlano] = useState("mensal");
  const [entrega, setEntrega] = useState("");
  const [genero, setGenero] = useState("");

  return (
    <div className={styles.cards}>
      <DemoCard title="Básico">
        <RadioGroup
          label="Plano"
          options={[
            { value: "mensal", label: "Mensal" },
            { value: "anual", label: "Anual" },
          ]}
          value={plano}
          onChange={setPlano}
        />
      </DemoCard>

      <DemoCard title="Obrigatório + erro + opção desabilitada">
        <RadioGroup
          label="Forma de entrega"
          required
          options={[
            { value: "padrao", label: "Padrão (5-7 dias)" },
            { value: "expressa", label: "Expressa (1-2 dias)" },
            { value: "retirada", label: "Retirada em loja", disabled: true },
          ]}
          value={entrega}
          onChange={setEntrega}
          state={entrega ? "default" : "error"}
          helperText={entrega ? undefined : "Selecione uma forma de entrega."}
        />
      </DemoCard>

      <DemoCard title="Horizontal">
        <RadioGroup
          label="Gênero"
          orientation="horizontal"
          options={[
            { value: "feminino", label: "Feminino" },
            { value: "masculino", label: "Masculino" },
            { value: "outro", label: "Outro" },
            { value: "prefiro-nao-dizer", label: "Prefiro não dizer" },
          ]}
          value={genero}
          onChange={setGenero}
        />
      </DemoCard>
    </div>
  );
}
