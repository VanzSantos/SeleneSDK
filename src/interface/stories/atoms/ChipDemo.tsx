import { useState } from "react";
import { Chip } from "../../../components/Chip/Chip";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function ChipDemo() {
  const [filtros, setFiltros] = useState<Record<string, boolean>>({
    ativos: true,
    pendentes: false,
    arquivados: false,
  });
  const [tags, setTags] = useState(["React", "TypeScript", "Vite"]);

  return (
    <div className={styles.cards}>
      <DemoCard title="Selecionável" description="Filtro.">
        <div className={styles.row}>
          <Chip
            label="Ativos"
            selected={filtros.ativos}
            onToggle={(v) => setFiltros((f) => ({ ...f, ativos: v }))}
          />
          <Chip
            label="Pendentes"
            selected={filtros.pendentes}
            onToggle={(v) => setFiltros((f) => ({ ...f, pendentes: v }))}
          />
          <Chip
            label="Arquivados"
            selected={filtros.arquivados}
            onToggle={(v) => setFiltros((f) => ({ ...f, arquivados: v }))}
          />
        </div>
      </DemoCard>

      <DemoCard title="Removível" description="Tag.">
        <div className={styles.row}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              removable
              onRemove={() => setTags((t) => t.filter((x) => x !== tag))}
            />
          ))}
          {tags.length === 0 && <span className={styles.itemLabel}>Nenhuma tag restante.</span>}
        </div>
      </DemoCard>

      <DemoCard title="Variantes de cor" description="Estático.">
        <div className={styles.row}>
          <Chip label="Neutral" variant="neutral" />
          <Chip label="Info" variant="info" />
          <Chip label="Sucesso" variant="success" />
          <Chip label="Aviso" variant="warning" />
          <Chip label="Erro" variant="error" />
        </div>
      </DemoCard>

      <DemoCard title="Selecionável + removível ao mesmo tempo">
        <div className={styles.row}>
          <Chip
            label="Combinado"
            selected={filtros.ativos}
            onToggle={(v) => setFiltros((f) => ({ ...f, ativos: v }))}
            removable
            onRemove={() => alert("Removido")}
          />
        </div>
      </DemoCard>

      <DemoCard title="Desabilitado">
        <div className={styles.row}>
          <Chip label="Desabilitado" disabled removable onRemove={() => {}} />
        </div>
      </DemoCard>
    </div>
  );
}
