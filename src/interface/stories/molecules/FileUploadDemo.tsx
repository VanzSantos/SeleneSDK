import { useState } from "react";
import { FileUpload, type FileUploadRejection } from "../../../components/FileUpload/FileUpload";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function FileUploadDemo() {
  const [arquivoField, setArquivoField] = useState<File[]>([]);
  const [arquivosButton, setArquivosButton] = useState<File[]>([]);
  const [arquivosDropzone, setArquivosDropzone] = useState<File[]>([]);
  const [rejeitados, setRejeitados] = useState<FileUploadRejection[]>([]);

  return (
    <div className={styles.cards}>
      <DemoCard title={"variant=\"field\""}>
        <FileUpload
          variant="field"
          label="Comprovante de endereço"
          value={arquivoField}
          onChange={setArquivoField}
          helperText="PDF ou imagem, até 5MB."
          accept=".pdf,image/*"
          maxSizeMB={5}
          onReject={setRejeitados}
        />
      </DemoCard>

      <DemoCard title={"variant=\"button\""} description="Multiple.">
        <FileUpload variant="button" value={arquivosButton} onChange={setArquivosButton} multiple buttonLabel="Anexar arquivos" />
      </DemoCard>

      <DemoCard title={"variant=\"button\""} description={"buttonVariant=\"link\" (sem fundo/borda) + required."}>
        <FileUpload
          variant="button"
          value={[]}
          onChange={() => {}}
          buttonLabel="Enviar sua foto"
          buttonVariant="link"
          required
        />
      </DemoCard>

      <DemoCard title={"variant=\"dropzone\""} description="Multiple, arraste ou clique.">
        <FileUpload
          variant="dropzone"
          value={arquivosDropzone}
          onChange={setArquivosDropzone}
          multiple
          onReject={setRejeitados}
          dropzoneLabel="Arraste uma planilha aqui ou clique para importar"
        />
      </DemoCard>

      <DemoCard title={"state=\"error\" / state=\"disabled\""}>
        <div className={styles.row} style={{ alignItems: "flex-start", gap: 16 }}>
          <FileUpload variant="field" label="Documento" value={[]} onChange={() => {}} state="error" helperText="Arquivo obrigatório." />
          <FileUpload variant="field" label="Documento" value={[]} onChange={() => {}} state="disabled" helperText="Bloqueado nesta etapa." />
        </div>
      </DemoCard>

      {rejeitados.length > 0 && (
        <p style={{ fontSize: 13, color: "var(--texto-erro)" }}>
          Rejeitados: {rejeitados.map((r) => `${r.file.name} (${r.reason})`).join(", ")}
        </p>
      )}
    </div>
  );
}
