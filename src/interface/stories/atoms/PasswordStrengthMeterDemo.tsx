import { useState } from "react";
import { TextField } from "../../../components/TextField/TextField";
import { PasswordStrengthMeter } from "../../../components/PasswordStrengthMeter/PasswordStrengthMeter";
import styles from "../Demo.module.css";
import { DemoCard } from "../DemoCard";

export function PasswordStrengthMeterDemo() {
  const [senha, setSenha] = useState("");

  return (
    <div className={styles.cards}>
      <DemoCard title={"Pareado com TextField type=\"password\""}>
        <TextField label="Nova senha" type="password" value={senha} onChange={setSenha} />
        <div style={{ marginTop: 8 }}>
          <PasswordStrengthMeter value={senha} />
        </div>
      </DemoCard>
    </div>
  );
}
