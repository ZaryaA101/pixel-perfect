# Serving this portfolio from Flask

The site is a single static page. No backend, database, auth, or secrets.

## Edit links
All URLs (GitHub profile, repos, live demos, resume) live in `src/config/site.ts`.
A `null` value hides or disables the matching button. Put your resume PDF in `public/`.

## Build static files
```bash
bun install          # or npm install
bun run build        # outputs to dist/ (client assets under dist/client)
```
Then open the built page once (e.g. `bunx vite preview`), save the rendered `index.html`,
or prerender `/` — and copy the client assets folder.

## Flask layout
```
app/
  templates/index.html      <- built HTML
  static/assets/...         <- built JS/CSS from dist/client/assets
```
```python
@app.route("/")
def home():
    return render_template("index.html")
```
Point Flask's static URL at `/assets` (`Flask(__name__, static_url_path="/assets", static_folder="static/assets")`)
so asset paths in the HTML resolve unchanged, or set Vite `base` to `/static/` before building.

The React dev server is never used in production. Your existing Docker → ECR → ECS
pipeline is unchanged; just rebuild the image with the new files.
