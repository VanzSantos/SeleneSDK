import { AvatarGroup } from "../../../components/AvatarGroup/AvatarGroup";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

const pessoas = [
  { name: "Ana Beatriz" },
  { name: "Carlos Eduardo" },
  { name: "Fernanda Lima" },
  { name: "Gustavo Rocha" },
  { name: "Helena Souza" },
  { name: "Igor Martins" },
  { name: "Julia Prado" },
];

export function AvatarGroupDemo() {
  return (
    <div className={styles.cards}>
      <DemoCard title="Padrão" description={"max=5. 7 pessoas, 2 ficam no \"+2\"."}>
        <AvatarGroup avatars={pessoas} accessibleLabel="Responsáveis pelo projeto" />
      </DemoCard>

      <DemoCard title="Cabem todas" description="3 pessoas, max=5.">
        <AvatarGroup avatars={pessoas.slice(0, 3)} accessibleLabel="Participantes da reunião" />
      </DemoCard>

      <DemoCard title={"size=\"small\", max=3"}>
        <AvatarGroup avatars={pessoas} max={3} size="small" accessibleLabel="Revisores" />
      </DemoCard>
    </div>
  );
}
