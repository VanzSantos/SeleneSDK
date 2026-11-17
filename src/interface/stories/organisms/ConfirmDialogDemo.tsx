import { useState } from "react";
import { ConfirmDialog } from "../../../components/ConfirmDialog/ConfirmDialog";
import { Button } from "../../../components/Button/Button";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function ConfirmDialogDemo() {
  const [openDestrutivo, setOpenDestrutivo] = useState(false);
  const [openPrimario, setOpenPrimario] = useState(false);
  const [openRotulosLongos, setOpenRotulosLongos] = useState(false);
  const [confirming, setConfirming] = useState(false);

  function handleConfirmDestrutivo() {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setOpenDestrutivo(false);
    }, 1500);
  }

  return (
    <div className={styles.cards}>
      <DemoCard
        title="Confirmação destrutiva"
        description="Com o botão de confirmar em loading enquanto a ação roda."
        code={`<ConfirmDialog
  open={open}
  onCancel={handleCancel}
  onConfirm={handleConfirm}
  title="Excluir conta?"
  description="Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente."
  confirmLabel="Excluir"
  confirmVariant="destructive"
  confirmState={confirming ? "loading" : "default"}
/>`}
      >
        <Button variant="destructive" label="Excluir conta" onPress={() => setOpenDestrutivo(true)} />
      </DemoCard>
      <DemoCard
        title="Confirmação padrão"
        description="Rótulos e variante padrão."
        code={`<ConfirmDialog
  open={open}
  onCancel={handleCancel}
  onConfirm={handleConfirm}
  title="Salvar alterações?"
  description="As alterações feitas neste formulário serão salvas."
/>`}
      >
        <Button variant="primary" label="Salvar alterações" onPress={() => setOpenPrimario(true)} />
      </DemoCard>
      <DemoCard
        title="Rótulos longos"
        description="Os botões quebram linha em vez de cortar o texto."
        code={`<ConfirmDialog
  open={open}
  onCancel={handleCancel}
  onConfirm={handleConfirm}
  title="Dados incompletos na extração"
  description="Alguns campos não puderam ser confirmados automaticamente. Revise antes de continuar."
  cancelLabel="Voltar e preencher"
  confirmLabel="Enviar mesmo assim"
/>`}
      >
        <Button variant="secondary" label="Rótulos longos (bug OCR)" onPress={() => setOpenRotulosLongos(true)} />
      </DemoCard>

      <ConfirmDialog
        open={openDestrutivo}
        onCancel={() => setOpenDestrutivo(false)}
        onConfirm={handleConfirmDestrutivo}
        title="Excluir conta?"
        description="Esta ação não pode ser desfeita. Todos os seus dados serão removidos permanentemente."
        confirmLabel="Excluir"
        confirmVariant="destructive"
        confirmState={confirming ? "loading" : "default"}
      />

      <ConfirmDialog
        open={openPrimario}
        onCancel={() => setOpenPrimario(false)}
        onConfirm={() => setOpenPrimario(false)}
        title="Salvar alterações?"
        description="As alterações feitas neste formulário serão salvas."
      />

      <ConfirmDialog
        open={openRotulosLongos}
        onCancel={() => setOpenRotulosLongos(false)}
        onConfirm={() => setOpenRotulosLongos(false)}
        title="Dados incompletos na extração"
        description="Alguns campos não puderam ser confirmados automaticamente. Revise antes de continuar."
        cancelLabel="Voltar e preencher"
        confirmLabel="Enviar mesmo assim"
      />
    </div>
  );
}
