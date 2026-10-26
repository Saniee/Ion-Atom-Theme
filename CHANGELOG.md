# Changelog

## 0.5.0
- New **Ion Atom Neutral**, **Neutral Light** and **Neutral Fusion** variants: the same palettes with One Dark Pro-style coloring, a few consistent roles across languages, driven by TextMate grammars, so code looks the same with or without a language server.
- `npm run dev` opens the demos in an Extension Development Host and rebuilds the Neutral variants on change.

## 0.4.11
- Dark themes: black terminal text is now readable, and bright black is one step lighter.
- Dark themes: sidebar, tab, panel, status bar, widget and input borders are lighter than the background, so panels separate visibly.
- Dark themes: comments and punctuation are brighter for better readability.
- Dark themes: search matches use a lighter fill with a solid border, so text inside a match stays readable.
- Ion Fusion: selection is a deeper blue so text inside it stays readable.
- CMakeCache values use the string color instead of a grey that looked like a comment.
- Light theme: borders are slightly darker, and git decoration, inactive tab and cursor colors have a bit more contrast.

## 0.4.10
- Chart, description, disabled, secondary button, renamed-file and status bar warning colors follow the palette, so extensions like git graphs and custom views match the theme.

## 0.4.9
- CMake: `${VAR}` references use the variable color, properties the property color, and bracket arguments the string color; CMakeCache keys and types are colored like other config files.
- Dockerfile (Container Tools): instruction arguments use plain text instead of the italic parameter color.
- Lua (LuaLS): standard library tables use the module color, `<const>` locals the constant color, and `self` and `goto` labels the parameter style.

## 0.4.8
- Sass/SCSS: map keys use the property color, `@use`/`@forward`/`@import` are italic like other imports, and `%placeholder` and `&__suffix` selectors use the class color.

## 0.4.7
- Even Better TOML: keys holding arrays or inline tables use the property color; table headers are bold blue.
- SQL: table and index names use the type color, data types are italic like other primitives, and table qualifiers use the module color.

## 0.4.6
- Retouched the README, added branding banner.
- Fixed Repo typos.

## 0.4.5
- Redone the showcase images.

## 0.4.4
- TOML keys use the property color, matching JSON and YAML.
- Markdown code blocks keep their language's colors instead of turning yellow.

## 0.4.3
- Python fields declared in a class body use the property color.

## 0.4.2
- C++ attributes (`[[nodiscard]]`) use the attribute color.
- C# `[Obsolete]` methods use the function color with strikethrough.

## 0.4.1
- C# events use the property color.
- C and C++ read-only variables use the constant color.

## 0.4.0
- Added **Ion Atom Fusion**, a near-black variant with cyan and pink accents.

## 0.3.12
- Renamed to **Ion Atom Theme** (`Ion Atom`, `Ion Atom Light`).
- Python constants use the constant color.

## 0.3.11
- Escapes, format placeholders and regex use amber.
- Light: module paths use burnt orange.

## 0.3.10
- Rust `static mut` uses the constant color with an underline.

## 0.3.9
- Rust `const` and `static` declarations use the constant color.

## 0.3.6 – 0.3.8
- Light: structs are sky blue, traits dark blue, enums teal, properties indigo.

## 0.3.1 – 0.3.5
- Themed context menus, menu bar, command palette and dropdowns.
- Light: background adjustments (kept `#f1f5fa`).

## 0.3.0
- Added **Ion Light**.

## 0.2.0 – 0.2.2
- New palette based on the ion atom: blue and red poles, with white and yellow.
- Module paths are orange; structs, traits and enums are spaced further apart.
- Muted bracket pair colors.

## 0.1.0 – 0.1.2
- Initial blue/cyan dark theme with a distinct color per token type.
