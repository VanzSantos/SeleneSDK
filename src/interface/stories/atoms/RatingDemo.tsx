import { useState } from "react";
import { Rating } from "../../../components/Rating/Rating";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function RatingDemo() {
  const [nota, setNota] = useState(3);
  const [notaComMeio, setNotaComMeio] = useState(3.5);

  return (
    <div className={styles.cards}>
      <DemoCard title="Interativo" description="Só inteiros.">
        <Rating value={nota} onChange={setNota} accessibleLabel="Avalie sua experiência" />
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--texto-secundario)" }}>Nota: {nota}</p>
      </DemoCard>

      <DemoCard title="Interativo" description="Com meio-ponto (clique na metade esquerda/direita da estrela).">
        <Rating value={notaComMeio} onChange={setNotaComMeio} allowHalf accessibleLabel="Avalie o atendimento" />
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--texto-secundario)" }}>Nota: {notaComMeio}</p>
      </DemoCard>

      <DemoCard title="Só leitura" description="Nota média de um produto.">
        <Rating value={4.5} allowHalf state="readOnly" accessibleLabel="Nota média do produto" />
      </DemoCard>

      <DemoCard title="Desabilitado">
        <Rating value={2} onChange={() => {}} state="disabled" accessibleLabel="Avaliação bloqueada" />
      </DemoCard>

      <DemoCard title="Escala de 1 a 10" description="max customizado.">
        <Rating value={7} allowHalf state="readOnly" max={10} accessibleLabel="Nota de 1 a 10" />
      </DemoCard>

      <DemoCard title="Cor amarela">
        <Rating value={4} onChange={setNota} color="yellow" accessibleLabel="Avaliação amarela" />
      </DemoCard>

      <DemoCard title="Tamanho grande">
        <Rating value={notaComMeio} allowHalf state="readOnly" size="large" accessibleLabel="Nota grande" />
      </DemoCard>

      <DemoCard title="Compacto" description="1 estrela + nota (só leitura).">
        <div style={{ display: "flex", gap: 24 }}>
          <Rating value={3.5} allowHalf state="readOnly" display="compact" accessibleLabel="Nota compacta verde" />
          <Rating value={4.8} allowHalf state="readOnly" display="compact" color="yellow" accessibleLabel="Nota compacta amarela" />
          <Rating value={5} state="readOnly" display="compact" color="yellow" size="large" accessibleLabel="Nota compacta amarela grande" />
        </div>
      </DemoCard>
    </div>
  );
}
