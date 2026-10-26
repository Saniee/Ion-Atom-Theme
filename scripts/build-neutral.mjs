// Builds the Ion Atom Neutral variants from the base themes.
//
// Neutral keeps each base theme's UI colors and palette, but colors code like
// One Dark Pro: a small set of roles applied the same way in every language,
// carried by TextMate scopes so it looks the same with or without a language
// server. Semantic tokens only alias onto those same roles.
//
// Run with `npm run build:neutral` after changing a base theme.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const variants = [
  { base: "ion-color-theme.json", out: "ion-neutral-color-theme.json", name: "Ion Atom Neutral" },
  { base: "ion-light-color-theme.json", out: "ion-neutral-light-color-theme.json", name: "Ion Atom Neutral Light" },
  { base: "ion-fusion-color-theme.json", out: "ion-neutral-fusion-color-theme.json", name: "Ion Atom Neutral Fusion" },
];

// Each role takes its color from the base theme rule that owns this scope,
// so palette changes in the base themes carry over on the next build.
const roleSources = {
  punctuation: "punctuation",
  comment: "comment",
  doc: "comment.block.documentation",
  keyword: "keyword",
  operator: "keyword.operator",
  string: "string",
  escape: "markup.underline.link",
  constant: "constant",
  func: "entity.name.function",
  type: "entity.name.type",
  module: "entity.name.type.interface",
  variable: "variable",
  parameter: "variable.parameter",
  property: "variable.other.property",
  decorator: "meta.decorator",
  inserted: "markup.inserted",
  deleted: "markup.deleted",
  changed: "markup.changed",
  invalid: "invalid",
};

const rules = [
  ["punctuation", ["punctuation", "meta.brace", "meta.delimiter", "punctuation.definition.tag"]],
  ["comment", ["comment", "punctuation.definition.comment"], "italic"],
  ["doc", ["comment.block.documentation", "comment.line.documentation", "comment.documentation", "string.quoted.docstring"], "italic"],
  ["doc", ["storage.type.class.jsdoc", "keyword.other.documentation"], "italic"],

  ["keyword", ["keyword", "keyword.control", "keyword.other", "storage", "storage.type", "storage.modifier",
    "keyword.operator.new", "keyword.operator.expression", "keyword.operator.logical.python", "keyword.operator.wordlike",
    "keyword.operator.cast", "keyword.operator.type", "keyword.operator.delete", "keyword.operator.sizeof", "keyword.operator.alignof",
    "entity.other.attribute-name.pseudo-class.css", "entity.other.attribute-name.pseudo-element.css",
    "keyword.control.at-rule", "punctuation.definition.keyword.css"]],
  ["operator", ["keyword.operator", "punctuation.definition.group.regexp", "punctuation.definition.character-class.regexp"]],
  ["invalid", ["keyword.other.unsafe"], "bold"],

  ["string", ["string", "string.quoted", "punctuation.definition.string", "markup.inline.raw", "argument.source.cmake", "string.source.cmakecache"]],
  ["escape", ["constant.character.escape", "constant.other.placeholder", "constant.character.format.placeholder",
    "punctuation.definition.template-expression", "punctuation.section.embedded", "constant.character.entity",
    "meta.fstring punctuation.definition.fstring", "string.regexp", "constant.regexp", "keyword.operator.quantifier.regexp",
    "constant.other.character-class.regexp", "constant.character.character-class.regexp", "markup.underline.link"]],

  // Literals are plain white; named constants and enum members are bold white, as in Ion Atom.
  ["constant", ["constant.numeric", "constant.language", "constant.other.color", "support.constant", "keyword.other.unit"]],
  ["constant", ["constant", "variable.other.enummember"], "bold"],

  ["func", ["entity.name.function", "support.function", "meta.function-call.generic",
    "entity.name.function.macro", "support.function.macro", "entity.name.function.preprocessor",
    "entity.name.function.macro.definition", "meta.preprocessor.macro entity.name.function", "entity.name.function.sql",
    "entity.other.attribute-name.id.css"]],

  ["type", ["entity.name.type", "entity.name.class", "entity.other.inherited-class", "support.type", "support.class",
    "storage.type.built-in", "storage.type.primitive", "storage.type.core", "storage.type.numeric", "storage.type.string",
    "support.type.primitive", "support.type.builtin", "support.type.python", "support.class.builtin", "entity.name.type.primitive",
    "keyword.type", "storage.type.sql", "keyword.source.cmakecache",
    "support.class.component", "entity.name.tag.component", "entity.other.attribute-name.class.css",
    "entity.other.attribute-name.placeholder", "entity.other.attribute-name.parent-selector-suffix",
    "entity.other.attribute-name.parent-selector-suffix punctuation.definition.entity"]],
  ["parameter", ["entity.name.type.parameter", "entity.name.type.type-parameter", "storage.modifier.lifetime",
    "entity.name.type.lifetime", "entity.name.lifetime"], "italic"],
  ["module", ["entity.name.namespace", "entity.name.module", "entity.name.type.module", "entity.name.type.namespace",
    "constant.other.database-name.sql", "constant.other.table-name.sql"]],

  ["variable", ["variable", "variable.other.readwrite", "variable.other.constant", "meta.definition.variable",
    "support.variable", "entity.name.tag", "storage.source.cmake"]],
  ["parameter", ["variable.parameter", "variable.language", "entity.name.label"], "italic"],
  ["property", ["variable.other.property", "variable.other.object.property", "variable.other.constant.property",
    "variable.other.member", "variable.other.event", "support.variable.property", "meta.object-literal.key",
    "entity.other.attribute-name", "support.type.property-name", "support.type.property-name.json", "entity.name.tag.yaml",
    "support.type.property-name.toml", "variable.other.key.toml", "support.type.map.key.scss", "support.type.map.key.sass",
    "entity.source.cmake", "entity.source.cmakecache", "variable.source.cmakecache"]],

  ["decorator", ["meta.decorator", "meta.function.decorator", "entity.name.function.decorator", "entity.name.decorator",
    "punctuation.decorator", "punctuation.definition.decorator", "storage.type.annotation", "meta.attribute",
    "punctuation.definition.attribute", "entity.other.attribute", "support.other.attribute"]],

  ["func", ["entity.name.section.toml", "entity.name.section.group-title.toml",
    "meta.table.toml support.type.property-name", "meta.array.table.toml support.type.property-name"], "bold"],
  ["func", ["markup.heading", "entity.name.section.markdown"], "bold"],
  [null, ["markup.bold"], "bold"],
  [null, ["markup.italic"], "italic"],
  ["comment", ["markup.quote"], "italic"],
  ["inserted", ["markup.inserted"]],
  ["deleted", ["markup.deleted"]],
  ["changed", ["markup.changed"]],
  ["invalid", ["invalid"]],
];

// Semantic tokens with a standard TextMate fallback (variable, parameter,
// property, type, function, ...) need no rule here: VS Code colors them with
// the matching scope above. These cover language-server-specific tokens so
// they land on the same roles, plus a few fixes for odd server output.
const semanticRules = {
  local: "variable",
  field: "property",
  extensionMethod: "func",
  recordClass: "type",
  recordStruct: "type",
  delegate: "type",
  builtinType: "type",
  selfTypeKeyword: "type",
  selfKeyword: ["parameter", "italic"],
  lifetime: ["parameter", "italic"],
  label: ["parameter", "italic"],
  boolean: "constant",
  constant: ["constant", "bold"],
  const: ["constant", "bold"],
  static: ["constant", "bold"],
  "variable.constant": ["constant", "bold"],
  "variable.static": ["constant", "bold"],
  enumMember: ["constant", "bold"],
  macroBang: "func",
  procMacro: "func",
  attribute: "decorator",
  builtinAttribute: "decorator",
  derive: "decorator",
  deriveHelper: "decorator",
  attributeBracket: "punctuation",
  formatSpecifier: "escape",
  escapeSequence: "escape",
  invalidEscapeSequence: "invalid",
  unresolvedReference: "invalid",
  tomlTableKey: "property",
  tomlArrayKey: "property",
  "variable.defaultLibrary:lua": "module",
  "struct:lua": "variable",
  "parameter:dockerfile": ["foreground", ""],
  "namespace.deprecated:csharp": ["module", "", false],
  "*.deprecated": { strikethrough: true },
};

function roleColors(theme) {
  const colors = { foreground: theme.colors["editor.foreground"] };
  for (const [role, scope] of Object.entries(roleSources)) {
    const rule = theme.tokenColors.find((r) => [].concat(r.scope).includes(scope));
    if (!rule?.settings.foreground) throw new Error(`${theme.name}: no color for "${scope}"`);
    colors[role] = rule.settings.foreground;
  }
  return colors;
}

function build({ base, out, name }) {
  const theme = JSON.parse(readFileSync(join(root, base), "utf8"));
  const c = roleColors(theme);

  const tokenColors = rules.map(([role, scope, fontStyle]) => {
    const settings = {};
    if (role) settings.foreground = c[role];
    if (fontStyle) settings.fontStyle = fontStyle;
    return { scope, settings };
  });

  const semanticTokenColors = {};
  for (const [selector, spec] of Object.entries(semanticRules)) {
    if (typeof spec === "string") {
      semanticTokenColors[selector] = c[spec];
    } else if (Array.isArray(spec)) {
      const [role, fontStyle, strikethrough] = spec;
      semanticTokenColors[selector] = { foreground: c[role], fontStyle };
      if (strikethrough !== undefined) semanticTokenColors[selector].strikethrough = strikethrough;
    } else {
      semanticTokenColors[selector] = spec;
    }
  }

  const neutral = {
    name,
    type: theme.type,
    semanticHighlighting: true,
    colors: theme.colors,
    semanticTokenColors,
    tokenColors,
  };
  writeFileSync(join(root, out), JSON.stringify(neutral, null, 2) + "\n");
  console.log(`wrote ${out}`);
}

variants.forEach(build);
