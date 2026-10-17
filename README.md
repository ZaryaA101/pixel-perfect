# Zarya Amin | Software & Cloud Engineering

Personal portfolio showcasing software engineering, full-stack development, and cloud infrastructure projects.

## Development

Install the locked dependencies and start the local preview:

```sh
bun install --frozen-lockfile
bun run dev
```

## Validation and production build

```sh
bun run test
bun run build
```

The production build is statically prerendered to `.output/public/` for serving through the Flask application.
