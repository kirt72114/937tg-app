import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { PageBlocks } from "@/components/public/blocks/page-blocks";
import { normalizeBlocks } from "@/lib/content-blocks";
import { getPageBySlug } from "@/lib/actions/pages";

// Render each page on-demand. Prerendering every slug at build time would
// fight the Supabase pooler's per-session connection limit (15) alongside
// the other route that prerenders (/links/[slug]).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page || !page.isPublished) return {};
  return {
    title: page.title,
    description: page.metaDescription ?? undefined,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page || !page.isPublished) notFound();

  if (page.pageType === "external_link" && page.externalUrl) {
    redirect(page.externalUrl);
  }

  const blocks = normalizeBlocks(page.content);

  return (
    <div>
      <PageHeader
        title={page.title}
        description={page.metaDescription ?? undefined}
      />
      <PageBlocks blocks={blocks} />
    </div>
  );
}
