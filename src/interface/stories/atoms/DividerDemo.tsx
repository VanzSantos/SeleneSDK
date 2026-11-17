import { Divider } from "../../../components/Divider/Divider";
import { Button } from "../../../components/Button/Button";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function DividerDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Horizontal, sem label">
        <div style={{ width: "100%", padding: "8px 0" }}>
          <p style={{ margin: 0 }}>Seção 1</p>
          <Divider />
          <p style={{ margin: 0 }}>Seção 2</p>
        </div>
      </DemoCard>

      <DemoCard title="Horizontal, com label">
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, padding: "8px 0" }}>
          <Button variant="neutral" fullWidth label="Entrar com Google" />
          <Divider label="ou" />
          <Button variant="neutral" fullWidth label="Entrar com e-mail" />
        </div>
      </DemoCard>

      <DemoCard title="Vertical">
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, height: 32 }}>
          <span>Editar</span>
          <Divider orientation="vertical" />
          <span>Duplicar</span>
          <Divider orientation="vertical" />
          <span>Excluir</span>
        </div>
      </DemoCard>
    </div>
  );
}
