import { useState } from "react";
import { Alert } from "../../../components/Alert/Alert";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function AlertDemo() {
  const [dismissivelVisivel, setDismissivelVisivel] = useState(true);

  return (
    <div className={styles.cards}>
      <DemoCard title="Os 5 intents" description="Contorno suavizado via color-mix.">
        <div className={styles.column} style={{ maxWidth: 420 }}>
          <Alert intent="info" description="Sua sessão expira em 5 minutos." />
          <Alert intent="success" description="Cadastro salvo com sucesso." />
          <Alert intent="warning" description="Sua senha expira em 3 dias." />
          <Alert intent="error" description="Usuário ou senha inválidos." />
          <Alert intent="neutral" description="Este recurso está em fase beta." />
        </div>
      </DemoCard>

      <DemoCard title="Com título">
        <Alert
          intent="error"
          title="Não foi possível entrar"
          description="Verifique seu usuário e senha e tente novamente."
        />
      </DemoCard>

      <DemoCard title="Dismissible" description="Controlado.">
        {dismissivelVisivel ? (
          <Alert
            intent="info"
            description="Você pode fechar este aviso."
            dismissible
            onDismiss={() => setDismissivelVisivel(false)}
          />
        ) : (
          <span className={styles.itemLabel}>Fechado — Alert não gerencia a própria visibilidade.</span>
        )}
      </DemoCard>
    </div>
  );
}
