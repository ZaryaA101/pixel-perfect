## Project rules
- All external links/URLs live in src/config/site.ts; null hides the button. Why: owner edits links in one place and no URLs may be invented.
- No backend, auth, or database; frontend must stay statically exportable for Flask/AWS ECS hosting (see FLASK_INTEGRATION.md).
- Technical diagrams use theme CSS variables; other project visuals use structured technical text. Why: communicate actual architecture without invented product imagery.
- Owner-supplied portrait and resume are source-controlled in public/ and referenced through site configuration. Why: Flask/Docker exports must serve them independently of hosted asset services.
