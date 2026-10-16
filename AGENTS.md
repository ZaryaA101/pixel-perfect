<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All external links/URLs live in src/config/site.ts; null hides the button. Why: owner edits links in one place and no URLs may be invented.
- No backend, auth, or database; frontend must stay statically exportable for Flask/AWS ECS hosting (see FLASK_INTEGRATION.md).
- Illustrations are hand-written SVG using theme CSS vars, not generated images. Why: keep it lightweight and on-palette.
