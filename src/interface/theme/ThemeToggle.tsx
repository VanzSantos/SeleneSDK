import { Button } from "../../components/Button/Button";
import type { Theme, ThemePreference } from "./useTheme";
import styles from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  theme: Theme;
  preference: ThemePreference;
  onChange: (preference: ThemePreference) => void;
}

/** Alternância explícita com atalho para restaurar a preferência do sistema. */
export function ThemeToggle({ theme, preference, onChange }: ThemeToggleProps) {
  const dark = theme === "dark";
  const currentMode = preference === "system" ? "Padrão do sistema" : dark ? "Modo escuro" : "Modo claro";
  return (
    <div className={styles.controls} role="group" aria-label={`Modo de cor: ${currentMode}`}>
      <Button variant="secondary" iconOnly leftIcon={dark ? "sun" : "moon"}
        accessibleLabel={dark ? "Ativar modo claro" : "Ativar modo escuro"}
        onPress={() => onChange(dark ? "light" : "dark")} />
      <Button variant="secondary" iconOnly leftIcon="desktop"
        accessibleLabel={preference === "system" ? "Usar padrão do sistema (ativo)" : "Usar padrão do sistema"}
        onPress={() => onChange("system")} />
    </div>
  );
}
