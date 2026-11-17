import { useState } from "react";
import { FilterBar } from "../../../components/FilterBar/FilterBar";
import { Select } from "../../../components/Select/Select";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function FilterBarDemo() {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("");
  const [categoria, setCategoria] = useState("");

  const activeFilters = [
    ...(status ? [{ key: "status", label: `Status: ${status === "ativo" ? "Ativo" : "Inativo"}` }] : []),
    ...(categoria ? [{ key: "categoria", label: `Categoria: ${categoria}` }] : []),
  ];

  function removeFilter(key: string) {
    if (key === "status") setStatus("");
    if (key === "categoria") setCategoria("");
  }

  return (
    <div className={styles.cards}>
      <DemoCard title="Com busca + filtros livres + resumo removível">
        <FilterBar
          searchValue={busca}
          onSearchChange={setBusca}
          searchPlaceholder="Buscar produtos..."
          activeFilters={activeFilters}
          onRemoveFilter={removeFilter}
          onClearAll={activeFilters.length > 0 ? () => { setStatus(""); setCategoria(""); } : undefined}
          filters={
            <>
              <div style={{ width: 160 }}>
                <Select
                  placeholder="Status"
                  options={[
                    { value: "ativo", label: "Ativo" },
                    { value: "inativo", label: "Inativo" },
                  ]}
                  value={status}
                  onChange={setStatus}
                />
              </div>
              <div style={{ width: 160 }}>
                <Select
                  placeholder="Categoria"
                  options={[
                    { value: "Periféricos", label: "Periféricos" },
                    { value: "Eletrônicos", label: "Eletrônicos" },
                  ]}
                  value={categoria}
                  onChange={setCategoria}
                />
              </div>
            </>
          }
        />
      </DemoCard>

      <DemoCard title="Só busca, sem filtros nem resumo">
        <FilterBar searchValue="" onSearchChange={() => {}} searchPlaceholder="Buscar..." />
      </DemoCard>
    </div>
  );
}
