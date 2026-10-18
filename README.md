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

The production build is statically prerendered: `index.html`, hashed assets, images, favicon, and the resume are written to `.output/public/`. The site has no backend, API routes, or runtime environment variables, so any static host can serve it.

Node 24 is pinned in `.node-version`; the lockfile is `bun.lock`.

## Hosting

### Cloudflare Pages (free, static)

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `bun run build` (or `npm run build`) |
| Build output directory | `.output/public` |
| Environment variable | `NODE_VERSION=24` |

The build also emits `.output/server` and `wrangler.json` (Nitro's Cloudflare preset). Pages does not use them when the output directory is `.output/public`; no Workers are required. After the Pages deployment is verified, set `site.projects.cloud.hostingNote` in `src/config/site.ts` to "Current portfolio hosting: Cloudflare Pages".

### AWS ECS Fargate (documented project)

The same build was previously served by a Dockerized Flask application on Amazon ECS Fargate behind an Application Load Balancer, with images in Amazon ECR and logs in CloudWatch. See [FLASK_INTEGRATION.md](./FLASK_INTEGRATION.md) and the [cloud-devops-portfolio](https://github.com/ZaryaA101/cloud-devops-portfolio) repository.
