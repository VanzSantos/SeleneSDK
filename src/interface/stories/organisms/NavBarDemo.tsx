import { useState } from "react";
import { NavBar } from "../../../components/NavBar/NavBar";
import { Avatar } from "../../../components/Avatar/Avatar";
import { Icon } from "../../../components/Icon/Icon";
import { Badge } from "../../../components/Badge/Badge";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function NavBarDemo() {
  const [rota, setRota] = useState("/pedidos");

  const items = [
    { label: "Início", href: "/" },
    { label: "Pedidos", href: "/pedidos" },
    { label: "Relatórios", href: "/relatorios" },
    { label: "Configurações", href: "/config" },
  ].map((item) => ({ ...item, active: item.href === rota }));

  return (
    <div className={styles.cards}>
      <DemoCard title="Completa" description="Brand, navegação primária (item ativo controlado de fora) e ações.">
        <div className={styles.row} style={{ marginBottom: 8 }}>
          {items.map((item) => (
            <button
              key={item.href}
              type="button"
              className={styles.trigger}
              onClick={() => setRota(item.href)}
            >
              Simular rota: {item.label}
            </button>
          ))}
        </div>
        <NavBar
          brand={<strong style={{ fontSize: 18 }}>SeleneSDK</strong>}
          items={items}
          actions={
            <>
              <Icon name="magnifying-glass" size="medium" color="var(--icone-secundario)" />
              <Badge variant="error" count={3} />
              <Avatar name="Ana Souza" size="small" />
            </>
          }
        />
      </DemoCard>

      <DemoCard title="Só brand + ações" description="Items vazio — topbar mínima.">
        <NavBar brand={<strong>Produto</strong>} items={[]} actions={<Avatar name="Bruno Lima" size="small" />} />
      </DemoCard>

      <DemoCard title="Multi-nível" description="Até 4. item com filhos vira dropdown em cascata; redimensione a janela abaixo de 768px pra ver o colapso no Drawer (mesma árvore, formato expansível).">
        <NavBar
          brand={<strong style={{ fontSize: 18 }}>SeleneSDK</strong>}
          items={[
            { label: "Início", href: "/", active: true },
            {
              label: "Documentos",
              children: [
                { label: "Contratos", href: "/documentos/contratos" },
                {
                  label: "Relatórios",
                  children: [
                    { label: "Financeiro", href: "/documentos/relatorios/financeiro" },
                    {
                      label: "Jurídico",
                      children: [
                        { label: "Recibos", href: "/documentos/relatorios/juridico/recibos" },
                        { label: "Notas fiscais", href: "/documentos/relatorios/juridico/notas-fiscais" },
                      ],
                    },
                  ],
                },
              ],
            },
            { label: "Sobre", href: "/sobre" },
          ]}
        />
      </DemoCard>

      <DemoCard title="sticky" description="Role pra ver, precisa de conteúdo rolável abaixo.">
        <div style={{ height: 160, overflow: "auto", border: "1px solid var(--borda-base)", borderRadius: "var(--raio-pp)" }}>
          <NavBar sticky brand={<strong>Sticky</strong>} items={items.slice(0, 2)} />
          <div style={{ padding: 16 }}>
            <p>Role este bloco pra ver a NavBar grudar no topo.</p>
            <p style={{ height: 300 }}>Conteúdo alto só pra forçar o scroll interno.</p>
          </div>
        </div>
      </DemoCard>
    </div>
  );
}
