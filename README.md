<p align="center">
  <img src="https://raw.githubusercontent.com/Saniee/Ion-Atom-Theme/main/images/banner.png" alt="Ion Atom Theme" width="100%">
</p>

<p align="center">
  Inspired by how atoms are drawn: a blue/red blend with some sparkles on top.<br>
  Every kind of token gets its own color, so you can tell a variable from a function at a glance.<br>
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

I mostly write Rust, C, C++, C#, Python and Svelte with TypeScript, so the theme is tuned for those. JSON, YAML, TOML, CSS/SCSS, HTML and Markdown are covered too.

Run your language server (rust-analyzer, Pylance, the C/C++ or C# extension) for the full set of colors.

## Fonts

Ion uses italic and bold a lot to tell similar tokens apart, so a font with real italics helps. I go with JetBrains Mono, but Cascadia Code works too.

## Install

Search for **Ion Atom Theme** in the Extensions view, then pick a variant with **Preferences: Color Theme**.

To follow your OS light/dark mode:

```jsonc
"window.autoDetectColorScheme": true,
"workbench.preferredDarkColorTheme": "Ion Atom",
"workbench.preferredLightColorTheme": "Ion Atom Light"
```

## License

Released under the [GPL-3.0 license](LICENSE).