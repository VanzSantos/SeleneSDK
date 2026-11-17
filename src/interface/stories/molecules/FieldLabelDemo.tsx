import { FieldLabel } from "../../../components/FieldLabel/FieldLabel";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function FieldLabelDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Simples">
        <FieldLabel text="Nome" />
      </DemoCard>
      <DemoCard title="Obrigatório">
        <FieldLabel text="Login" required />
      </DemoCard>
      <DemoCard title="Obrigatório com informação" description="O ícone abre uma dica de apoio.">
        <FieldLabel
          text="Senha"
          required
          withInfo
          infoText="Sua senha de acesso. Use o ícone de olho para exibir ou ocultar o que você digitou."
        />
      </DemoCard>
    </div>
  );
}
