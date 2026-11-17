import { useState } from "react";
import { CommentComposer } from "../../../components/CommentComposer/CommentComposer";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

interface Note {
  id: number;
  text: string;
}

export function CommentComposerDemo() {
  const [texto, setTexto] = useState("");
  const [notas, setNotas] = useState<Note[]>([
    { id: 1, text: "Solicitação de serviço: Em andamento. Protocolo: 3356142024130995509." },
  ]);
  const [textoBloqueado, setTextoBloqueado] = useState("");
  const [textoAlerta, setTextoAlerta] = useState(
    "Este texto já passou do limite de 40 caracteres definido no exemplo abaixo."
  );

  function publicar(value: string) {
    setNotas((current) => [...current, { id: current.length + 1, text: value }]);
    setTexto("");
  }

  return (
    <div className={styles.cards}>
      <DemoCard title="Completo" description="Com utilitários (anexar imagem, marcar importante).">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notas.map((nota) => (
            <div key={nota.id} style={{ padding: 8, background: "var(--fundo-secundario)", borderRadius: 8, fontSize: 14 }}>
              {nota.text}
            </div>
          ))}
        </div>
        <CommentComposer
          value={texto}
          onChange={setTexto}
          onSubmit={publicar}
          onAttachImage={() => {}}
          onMarkImportant={() => {}}
        />
      </DemoCard>

      <DemoCard title="Sem utilitários" description="Só texto + publicar.">
        <CommentComposer value="" onChange={() => {}} onSubmit={() => {}} placeholder="Escreva um comentário..." submitLabel="Comentar" />
      </DemoCard>

      <DemoCard title="Desabilitado" description="Ex.: enviando.">
        <CommentComposer value="Salvando esta nota..." onChange={() => {}} onSubmit={() => {}} disabled />
      </DemoCard>

      <DemoCard title="Limite bloqueando a digitação" description={"limitMode=\"block\", maxLength=40. impossível digitar além do limite."}>
        <CommentComposer
          value={textoBloqueado}
          onChange={setTextoBloqueado}
          onSubmit={() => {}}
          maxLength={40}
          showCharacterCount
          limitMode="block"
        />
      </DemoCard>

      <DemoCard title="Limite avisando e bloqueando o botão" description={"limitMode=\"warn\", maxLength=40. digitação livre, alerta + Publicar desabilitado ao ultrapassar."}>
        <CommentComposer
          value={textoAlerta}
          onChange={setTextoAlerta}
          onSubmit={() => {}}
          maxLength={40}
          showCharacterCount
          limitMode="warn"
        />
      </DemoCard>
    </div>
  );
}
