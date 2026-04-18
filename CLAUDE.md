@AGENTS.md

# TODO

## Future Improvements
- [ ] **Page Editor Enhancements** — Circle back and improve the rich-text page editor (`src/components/admin/rich-text-editor.tsx`). Ideas: table support, embed blocks (YouTube/video), better image sizing/alignment controls, drag-to-reorder sections, markdown import/export, revision history, page preview mode.

## Pending Migrations (hardcoded pages → CMS)
- [x] **12 prose pages** → Seeded in `prisma/seed-pages.sql`, hardcoded routes deleted
- [x] **Leadership Programs page** → RopeProgram wired at `/leadership-programs`, admin at `/admin/rope-programs`
- [x] **Schedule pages** → `/dfac-hours` and `/shuttle` read from Schedule model; seed defaults available in schedules admin
- [x] **AFSC page** → New `Afsc` model (run `prisma/migration-afscs.sql`), admin at `/admin/afscs`
