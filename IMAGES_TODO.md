# Images To Upload

This file tracks images that are referenced by the site but not yet available.
Each time a missing image is filed, the public site renders an
"Image Missing" placeholder in its place.

You can upload through the admin UI (preferred — stores in Supabase Storage),
or drop files into `public/images/...` and save the matching path in the
admin form.

---

## Squadron / Group Patches

Shown on the Leadership hub tiles (`/leadership`) and in the banner of each
unit detail page (`/leadership/<unit-slug>`).

Upload via **Admin → Squadrons → Edit → Squadron Patch** (or **Admin →
Settings → Group Patch** for the 937 TG group-level patch).

Recommended size: square PNG with transparent background, at least 256×256.

| Unit                            | Suggested filename                  | Where to save it                                          |
| ------------------------------- | ----------------------------------- | --------------------------------------------------------- |
| 937th Training Group            | `937tg.png`                         | Admin → Settings → Group Patch                            |
| 381st Training Squadron         | `381st.png`                         | Admin → Squadrons → 381st → Squadron Patch                |
| 382d Training Squadron          | `382d.png`                          | Admin → Squadrons → 382d → Squadron Patch                 |
| 383d Training Squadron          | `383d.png`                          | Admin → Squadrons → 383d → Squadron Patch                 |
| 937th Training Support Squadron | `937tss.png`                        | Admin → Squadrons → 937th Training Support Squadron → Squadron Patch |

If you upload through the admin UI, the file ends up in the Supabase `images`
bucket under the `squadrons/` prefix and the URL is saved to the DB
automatically.

If you prefer to drop files into the repo directly, save them at
`public/images/squadrons/<filename>.png` and paste
`/images/squadrons/<filename>.png` into the "Squadron Patch" URL field.

---

## Leader Portraits (Missing)

The following leaders currently have no `photo_url`. Upload via
**Admin → Leadership → Edit → Photo** to fix.

| Unit                      | Name              | Rank / Title                      |
| ------------------------- | ----------------- | --------------------------------- |
| 937th Training Group      | James Keller      | CMSgt — Senior Enlisted Leader    |
| 383d Training Squadron    | Fabrizio Lamarca  | CMSgt — Senior Enlisted Leader    |

Recommended: portrait orientation, object-top crop-friendly, around 800px tall.

---

## MTL Portraits

MTL profiles are managed at **Admin → MTLs**. Each profile has its own photo
slot — upload via the same form. MTLs without a photo render as an
"Image Missing" placeholder in the carousel and thumbnail strip.

Whenever you add a new MTL, assign them to a squadron via the **Unit**
dropdown on that form. The public `/mtls` hub and
`/mtls/<squadron-slug>` pages are driven entirely by this data — a squadron
with zero active MTLs won't appear as a tile.

---

## How "Image Missing" placeholders behave

Anywhere a patch or portrait is missing, the UI renders a dashed-bordered
grey box with an "Image Missing" label (see
`src/components/shared/missing-image.tsx`). Once the image is set in admin,
the placeholder disappears on the next page load.
