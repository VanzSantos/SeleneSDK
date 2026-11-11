import { Icon, type IconName } from "../Icon/Icon";
import { Spinner } from "../Spinner/Spinner";
import styles from "./Button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "subtle"
  | "destructive"
  | "link";
export type ButtonState = "default" | "hover" | "pressed" | "disabled" | "loading";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  /** @deprecated Use uma variante sem contorno; remoção prevista na Etapa 5. */
  outlined?: boolean;
  state?: ButtonState;
  fullWidth?: boolean;
  onPress?: () => void;
  type?: "button" | "submit";
}

/** O modo iconOnly exige exatamente um ícone e nome acessível. */
type IconOnlyProps = {
  iconOnly: true;
  accessibleLabel: string;
  label?: never;
  count?: never;
  showLabel?: boolean;
} & (
  | { leftIcon: IconName; rightIcon?: never }
  | { rightIcon: IconName; leftIcon?: never }
);

type TextButtonProps = {
  iconOnly?: false;
  showLabel?: true;
  count?: number;
  leftIcon?: IconName;
  rightIcon?: IconName;
} & (
  | { label: string; accessibleLabel?: string }
  | { label?: never; accessibleLabel: string }
);

export type ButtonProps = ButtonBaseProps & (IconOnlyProps | TextButtonProps);

export function Button({
  variant = "primary",
  outlined = false,
  state = "default",
  showLabel = true,
  label,
  count,
  leftIcon,
  rightIcon,
  iconOnly = false,
  fullWidth = false,
  accessibleLabel,
  onPress,
  type = "button",
}: ButtonProps) {
  const warn = (message: string) => {
    if (import.meta.env.DEV) console.warn(`Button: ${message}`);
  };
  const visibleLabel = !iconOnly && showLabel && Boolean(label?.trim());
  if (iconOnly) {
    if (!accessibleLabel?.trim()) warn("accessibleLabel é obrigatório quando iconOnly=true.");
    if (label !== undefined || count !== undefined) warn("iconOnly não aceita label nem count.");
    if (Boolean(leftIcon) === Boolean(rightIcon)) warn("iconOnly exige exatamente um ícone.");
  } else {
    if (!showLabel) warn("showLabel=false só é permitido em iconOnly.");
    if (!visibleLabel && !accessibleLabel?.trim()) warn("o botão precisa de um nome acessível.");
  }
  const validCount = count !== undefined && Number.isFinite(count) && Number.isInteger(count) && count >= 0;
  if (count !== undefined && !validCount) warn("count deve ser um inteiro finito não negativo; contador omitido.");
  const countText = !iconOnly && validCount ? (count > 99 ? "99+" : String(count)) : undefined;
  if (outlined && variant === "subtle") {
    throw new Error(
      "Button: outlined=true com variant=\"subtle\" não é suportado — o único tom da família " +
        "'sutil' legível o bastante pra contornado (texto-secundario, 7.56:1 contra branco) fica " +
        "a só 2.35:1 do neutral outlined, abaixo do mínimo de distinção de UI (3:1). Use " +
        "variant=\"neutral\" outlined."
    );
  }

  const disabled = state === "disabled";
  const loading = state === "loading";
  const textColorVar = "var(--btn-content-color)";

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${outlined ? styles.outlined : ""} ${
        fullWidth ? styles.fullWidth : ""
      } ${loading ? styles.loading : ""}`}
      data-state={state}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-label={iconOnly ? accessibleLabel : undefined}
      onClick={() => !disabled && !loading && onPress?.()}
    >
      {loading ? (
        // decorative=true: o <button> já expõe aria-busy, então o Spinner não
        // precisa de role="status" próprio (evitaria anunciar duas vezes).
        <>
          <Spinner size="medium" color="var(--texto-secundario)" />
          {/* Sem isto o botão perde o nome acessível enquanto carrega (só aria-busy).
              iconOnly já tem aria-label, então só o caso com rótulo precisa. */}
          {!iconOnly && <span className={styles.srOnly}>{visibleLabel ? label : accessibleLabel}{countText !== undefined && <> {countText}</>}</span>}
        </>
      ) : (
        <>
          {leftIcon && <Icon name={leftIcon} size="medium" color={textColorVar} />}
          {visibleLabel && <span className={styles.label}>{label}</span>}
          {!iconOnly && !visibleLabel && accessibleLabel && <span className={styles.srOnly}>{accessibleLabel}</span>}
          {countText !== undefined && <>{" "}<span className={styles.count}>{countText}</span></>}
          {rightIcon && (!iconOnly || !leftIcon) && <Icon name={rightIcon} size="medium" color={textColorVar} />}
        </>
      )}
    </button>
  );
}
