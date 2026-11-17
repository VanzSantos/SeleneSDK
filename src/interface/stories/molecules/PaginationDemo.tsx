import { useState } from "react";
import { Pagination } from "../../../components/Pagination/Pagination";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 237;

  const [pageSemSeletor, setPageSemSeletor] = useState(3);

  return (
    <div className={styles.cards}>
      <DemoCard title="Com seletor de itens por página" description="OnPageSizeChange fornecida.">
        <Pagination
          page={page}
          onPageChange={setPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </DemoCard>

      <DemoCard title="Sem seletor" description="OnPageSizeChange ausente — pageSize fixo.">
        <Pagination page={pageSemSeletor} onPageChange={setPageSemSeletor} totalItems={48} pageSize={12} />
      </DemoCard>

      <DemoCard title="Vazio" description="0 registros.">
        <Pagination page={1} onPageChange={() => {}} totalItems={0} pageSize={10} />
      </DemoCard>
    </div>
  );
}
