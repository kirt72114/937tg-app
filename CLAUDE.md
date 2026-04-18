@AGENTS.md

# TODO

## Future Improvements
- [ ] **Page Editor Enhancements** — Circle back and improve the rich-text page editor (`src/components/admin/rich-text-editor.tsx`). Ideas: table support, embed blocks (YouTube/video), better image sizing/alignment controls, drag-to-reorder sections, markdown import/export, revision history, page preview mode.

## Pending Migrations (hardcoded pages → CMS)
- [ ] **12 prose pages** → Seed as Pages CMS entries, delete hardcoded routes: ait-guide, in-processing, out-processing, route-of-march, saferep, spartan-flight, adc, finance, efmp, jbsa-connect, military-onesource, metc
- [ ] **Leadership Programs page** → Wire existing RopeProgram Prisma model for /leadership-programs (server actions + admin page + rewire public page)
- [ ] **Schedule pages** → Wire existing Schedule model for /dfac-hours and /shuttle (seed default schedules + rewire public pages)
- [ ] **AFSC page** → New Prisma model + server actions + admin page + rewire /afscs public page
