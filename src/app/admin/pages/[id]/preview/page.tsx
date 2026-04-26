import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { PageBlocks } from "@/components/public/blocks/page-blocks";
import { normalizeBlocks } from "@/lib/content-blocks";
import { getPageById } from "@/lib/actions/pages";

export const dynamic = "force-dynamic";

export const metadata = { title: "Preview" };

export default async function AdminPagePreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await getPageById(id);
  if (!page) notFound();

  const blocks = normalizeBlocks(page.content);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={page.title}
        description={page.metaDescription ?? undefined}
      />
      <PageBlocks blocks={blocks} />
    </div>
  );
}
