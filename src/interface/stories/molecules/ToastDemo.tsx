import { ToastProvider, useToast } from "../../../components/Toast/ToastProvider";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

function ToastTriggers() {
  const { toast } = useToast();

  return (
    <div className={styles.cards}>
      <DemoCard
        title="Os 4 intents"
        code={`const { toast } = useToast();

toast({ intent: "info", message: "Sua sessão expira em 5 minutos." });
toast({ intent: "success", message: "Item salvo com sucesso." });
toast({ intent: "warning", message: "Sua senha expira em 3 dias." });
toast({ intent: "error", message: "Falha ao salvar." });`}
      >
        <div className={styles.row}>
          <button
            type="button"
            className={styles.trigger}
            onClick={() => toast({ intent: "info", message: "Sua sessão expira em 5 minutos." })}
          >
            info
          </button>
          <button
            type="button"
            className={styles.trigger}
            onClick={() => toast({ intent: "success", message: "Item salvo com sucesso." })}
          >
            success
          </button>
          <button
            type="button"
            className={styles.trigger}
            onClick={() => toast({ intent: "warning", message: "Sua senha expira em 3 dias." })}
          >
            warning
          </button>
          <button
            type="button"
            className={styles.trigger}
            onClick={() => toast({ intent: "error", message: "Falha ao salvar." })}
          >
            error
          </button>
        </div>
      </DemoCard>

      <DemoCard
        title="Com ação secundária"
        code={`toast({
  intent: "success",
  message: "Item excluído.",
  actionLabel: "Desfazer",
  onAction: () => toast({ intent: "info", message: "Exclusão desfeita." }),
});`}
      >
        <button
          type="button"
          className={styles.trigger}
          onClick={() =>
            toast({
              intent: "success",
              message: "Item excluído.",
              actionLabel: "Desfazer",
              onAction: () => toast({ intent: "info", message: "Exclusão desfeita." }),
            })
          }
        >
          Excluir item (com Desfazer)
        </button>
      </DemoCard>

      <DemoCard
        title="Fila"
        code={`for (let i = 1; i <= 5; i++) {
  toast({ intent: "info", message: \`Notificação \${i} de 5\` });
}`}
        description="Máx. 3 visíveis — dispara 5 de uma vez.">
        <button
          type="button"
          className={styles.trigger}
          onClick={() => {
            for (let i = 1; i <= 5; i++) {
              toast({ intent: "info", message: `Notificação ${i} de 5` });
            }
          }}
        >
          Disparar 5 toasts
        </button>
      </DemoCard>

      <DemoCard
        title="Sem auto-dispensa"
        code={`toast({ intent: "warning", message: "Fica até fechar manualmente.", duration: 0 });`}
        description="Duration=0.">
        <button
          type="button"
          className={styles.trigger}
          onClick={() =>
            toast({ intent: "warning", message: "Fica até fechar manualmente.", duration: 0 })
          }
        >
          Disparar persistente
        </button>
      </DemoCard>
    </div>
  );
}

export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastTriggers />
    </ToastProvider>
  );
}
