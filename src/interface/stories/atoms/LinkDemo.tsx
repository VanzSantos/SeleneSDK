import { Link } from "../../../components/Link/Link";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function LinkDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Herda a tipografia do contexto" description="Texto-p (14px) aqui, propositalmente menor que o padrão do canvas (texto-m, 16px), pra provar que não é coincidência.">
        <p style={{ margin: 0, fontFamily: "var(--texto-p-family)", fontSize: "var(--texto-p-size)" }}>
          Leia nossos <Link href="#" label="termos de uso" /> antes de continuar.
        </p>
      </DemoCard>

      <DemoCard title="Sublinhado: só no hover" description="Padrão: sublinhado só no hover, contra sempre visível.">
        <div className={styles.row}>
          <Link href="#" label="Só no hover (passe o mouse)" />
          <Link href="#" label="Sempre sublinhado" underline />
        </div>
      </DemoCard>

      <DemoCard title="Com ícones">
        <div className={styles.row}>
          <Link href="#" label="Voltar" leftIcon="arrow-right" />
          <Link href="#" label="Saiba mais" rightIcon="arrow-right" />
        </div>
      </DemoCard>

      <DemoCard title="Link externo" description="Nova aba, com aviso pro leitor de tela.">
        <Link href="https://example.com" label="Documentação completa" external />
      </DemoCard>

      <DemoCard title="current" description={"Item ativo — aria-current=\"page\", ex.: NavBar."}>
        <div className={styles.row}>
          <Link href="#" label="Início" />
          <Link href="#" label="Pedidos (página atual)" current />
        </div>
      </DemoCard>

      <DemoCard title="Estados">
        <div className={styles.row}>
          <Link href="#" label="Padrão" />
          <Link href="#" label="Desabilitado" state="disabled" />
        </div>
      </DemoCard>
    </div>
  );
}
