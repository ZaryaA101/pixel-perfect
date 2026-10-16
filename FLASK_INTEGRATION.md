# Serving this portfolio from Flask

The site is a single static page. No backend, database, auth, or secrets.

## Edit links
All URLs (GitHub profile, repos, live demos, resume) live in `src/config/site.ts`.
A `null` value hides or disables the matching button. The exact uploaded resume is included at `public/Zarya_Amin_Resume.pdf`; the optimized graduation photograph is included at `public/images/Zarya_Amin_Graduation.webp`. Neither depends on Lovable hosting.

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

## Include the resume and portrait in Flask and Docker

Keep the resume URL exactly `/Zarya_Amin_Resume.pdf`. Copy the two local public assets into your Flask app, alongside the built client assets:

```
app/
  templates/index.html
  static/assets/...
  static/images/Zarya_Amin_Graduation.webp
  static/Zarya_Amin_Resume.pdf
```

With the existing `/assets` static URL configuration above, add these fixed-file handlers to your Flask application (not to this frontend):

```python
from pathlib import Path
from flask import send_from_directory

@app.route("/Zarya_Amin_Resume.pdf")
def resume():
    return send_from_directory(
        Path(app.root_path) / "static",
        "Zarya_Amin_Resume.pdf",
        mimetype="application/pdf",
        as_attachment=True,
        download_name="Zarya_Amin_Resume.pdf",
    )

@app.route("/images/Zarya_Amin_Graduation.webp")
def graduation_photo():
    return send_from_directory(
        Path(app.root_path) / "static" / "images",
        "Zarya_Amin_Graduation.webp",
        mimetype="image/webp",
    )
```

Use your existing Flask instance name if it is not `app`. Vite copies `public/` files into its client output; retain these files when exporting, not only the `assets/` directory. Include the populated Flask `static/` folder in your **final** production Docker stage (`COPY static/ ./static/`, assuming that layout), and ensure `.dockerignore` does not exclude PDF or image files. Do not depend on development-only mounts.

After rebuilding and deploying the image, check `/Zarya_Amin_Resume.pdf` returns `200`, `Content-Type: application/pdf`, and `Content-Disposition: attachment`. Download it and compare its SHA-256 with the original: `f01accf84a037eddda55587632c4c566d09474df054cecde54645268bd21811f`. Check `/images/Zarya_Amin_Graduation.webp` returns the photo. Test the resume button in desktop and mobile browsers. Production Flask/Docker/ECS cannot be verified from this frontend repository alone.
