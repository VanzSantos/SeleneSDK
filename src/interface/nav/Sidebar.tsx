import { useState } from "react";
import { SideNav, type SideNavItem } from "../../components/SideNav/SideNav";
import { Button } from "../../components/Button/Button";
import { TextField } from "../../components/TextField/TextField";
import { normalizeForSearch } from "../../components/shared/normalizeForSearch";
import { Icon } from "../../components/Icon/Icon";
import { GROUP_ORDER, STORIES } from "../stories/registry";
import type { StoryGroup } from "../stories/types";
import { ThemeToggle } from "../theme/ThemeToggle";
import type { ThemePreference } from "../theme/useTheme";
import styles from "./Sidebar.module.css";

export const ICON_LIBRARY_ID = "__icon-library__";

/** Href de cada tela do Playground — hash da URL, o que dá link direto pra cada
    componente sem biblioteca de rotas (SideNav só navega por href). */
export function hrefForStory(id: string) {
  return `#/${encodeURIComponent(id)}`;
}

function buildItems(selectedId: string): SideNavItem[] {
  const groups: SideNavItem[] = GROUP_ORDER.map((group) => ({
    key: `grupo-${group}`,
    label: group,
    children: STORIES.filter((story) => story.group === (group as StoryGroup)).map((story) => ({
      key: story.id,
      label: story.title,
      href: hrefForStory(story.id),
      active: selectedId === story.id,
    })),
  })).filter((group) => group.children!.length > 0);

  groups.push({
    key: "grupo-icones",
    label: "Biblioteca de Ícones",
    children: [
      {
        key: ICON_LIBRARY_ID,
        label: "Ícones (Phosphor)",
        href: hrefForStory(ICON_LIBRARY_ID),
        active: selectedId === ICON_LIBRARY_ID,
      },
    ],
  });
  return groups;
}

interface SidebarProps {
  selectedId: string;
  themePreference: ThemePreference;
  onThemePreferenceChange: (preference: ThemePreference) => void;
  /** Navega pro módulo ProtoTable (índice de protótipos) — módulo irmão
      deste, mesma estrutura visual, dados totalmente separados (ver
      App.tsx). */
  onNavigateToPrototable: () => void;
}

/** Marca do SeleneSDK — usada no topo do menu dos dois módulos. */
export function Brand({ icon, name }: { icon: "moon" | "pencil-ruler"; name: string }) {
  return (
    <div className={styles.brand}>
      <Icon name={icon} size="medium" color="var(--texto-primario)" weight="fill" decorative />
      {name}
    </div>
  );
}

/** Rodapé fixo do menu — modo de cor + atalho pro outro módulo. */
export function SidebarFooter({
  themePreference,
  onThemePreferenceChange,
  moduleLabel,
  moduleIcon,
  moduleDirection,
  onNavigate,
}: {
  themePreference: ThemePreference;
  onThemePreferenceChange: (preference: ThemePreference) => void;
  moduleLabel: string;
  moduleIcon: "moon" | "pencil-ruler";
  moduleDirection: "forward" | "back";
  onNavigate: () => void;
}) {
  return (
    <div className={styles.footer}>
      <p className={styles.version}>Versão {__SDK_VERSION__}</p>
      <ThemeToggle preference={themePreference} onChange={onThemePreferenceChange} />
      <Button
        variant="secondary"
        fullWidth
        label={moduleLabel}
        leftIcon={moduleIcon}
        rightIcon={moduleDirection === "forward" ? "arrow-right" : undefined}
        onPress={onNavigate}
      />
    </div>
  );
}

export function Sidebar({ selectedId, themePreference, onThemePreferenceChange, onNavigateToPrototable }: SidebarProps) {
  // Todos os grupos começam expandidos.
  const [openKeys, setOpenKeys] = useState<string[]>(() => buildItems(selectedId).map((item) => item.key));

  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeForSearch(query.trim());
  const searching = normalizedQuery.length > 0;
  const allItems = buildItems(selectedId);
  const items = searching
    ? allItems.map((group) => ({ ...group, children: group.children?.filter((item) => normalizeForSearch(item.label).includes(normalizedQuery)) }))
      .filter((group) => group.children?.length)
    : allItems;
  const resultCount = items.reduce((count, group) => count + (group.children?.length ?? 0), 0);

  function clearSearch(container: HTMLElement) {
    setQuery("");
    container.closest("[role=search]")?.querySelector("input")?.focus();
  }

  return (
    <SideNav
      items={items}
      openKeys={searching ? items.map((item) => item.key) : openKeys}
      onOpenKeysChange={(keys) => { if (!searching) setOpenKeys(keys); }}
      accessibleLabel="Navegação de componentes"
      header={
        <div className={styles.header}>
          <Brand icon="moon" name="SeleneSDK" />
          <div role="search" aria-label="Busca no catálogo"
            onKeyDown={(event) => {
              if (!(event.target instanceof HTMLInputElement) || event.nativeEvent.isComposing) return;
              if (event.key === "Escape") {
                event.preventDefault();
                event.stopPropagation();
                clearSearch(event.currentTarget);
              } else if (event.key === "Enter") {
                event.preventDefault();
                const firstResult = items[0]?.children?.[0];
                if (firstResult?.href) window.location.hash = firstResult.href.slice(1);
              }
            }}>
            <div className={styles.searchRow}>
              <TextField accessibleLabel="Buscar" placeholder="Buscar" leftIcon="magnifying-glass"
                value={query} onChange={setQuery} autoComplete="off" />
              {query && <button type="button" className={styles.clearSearch} aria-label="Limpar busca" onClick={(event) => clearSearch(event.currentTarget)}>
                <Icon name="x" size="small" color="var(--texto-primario)" decorative />
              </button>}
            </div>
            <p role="status" aria-live="polite" aria-atomic="true" className={searching && resultCount === 0 ? styles.emptySearch : styles.searchStatus}>
              {searching ? (resultCount === 0 ? "Nenhum resultado encontrado" : `${resultCount} ${resultCount === 1 ? "resultado" : "resultados"}`) : ""}
            </p>
          </div>
        </div>
      }
      footer={
        <SidebarFooter
          themePreference={themePreference}
          onThemePreferenceChange={onThemePreferenceChange}
          moduleLabel="ProtoTable"
          moduleIcon="pencil-ruler"
          moduleDirection="forward"
          onNavigate={onNavigateToPrototable}
        />
      }
    />
  );
}
