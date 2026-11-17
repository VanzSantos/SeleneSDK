import { Badge } from "../../../components/Badge/Badge";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function BadgeDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Status" description="Fundo sólido.">
        <div className={styles.row}>
          <Badge variant="info" label="Em análise" />
          <Badge variant="success" label="Ativo" />
          <Badge variant="warning" label="Pendente" />
          <Badge variant="error" label="Bloqueado" />
        </div>
      </DemoCard>

      <DemoCard title="Com ícone" description="Só combina com label.">
        <div className={styles.row}>
          <Badge variant="success" label="Autorizado" icon="check-circle" />
          <Badge variant="warning" label="Atenção" icon="warning-circle" />
          <Badge variant="error" label="Recusado" icon="x-circle" />
          <Badge variant="critical" label="Atrasado" icon="warning-circle" />
        </div>
      </DemoCard>

      <DemoCard title="Accent, sem status" description="Accent1=kiwi, accent2=roxo, accent3=laranja.">
        <div className={styles.row}>
          <Badge variant="accent1" label="Beta" />
          <Badge variant="accent2" label="Interno" />
          <Badge variant="accent3" label="Novo" />
        </div>
      </DemoCard>

      <DemoCard title="Sem cor" description="Neutral / white / dark — contexto de superfície.">
        <div className={styles.row}>
          <Badge variant="neutral" label="Rascunho" />
          <div style={{ padding: 4, background: "var(--fundo-secundario)", borderRadius: 8 }}>
            <Badge variant="white" label="Arquivado" />
          </div>
          <Badge variant="dark" label="v2.1.0" />
        </div>
      </DemoCard>

      <DemoCard title="Contador" description="count + truncamento em max.">
        <div className={styles.row}>
          <Badge variant="error" count={3} />
          <Badge variant="error" count={42} />
          <Badge variant="error" count={140} max={99} />
        </div>
      </DemoCard>

      <DemoCard title="Modo anexado" description="Position, os 4 cantos do pai.">
        <div className={styles.row}>
          {(["top-right", "top-left", "bottom-right", "bottom-left"] as const).map((position) => (
            <div
              key={position}
              style={{
                position: "relative",
                width: 48,
                height: 48,
                borderRadius: "9999px",
                background: "var(--acao-inativa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>AV</span>
              <Badge variant="error" count={5} position={position} />
            </div>
          ))}
        </div>
      </DemoCard>

      <DemoCard title="Invertido" description="Inverted — fundo claro + texto colorido, modelo antigo.">
        <div className={styles.row}>
          <Badge variant="info" label="Em análise" inverted />
          <Badge variant="success" label="Ativo" inverted />
          <Badge variant="warning" label="Pendente" inverted />
          <Badge variant="error" label="Bloqueado" inverted />
          <Badge variant="critical" label="Atrasado" inverted />
        </div>
      </DemoCard>
    </div>
  );
}
