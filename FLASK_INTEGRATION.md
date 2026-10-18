# Serving this portfolio from Flask

> **Hosting transition:** The Flask/Docker deployment on AWS ECS Fargate was a real, working deployment and is kept as a documented project. The site is being moved to Cloudflare Pages as static files (see the README); this document describes the Flask integration that was used on AWS.

The portfolio is a single-page React application. It has no backend, database, authentication, or secrets.

## Links and source ownership

Portfolio URLs are configured in `src/config/site.ts`; `null` hides or disables a button. The GitHub profile and the Cloud Portfolio and FlightSight repositories are set to their verified URLs. Live-demo URLs remain unset until supplied.

The site was originally generated with Lovable. The repository has since been disconnected from Lovable and is maintained directly in GitHub; keep link and build changes in source control and do not hand-edit generated HTML or bundles. The Lovable TanStack build configuration (`@lovable.dev/vite-tanstack-config`) is still a build dependency.

## Build static files

`vite.config.ts` enables TanStack Start prerendering for `/` and disables link crawling, so the resume URL is not mistaken for another page. Build with the existing Bun lockfile:

```bash
bun install --frozen-lockfile
bun run test
bun run build
```

The production HTML and client assets are written to `.output/public/`. `index.html` is server-rendered and includes the JavaScript and CSS references needed for client hydration. Copy that HTML and the required public files; do not copy `.output/server/` into Flask.

## Flask and Docker layout

```text
templates/index.html
static/
  assets/...
  images/Zarya_Amin_Graduation.webp
  Zarya_Amin_Resume.pdf
  favicon.ico
  robots.txt
```

Configure Flask with `static_folder="static"` and `static_url_path=""` to preserve the root-relative `/assets/...`, `/images/...`, and `/favicon.ico` paths in the generated page. Render `templates/index.html` at `/` and serve `/Zarya_Amin_Resume.pdf` with `send_from_directory(..., as_attachment=True, download_name="Zarya_Amin_Resume.pdf")`.

The resume and optimized graduation photo are included under `public/`; the exact PDF SHA-256 is `f01accf84a037eddda55587632c4c566d09474df054cecde54645268bd21811f`. Include the populated `templates/` and `static/` directories in the production Docker image, and do not exclude these assets in `.dockerignore`. Node/Bun and the React dev server are not needed in the runtime image.

After building the image, verify that `/` returns the prerendered page, JavaScript/CSS and the graduation photo load, and `/Zarya_Amin_Resume.pdf` returns `200`, `Content-Type: application/pdf`, and `Content-Disposition: attachment`.
