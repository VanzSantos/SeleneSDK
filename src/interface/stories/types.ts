import type { ComponentType } from "react";

export type StoryGroup = "Tokens" | "Átomos" | "Moléculas" | "Organismos" | "Templates" | "Páginas";

export interface StoryMeta {
  id: string;
  /** Posição no menu (menor primeiro). Sem `order`, a tela vai pro fim, em ordem alfabética de id. */
  order?: number;
  title: string;
  group: StoryGroup;
  status: "draft" | "stable" | "deprecated";
  category?: string;
  contractFile?: string;
  dependencies?: string[];
  tokensSummary?: string[];
  description?: string;
  /** Só nas telas do grupo Tokens: qual página de tokens renderizar (no lugar do Demo/contrato). */
  tokenPage?: "cores" | "tipografia" | "espacamento" | "sombras";
  /** A Demo devolve vários cartões (um por seção): o shell mostra só o título "Pré-visualização" e não envolve tudo num cartão único. */
  previewAsCards?: boolean;
  /** Âncoras estáveis renderizadas pela Demo, listadas sob Pré-visualização. */
  previewSections?: { id: string; title: string }[];
  /** Seção opcional "Medidas" (anatomia, áreas de toque, tabela de tokens), logo após o código. */
  Measures?: ComponentType;
  code: string;
  Demo: ComponentType;
}
