import type { StoryMeta } from "../types";
import { CheckboxDemo } from "../atoms/CheckboxDemo";
import { CheckboxMeasures } from "../atoms/CheckboxMeasures";

const story: StoryMeta = {
  id: "checkbox",
  order: 70,
  title: "Checkbox",
  group: "Átomos",
  status: "draft",
  category: "data-entry",
  contractFile: "contratos/checkbox.contract.json",
  dependencies: ["Icon", "HelperText"],
  tokensSummary: ["semantic.acao-primaria", "semantic.borda-*", "structural.raio-xp"],
  description: "Controle booleano — marcado, desmarcado ou indeterminado. Todo o <label> é clicável, não só a caixa.",
  code: `<Checkbox label="Lembrar-me" checked={lembrar} onChange={setLembrar} />
<Checkbox label="Selecionar tudo" checked={false} indeterminate />
<Checkbox label="Aceito os termos" required checked={ok} state={ok ? "default" : "error"} helperText="..." />`,
  previewAsCards: true,
  Measures: CheckboxMeasures,
  Demo: CheckboxDemo,
};

export default story;
