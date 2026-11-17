import { Icon } from "../../../components/Icon/Icon";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function IconDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Decorativo" description="Padrão: aria-hidden, o significado vem do texto ao lado.">
        <Icon name="info" size="medium" color="var(--icone-secundario)" />
      </DemoCard>
      <DemoCard title="Tamanho" description="size small, medium ou large.">
        <div className={styles.row}>
          <Icon name="arrow-right" size="small" color="var(--acao-primaria)" />
          <Icon name="arrow-right" size="medium" color="var(--acao-primaria)" />
          <Icon name="arrow-right" size="large" color="var(--acao-primaria)" />
        </div>
      </DemoCard>
      <DemoCard title="Com significado" description="decorative=false exige accessibleLabel, que o leitor de tela anuncia.">
        <Icon
          name="eye"
          size="medium"
          color="var(--icone-secundario)"
          decorative={false}
          accessibleLabel="Mostrar senha"
        />
      </DemoCard>
    </div>
  );
}
