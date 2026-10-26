<p align="center">
  <img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/banner.png" alt="Ion Atom Theme" width="100%">
</p>

<p align="center">
  A blue/red blend theme with some sparkles on top.<br>
  One Dark Pro does this really well, so I took some inspiration from it.
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/ion-overlay.png" alt="Ion Atom, Fusion and Light side by side" width="70%">
</p>

## Variants

<table>
  <tr>
    <th>Ion Atom</th>
    <th>Ion Atom Fusion</th>
    <th>Ion Atom Light</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/ion-dark.png" alt="Ion Atom"></td>
    <td><img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/ion-fusion.png" alt="Ion Atom Fusion"></td>
    <td><img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/ion-light.png" alt="Ion Atom Light"></td>
  </tr>
  <tr>
    <td>The original dark variant.</td>
    <td>Near-black with cyan and pink. Vibrant enough for some sunlight.</td>
    <td>For bright rooms.</td>
  </tr>
</table>

### Neutral variants

An ion is a charged atom; a neutral one has its charge balanced out. **Ion Atom Neutral**, **Ion Atom Neutral Light** and **Ion Atom Neutral Fusion** use the same palettes, but color code the way One Dark Pro does: a small set of roles (keywords, functions, types, strings, constants, variables, properties) applied the same way in every language.

Neutral relies on TextMate grammars rather than language servers, so code looks the same with or without one running. Language servers still add detail where the grammar has none, but always in the same role colors. Only comments, parameters and `this`/`self` are italic, and only named constants and enum members are bold.

<table>
  <tr>
    <th>Ion Atom Neutral</th>
    <th>Ion Atom Neutral Fusion</th>
    <th>Ion Atom Neutral Light</th>
  </tr>
  <tr>
    <td><img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/ion-neutral-dark.png" alt="Ion Atom Neutral"></td>
    <td><img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/ion-neutral-fusion.png" alt="Ion Atom Neutral Fusion"></td>
    <td><img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/ion-neutral-light.png" alt="Ion Atom Neutral Light"></td>
  </tr>
</table>

## Supported languages

The theme is tuned for these languages:  
- `Rust` with [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- `C` / `C#` / `C++` with [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) & [C#](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- `Python` with [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- `Lua` with [Lua](https://marketplace.visualstudio.com/items?itemName=sumneko.lua)
- `Svelte` with [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- `TypeScript`

Some tweaks were also done for:  
- `TOML` with [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)
- `CSS`/`SCSS` with [Some Sass](https://marketplace.visualstudio.com/items?itemName=SomewhatStationery.some-sass)
- `Docker` with [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- `CMake` with [CMake](https://marketplace.visualstudio.com/items?itemName=twxs.cmake)
- `HTML`
- `Markdown`
- `SQL`
- `JSON`
- `YAML`

For maximum usage, use the appropriate language servers.  
These are listed next to the supported languages.

## Fonts

Ion uses italic and bold a lot to tell similar tokens apart, so a font with real italics helps. I go with `JetBrains Mono`, but `Cascadia Code` works too.

## Install

Search for **Ion Atom Theme** in the Extensions view, then pick a variant with **Preferences: Color Theme**.

To follow your OS light/dark mode:

```jsonc
"window.autoDetectColorScheme": true,
"workbench.preferredDarkColorTheme": "Ion Atom OR Ion Atom Fusion",
"workbench.preferredLightColorTheme": "Ion Atom Light"
```

## Development

```bash
npm run dev
```

This opens `ion-demos` in an Extension Development Host with the theme loaded, and rebuilds the Neutral variants whenever a base theme changes. Pick a theme there with **Preferences: Color Theme**; if an edit doesn't show up, run **Developer: Reload Window**. You can also start the host with **F5** (the *Run Ion themes* launch config).

The Neutral themes are generated from the base themes by `scripts/build-neutral.mjs`, so edit the base themes or that script, not the `ion-neutral-*` files. `npm run build:neutral` rebuilds them once, and packaging runs it automatically.

## License

Released under the [GPL-3.0 license](LICENSE).