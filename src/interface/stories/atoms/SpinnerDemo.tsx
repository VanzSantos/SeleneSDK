import { Spinner, type SpinnerSize } from "../../../components/Spinner/Spinner";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

const SIZES: SpinnerSize[] = ["small", "medium", "large", "extraLarge"];

export function SpinnerDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Tamanhos">
        <div className={styles.row}>
          {SIZES.map((size) => (
            <div key={size} className={styles.item}>
              <Spinner size={size} color="var(--acao-primaria)" />
              <span className={styles.itemLabel}>{size}</span>
            </div>
          ))}
        </div>
      </DemoCard>

      <DemoCard title="Cor sempre explícita" description="Nunca herdada.">
        <div className={styles.row}>
          <div className={styles.item}>
            <Spinner color="var(--acao-primaria)" />
            <span className={styles.itemLabel}>acao-primaria</span>
          </div>
          <div className={styles.item}>
            <Spinner color="var(--acao-destrutiva)" />
            <span className={styles.itemLabel}>acao-destrutiva</span>
          </div>
          <div className={styles.item}>
            <Spinner color="var(--icone-secundario)" />
            <span className={styles.itemLabel}>icone-secundario</span>
          </div>
        </div>
      </DemoCard>

      <DemoCard title="Standalone com anúncio pra leitor de tela">
        <div className={styles.row}>
          <div className={styles.item}>
            <Spinner color="var(--acao-primaria)" decorative={false} accessibleLabel="Carregando" />
            <span className={styles.itemLabel}>decorative=false</span>
          </div>
        </div>
      </DemoCard>
    </div>
  );
}
