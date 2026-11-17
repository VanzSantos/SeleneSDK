import { Avatar } from "../../../components/Avatar/Avatar";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function AvatarDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Com imagem" description="Carregada com sucesso.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Avatar src="https://i.pravatar.cc/150?img=12" name="Rafael Prado" size="small" />
          <Avatar src="https://i.pravatar.cc/150?img=12" name="Rafael Prado" size="medium" />
          <Avatar src="https://i.pravatar.cc/150?img=12" name="Rafael Prado" size="large" />
          <Avatar src="https://i.pravatar.cc/150?img=12" name="Rafael Prado" size="xlarge" status="online" />
        </div>
      </DemoCard>

      <DemoCard title="Tamanhos" description="Iniciais, circle.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Avatar name="Ana Souza" size="small" />
          <Avatar name="Ana Souza" size="medium" />
          <Avatar name="Ana Souza" size="large" />
          <Avatar name="Ana Souza" size="xlarge" />
        </div>
      </DemoCard>

      <DemoCard title="Formato" description="Circle / square.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Avatar name="Bruno Lima" size="large" shape="circle" />
          <Avatar name="Bruno Lima" size="large" shape="square" />
        </div>
      </DemoCard>

      <DemoCard title="Iniciais" description="1 e 2 palavras.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Avatar name="Madonna" size="large" />
          <Avatar name="Ana Paula Souza" size="large" />
        </div>
      </DemoCard>

      <DemoCard title="Fallback de imagem quebrada → iniciais">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Avatar src="https://exemplo-invalido.test/foto.jpg" name="Carla Nunes" size="large" />
        </div>
      </DemoCard>

      <DemoCard title="Sem nome" description="Ícone genérico, accessibleLabel.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Avatar accessibleLabel="Usuário anônimo" size="large" />
        </div>
      </DemoCard>

      <DemoCard title="Indicador de presença">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <Avatar name="Diego Reis" size="large" status="online" />
          <Avatar name="Diego Reis" size="large" status="away" />
          <Avatar name="Diego Reis" size="large" status="offline" />
        </div>
      </DemoCard>
    </div>
  );
}
