import { DataField } from "../../../components/DataField/DataField";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function DataFieldDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Sem ícone">
        <div className={styles.row}>
          <DataField label="Nome completo" value="Amélia Aparecida dos Santos" />
          <DataField label="CPF" value="000.000.000-00" />
        </div>
      </DemoCard>

      <DemoCard title="Com ícone prefixando o valor">
        <div className={styles.row}>
          <DataField label="Contato celular" value="(27) 9 0000-0000" icon="user" />
          <DataField label="E-mail" value="meu.email@gmail.com" icon="info" />
        </div>
      </DemoCard>

      <DemoCard title="Grade de detalhe" description="Composição típica.">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxWidth: 480 }}>
          <DataField label="Matrícula" value="000000" />
          <DataField label="Situação do plano" value="Ativo" />
          <DataField label="Idade" value="72 anos" />
          <DataField label="Nascimento" value="00/00/0000" />
        </div>
      </DemoCard>

      <DemoCard title="Valor ausente" description="Decisão de quem consome, ex.: travessão.">
        <DataField label="Complemento" value="—" />
      </DemoCard>
    </div>
  );
}
