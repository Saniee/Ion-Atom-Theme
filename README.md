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

## License

Released under the [GPL-3.0 license](LICENSE).