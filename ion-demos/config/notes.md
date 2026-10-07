# Carrier Dashboard

Backend and plugin for **fleet carrier** events, with _market data_ on top.

## Setup

1. Install the plugin into EDMC.
2. Set the API token in `Settings`.
3. Restart and check the [status page](https://example.com/status).

> Market data is only sent for fleet carriers.

```rust
const MAX_ITEMS: usize = 64;
```

| Field     | Type   | Notes            |
|-----------|--------|------------------|
| callsign  | string | `XXX-XXX`        |
| jumpsLeft | int    | ~~deprecated~~   |

- [x] Carrier events
- [ ] Squadron support
