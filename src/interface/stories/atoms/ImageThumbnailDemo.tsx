import { ImageThumbnail } from "../../../components/ImageThumbnail/ImageThumbnail";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#7d50cd"/><circle cx="100" cy="80" r="40" fill="#f4f0fa"/><rect x="40" y="130" width="120" height="50" rx="12" fill="#f4f0fa"/></svg>`
  );

export function ImageThumbnailDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Tamanhos" description="Não clicável.">
        <div className={styles.row} style={{ alignItems: "center" }}>
          <ImageThumbnail src={PLACEHOLDER} alt="Fone roxo exemplo" size="small" />
          <ImageThumbnail src={PLACEHOLDER} alt="Fone roxo exemplo" size="medium" />
          <ImageThumbnail src={PLACEHOLDER} alt="Fone roxo exemplo" size="large" />
        </div>
      </DemoCard>
      <DemoCard title="Clicável" description="Passe o mouse e clique — abre em Modal.">
        <ImageThumbnail src={PLACEHOLDER} alt="Fone roxo exemplo" clickable />
      </DemoCard>
    </div>
  );
}
