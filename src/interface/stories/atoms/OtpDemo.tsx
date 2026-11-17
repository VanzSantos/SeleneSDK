import { useState } from "react";
import { Otp } from "../../../components/Otp/Otp";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function OtpDemo() {
  const [codigo, setCodigo] = useState("");
  const [codigoCompleto, setCodigoCompleto] = useState("1234");
  const [ultimaConfirmacao, setUltimaConfirmacao] = useState("");
  const [codigoErro, setCodigoErro] = useState("42");

  return (
    <div className={styles.cards}>
      <DemoCard title="Padrão" description="6 dígitos. cole um código de 6 números pra testar.">
        <Otp
          label="Código de verificação"
          value={codigo}
          onChange={setCodigo}
          onComplete={setUltimaConfirmacao}
          helperText="Enviamos um código de 6 dígitos por SMS."
        />
        {ultimaConfirmacao && <p style={{ fontSize: 13, color: "var(--texto-secundario)" }}>onComplete disparado com: {ultimaConfirmacao}</p>}
      </DemoCard>

      <DemoCard title="4 dígitos, já preenchido">
        <Otp length={4} value={codigoCompleto} onChange={setCodigoCompleto} accessibleLabel="PIN de 4 dígitos" />
      </DemoCard>

      <DemoCard title="Estado de erro">
        <Otp value={codigoErro} onChange={setCodigoErro} state="error" helperText="Código inválido ou expirado." />
      </DemoCard>
    </div>
  );
}
