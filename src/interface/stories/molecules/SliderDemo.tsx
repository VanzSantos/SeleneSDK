import { useState } from "react";
import { Slider } from "../../../components/Slider/Slider";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function SliderDemo() {
  const [volume, setVolume] = useState(40);
  const [faixaPreco, setFaixaPreco] = useState<[number, number]>([200, 800]);
  const [desabilitado] = useState(30);

  return (
    <div className={styles.cards}>
      <DemoCard title="Valor único">
        <Slider label="Volume" value={volume} onChange={setVolume} />
      </DemoCard>

      <DemoCard title="Intervalo" description="Dois cabos. step=50.">
        <Slider label="Faixa de preço (R$)" range value={faixaPreco} onChange={setFaixaPreco} min={0} max={1000} step={50} />
      </DemoCard>

      <DemoCard title="Desabilitado">
        <Slider label="Brilho" value={desabilitado} onChange={() => {}} state="disabled" />
      </DemoCard>
    </div>
  );
}
