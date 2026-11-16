import { Button } from "../../components/Button/Button";
import type { Theme, ThemePreference } from "./useTheme";

interface ThemeToggleProps {
  theme: Theme;
  onChange: (preference: ThemePreference) => void;
}

/** O ícone descreve a próxima ação; a preferência explícita continua persistida. */
export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  const dark = theme === "dark";
  return (
    <Button variant="secondary" iconOnly leftIcon={dark ? "sun" : "moon"}
      accessibleLabel={dark ? "Ativar modo claro" : "Ativar modo escuro"}
      onPress={() => onChange(dark ? "light" : "dark")} />
  );
}
