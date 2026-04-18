@AGENTS.md

# TODO

## Future Improvements
- [ ] **Page Editor Enhancements** — Circle back and improve the rich-text page editor (`src/components/admin/rich-text-editor.tsx`). Ideas: table support, embed blocks (YouTube/video), better image sizing/alignment controls, drag-to-reorder sections, markdown import/export, revision history, page preview mode.

## Pending Migrations (hardcoded pages → CMS)
- [x] **12 prose pages** → Seeded in `prisma/seed-pages.sql`, hardcoded routes deleted
- [ ] **Leadership Programs page** → Wire existing RopeProgram Prisma model for /leadership-programs (server actions + admin page + rewire public page)
- [ ] **Schedule pages** → Wire existing Schedule model for /dfac-hours and /shuttle (seed default schedules + rewire public pages)
- [ ] **AFSC page** → New Prisma model + server actions + admin page + rewire /afscs public page
