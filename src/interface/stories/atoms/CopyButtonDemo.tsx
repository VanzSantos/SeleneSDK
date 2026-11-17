import { CopyButton } from "../../../components/CopyButton/CopyButton";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function CopyButtonDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Ao lado de uma API key">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <code
            style={{
              padding: "6px 10px",
              background: "var(--fundo-secundario)",
              borderRadius: 8,
              fontSize: 13,
            }}
          >
            sk_live_51H8x...aB3f
          </code>
          <CopyButton value="sk_live_51H8x9F2aB3f" accessibleLabel="Copiar chave de API" />
        </div>
      </DemoCard>

      <DemoCard title="Desabilitado">
        <CopyButton value="não copiável" state="disabled" />
      </DemoCard>
    </div>
  );
}
