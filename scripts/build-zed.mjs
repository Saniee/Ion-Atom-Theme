// Builds the Ion Atom Zed theme family from the VS Code themes.
//
// UI colors come from each theme's workbench colors. Syntax uses the Neutral
// roles, since Zed highlights with a small set of tree-sitter captures rather
// than TextMate scopes. Zed fills any key a theme leaves out from its default
// theme, so every key is set, and keys VS Code has no color for are derived
// from the closest one (marked "derived" below).
//
// Run with `npm run build:zed` after changing a base theme.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { roleColors } from "./build-neutral.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = "zed/themes/ion-atom.json";

const variants = [
  { base: "ion-color-theme.json", name: "Ion Atom Neutral" },
  { base: "ion-light-color-theme.json", name: "Ion Atom Neutral Light" },
  { base: "ion-fusion-color-theme.json", name: "Ion Atom Neutral Fusion" },
];

const alpha = (hex, aa) => hex.slice(0, 7) + aa;

function style(theme) {
  const c = (key) => {
    const value = theme.colors[key];
    if (!value) throw new Error(`${theme.name}: no "${key}"`);
    return value;
  };
  const r = roleColors(theme);
  const transparent = "#00000000";

  // Zed shows one status color with a faint fill and a border (derived).
  const status = (name, color) => ({
    [name]: color,
    [`${name}.background`]: alpha(color, "1a"),
    [`${name}.border`]: alpha(color, "66"),
  });

  const ansi = ["Black", "Red", "Green", "Yellow", "Blue", "Magenta", "Cyan", "White"];
  const terminal = {
    "terminal.background": c("terminal.background"),
    "terminal.foreground": c("terminal.foreground"),
    "terminal.ansi.background": c("terminal.background"),
    "terminal.bright_foreground": c("terminal.ansiBrightWhite"),
    "terminal.dim_foreground": c("terminal.ansiBrightBlack"),
  };
  for (const name of ansi) {
    const key = name.toLowerCase();
    terminal[`terminal.ansi.${key}`] = c(`terminal.ansi${name}`);
    terminal[`terminal.ansi.bright_${key}`] = c(`terminal.ansiBright${name}`);
    // Derived: VS Code has no dim ANSI colors.
    terminal[`terminal.ansi.dim_${key}`] = alpha(c(`terminal.ansi${name}`), "99");
  }

  // Player 1 is your own cursor; the rest are collaborators (derived).
  const players = [{ cursor: c("editorCursor.foreground"), background: c("editorCursor.foreground"), selection: c("editor.selectionBackground") }];
  for (const key of ["charts.green", "charts.purple", "charts.orange", "charts.yellow", "terminal.ansiCyan", "charts.red", "terminal.ansiBrightBlue"]) {
    players.push({ cursor: c(key), background: c(key), selection: alpha(c(key), "3d") });
  }

  const syntax = (role, extra = {}) => ({ color: role ? r[role] : null, font_style: null, font_weight: null, ...extra });
  const italic = { font_style: "italic" };
  const bold = { font_weight: 700 };

  return {
    "border": c("panel.border"),
    "border.variant": c("menu.separatorBackground"),
    "border.focused": c("focusBorder"),
    "border.selected": c("list.activeSelectionBackground"),
    "border.transparent": transparent,
    "border.disabled": c("menu.separatorBackground"),
    "pane_group.border": c("panel.border"),
    "elevated_surface.background": c("editorWidget.background"),
    "surface.background": c("sideBar.background"),
    "background": c("titleBar.activeBackground"),
    "element.background": c("input.background"),
    "element.hover": c("list.hoverBackground"),
    "element.active": c("list.activeSelectionBackground"),
    "element.selected": c("list.activeSelectionBackground"),
    "element.disabled": c("input.background"),
    "drop_target.background": alpha(c("focusBorder"), "33"),
    "ghost_element.background": transparent,
    "ghost_element.hover": c("list.hoverBackground"),
    "ghost_element.active": c("list.activeSelectionBackground"),
    "ghost_element.selected": c("list.activeSelectionBackground"),
    "ghost_element.disabled": transparent,
    "text": c("foreground"),
    "text.muted": c("descriptionForeground"),
    "text.placeholder": c("breadcrumb.foreground"),
    "text.disabled": c("disabledForeground"),
    "text.accent": c("list.highlightForeground"),
    "icon": c("activityBar.foreground"),
    "icon.muted": c("descriptionForeground"),
    "icon.disabled": c("activityBar.inactiveForeground"),
    "icon.placeholder": c("breadcrumb.foreground"),
    "icon.accent": c("focusBorder"),
    "status_bar.background": c("statusBar.background"),
    "title_bar.background": c("titleBar.activeBackground"),
    "title_bar.inactive_background": c("titleBar.inactiveBackground"),
    "toolbar.background": c("editor.background"),
    "tab_bar.background": c("editorGroupHeader.tabsBackground"),
    "tab.inactive_background": c("tab.inactiveBackground"),
    "tab.active_background": c("tab.activeBackground"),
    "search.match_background": c("editor.findMatchHighlightBackground"),
    "search.active_match_background": c("editor.findMatchBackground"),
    "panel.background": c("panel.background"),
    "panel.focused_border": null,
    "panel.indent_guide": c("editorIndentGuide.background1"),
    "panel.indent_guide_active": c("editorIndentGuide.activeBackground1"),
    "panel.indent_guide_hover": c("editorIndentGuide.activeBackground1"),
    "pane.focused_border": null,
    "scrollbar.thumb.background": c("scrollbarSlider.background"),
    "scrollbar.thumb.hover_background": c("scrollbarSlider.hoverBackground"),
    "scrollbar.thumb.active_background": c("scrollbarSlider.activeBackground"),
    "scrollbar.thumb.border": transparent,
    "scrollbar.track.background": transparent,
    "scrollbar.track.border": transparent,
    "editor.foreground": c("editor.foreground"),
    "editor.background": c("editor.background"),
    "editor.gutter.background": c("editorGutter.background"),
    "editor.subheader.background": c("sideBar.background"),
    "editor.active_line.background": c("editor.lineHighlightBackground"),
    "editor.highlighted_line.background": c("editor.rangeHighlightBackground"),
    "editor.line_number": c("editorLineNumber.foreground"),
    "editor.active_line_number": c("editorLineNumber.activeForeground"),
    "editor.hover_line_number": c("breadcrumb.foreground"),
    "editor.invisible": c("editorWhitespace.foreground"),
    "editor.wrap_guide": c("editorIndentGuide.background1"),
    "editor.active_wrap_guide": c("editorIndentGuide.activeBackground1"),
    "editor.indent_guide": c("editorIndentGuide.background1"),
    "editor.indent_guide_active": c("editorIndentGuide.activeBackground1"),
    "editor.document_highlight.read_background": c("editor.wordHighlightBackground"),
    "editor.document_highlight.write_background": c("editor.wordHighlightStrongBackground"),
    "editor.document_highlight.bracket_background": c("editorBracketMatch.background"),
    ...terminal,
    "link_text.hover": c("textLink.activeForeground"),
    "version_control.added": c("editorGutter.addedBackground"),
    "version_control.modified": c("editorGutter.modifiedBackground"),
    "version_control.deleted": c("editorGutter.deletedBackground"),
    "version_control.word_added": c("diffEditor.insertedTextBackground"),
    "version_control.word_deleted": c("diffEditor.removedTextBackground"),
    "version_control.conflict_marker.ours": alpha(c("gitDecoration.addedResourceForeground"), "1a"),
    "version_control.conflict_marker.theirs": alpha(c("gitDecoration.renamedResourceForeground"), "1a"),
    ...status("conflict", c("gitDecoration.conflictingResourceForeground")),
    ...status("created", c("gitDecoration.addedResourceForeground")),
    ...status("deleted", c("gitDecoration.deletedResourceForeground")),
    ...status("modified", c("gitDecoration.modifiedResourceForeground")),
    ...status("renamed", c("gitDecoration.renamedResourceForeground")),
    ...status("ignored", c("gitDecoration.ignoredResourceForeground")),
    ...status("hidden", c("disabledForeground")),
    ...status("unreachable", c("disabledForeground")),
    ...status("error", c("editorError.foreground")),
    ...status("warning", c("editorWarning.foreground")),
    ...status("info", c("editorInfo.foreground")),
    ...status("hint", c("descriptionForeground")),
    ...status("success", c("gitDecoration.addedResourceForeground")),
    ...status("predictive", r.comment),
    "accents": [1, 2, 3, 4, 5, 6].map((n) => c(`editorBracketHighlight.foreground${n}`)),
    players,
    syntax: {
      "attribute": syntax("decorator"),
      "boolean": syntax("constant"),
      "comment": syntax("comment", italic),
      "comment.doc": syntax("doc", italic),
      "constant": syntax("constant", bold),
      "constructor": syntax("type"),
      "diff.minus": syntax("deleted"),
      "diff.plus": syntax("inserted"),
      "embedded": syntax("foreground"),
      "emphasis": syntax(null, italic),
      "emphasis.strong": syntax(null, bold),
      "enum": syntax("type"),
      "function": syntax("func"),
      "hint": syntax("comment"),
      "keyword": syntax("keyword"),
      "label": syntax("parameter", italic),
      "lifetime": syntax("parameter", italic),
      "link_text": syntax("escape"),
      "link_uri": syntax("escape"),
      "namespace": syntax("module"),
      "number": syntax("constant"),
      "operator": syntax("operator"),
      "predictive": syntax("comment", italic),
      "preproc": syntax("keyword"),
      "primary": syntax("foreground"),
      "property": syntax("property"),
      "punctuation": syntax("punctuation"),
      "punctuation.special": syntax("escape"),
      "selector": syntax("type"),
      "selector.pseudo": syntax("keyword"),
      "string": syntax("string"),
      "string.escape": syntax("escape"),
      "string.regex": syntax("escape"),
      "string.special": syntax("escape"),
      "string.special.symbol": syntax("constant"),
      "tag": syntax("variable"),
      "text.literal": syntax("string"),
      "title": syntax("func", bold),
      "type": syntax("type"),
      "variable": syntax("variable"),
      "variable.parameter": syntax("parameter", italic),
      "variable.special": syntax("parameter", italic),
      "variant": syntax("constant", bold),
    },
  };
}

const family = {
  $schema: "https://zed.dev/schema/themes/v0.2.0.json",
  name: "Ion Atom",
  author: "Saniee",
  themes: variants.map(({ base, name }) => {
    const theme = JSON.parse(readFileSync(join(root, base), "utf8"));
    return { name, appearance: theme.type, style: style(theme) };
  }),
};

mkdirSync(join(root, dirname(out)), { recursive: true });
writeFileSync(join(root, out), JSON.stringify(family, null, 2) + "\n");
console.log(`wrote ${out}`);
