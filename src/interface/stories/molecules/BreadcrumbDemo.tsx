import { Breadcrumb } from "../../../components/Breadcrumb/Breadcrumb";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function BreadcrumbDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="3 níveis">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Configurações", href: "/config" },
            { label: "Perfil" },
          ]}
        />
      </DemoCard>

      <DemoCard title="2 níveis" description="Mínimo.">
        <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Sobre" }]} />
      </DemoCard>

      <DemoCard title="Último item com href" description="Ignorado.">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Produtos", href: "/produtos" },
            { label: "Fone X", href: "/produtos/fone-x" },
          ]}
        />
      </DemoCard>

      <DemoCard title="Com ícone no primeiro item" description="FirstItemIcon.">
        <Breadcrumb
          firstItemIcon="house"
          items={[
            { label: "Início", href: "/" },
            { label: "Configurações", href: "/config" },
            { label: "Perfil" },
          ]}
        />
      </DemoCard>

      <DemoCard title="Colapsado" description="6 níveis, mais que o collapseThreshold padrão de 3. clique nas reticências.">
        <Breadcrumb
          firstItemIcon="house"
          items={[
            { label: "Início", href: "/" },
            { label: "Loja", href: "/loja" },
            { label: "Eletrônicos", href: "/loja/eletronicos" },
            { label: "Fones", href: "/loja/eletronicos/fones" },
            { label: "SeleneSDK", href: "/loja/eletronicos/fones/selenesdk" },
            { label: "Fone Olhosvaldo" },
          ]}
        />
      </DemoCard>
    </div>
  );
}
