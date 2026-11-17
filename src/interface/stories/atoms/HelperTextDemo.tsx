import { HelperText } from "../../../components/HelperText/HelperText";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function HelperTextDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Padrão" description="Orientação neutra sob o campo.">
        <HelperText text="Mínimo de 8 caracteres, com letras e números." intent="default" />
      </DemoCard>
      <DemoCard title="Erro" description="Mensagem de erro, com ícone para não depender só da cor.">
        <HelperText text="E-mail inválido — verifique e tente novamente." intent="error" />
      </DemoCard>
    </div>
  );
}
