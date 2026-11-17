import { useState } from "react";
import { EmptyState } from "../../../components/EmptyState/EmptyState";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function EmptyStateDemo() {
  const [temFiltro, setTemFiltro] = useState(true);

  return (
    <div className={styles.cards}>
      <DemoCard title="Só título">
        <EmptyState title="Nenhum item ainda" />
      </DemoCard>

      <DemoCard title="Com ícone e descrição">
        <EmptyState
          icon="info"
          title="Nenhum resultado encontrado"
          description="Tente ajustar os termos da busca ou remover alguns filtros."
        />
      </DemoCard>

      <DemoCard title="Com ação" description="Interativo.">
        {temFiltro ? (
          <EmptyState
            icon="info"
            title="Nenhum resultado com esses filtros"
            description="Remova os filtros pra ver todos os itens."
            actionLabel="Limpar filtros"
            onAction={() => setTemFiltro(false)}
          />
        ) : (
          <p style={{ margin: 0 }}>3 itens encontrados (filtros limpos).</p>
        )}
      </DemoCard>
    </div>
  );
}
