import type { ReactNode } from "react";
import { Card } from "../../components/Card/Card";
import styles from "./SectionCard.module.css";

interface SectionCardProps {
  /** âncora da seção (menu "Nesta página") */
  id: string;
  title: string;
  /** controles alinhados à direita do título (ex.: copiar, alternar visualização) */
  actions?: ReactNode;
  /** nível do título (h2 por padrão; h3 para cartões dentro de outra seção) */
  headingLevel?: 2 | 3;
  children: ReactNode;
}

/** Seção da tela de componente: Card do SDK com título e ações. O <section> existe só
    pra carregar o id/âncora (Card não aceita id) e nomear a região pelo título. */
export function SectionCard({ id, title, actions, headingLevel = 2, children }: SectionCardProps) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-titulo`}>
      <Card padding="medium">
        <div className={styles.header}>
          <Heading id={`${id}-titulo`} className={styles.title}>
            {title}
          </Heading>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        <div className={styles.body}>{children}</div>
      </Card>
    </section>
  );
}
