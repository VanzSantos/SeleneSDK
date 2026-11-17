import { useState } from "react";
import { Tabs } from "../../../components/Tabs/Tabs";
import { TabPanel } from "../../../components/Tabs/TabPanel";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function TabsDemo() {
  const [aba, setAba] = useState("detalhes");
  const [abaComContador, setAbaComContador] = useState("abertos");

  return (
    <div className={styles.cards}>
      <DemoCard title="Básico" description="Com aba desabilitada.">
        <div style={{ width: "100%" }}>
          <Tabs
            accessibleLabel="Detalhes do registro"
            items={[
              { value: "detalhes", label: "Detalhes" },
              { value: "historico", label: "Histórico" },
              { value: "config", label: "Configurações", disabled: true },
            ]}
            value={aba}
            onChange={setAba}
          />
          <TabPanel value="detalhes" hidden={aba !== "detalhes"}>
            <p style={{ margin: 0 }}>Conteúdo de Detalhes.</p>
          </TabPanel>
          <TabPanel value="historico" hidden={aba !== "historico"}>
            <p style={{ margin: 0 }}>Conteúdo de Histórico.</p>
          </TabPanel>
          <TabPanel value="config" hidden={aba !== "config"}>
            <p style={{ margin: 0 }}>Conteúdo de Configurações (aba desabilitada, nunca aparece).</p>
          </TabPanel>
        </div>
      </DemoCard>

      <DemoCard title="Com contador" description="count. quantidade de registros por aba.">
        <div style={{ width: "100%" }}>
          <Tabs
            accessibleLabel="Registros por situação"
            items={[
              { value: "abertos", label: "Abertos", count: 12 },
              { value: "resolvidos", label: "Resolvidos", count: 84 },
              { value: "arquivados", label: "Arquivados", count: 0 },
            ]}
            value={abaComContador}
            onChange={setAbaComContador}
          />
          <TabPanel value="abertos" hidden={abaComContador !== "abertos"}>
            <p style={{ margin: 0 }}>12 chamados abertos.</p>
          </TabPanel>
          <TabPanel value="resolvidos" hidden={abaComContador !== "resolvidos"}>
            <p style={{ margin: 0 }}>84 chamados resolvidos.</p>
          </TabPanel>
          <TabPanel value="arquivados" hidden={abaComContador !== "arquivados"}>
            <p style={{ margin: 0 }}>Nenhum chamado arquivado.</p>
          </TabPanel>
        </div>
      </DemoCard>
    </div>
  );
}
