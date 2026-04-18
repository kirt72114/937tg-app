import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { getPageBySlug, getPublishedPages } from "@/lib/actions/pages";

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

export async function generateStaticParams() {
  const pages = await getPublishedPages();
  return pages
    .filter((p) => p.pageType !== "external_link")
    .map((p) => ({ slug: p.slug }));
}

const proseClasses =
  "prose prose-sm max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-military-blue [&_blockquote]:bg-military-blue/5 [&_blockquote]:pl-4 [&_blockquote]:pr-4 [&_blockquote]:py-3 [&_blockquote]:my-4 [&_blockquote]:rounded-r-md [&_blockquote_p]:my-0 [&_a]:text-military-blue [&_a]:underline [&_a]:font-medium [&_hr]:my-6 [&_hr]:border-t [&_hr]:border-border [&_img]:rounded-lg [&_img]:border [&_img]:my-4 [&_img]:max-w-full [&_code]:bg-muted [&_code]:rounded [&_code]:px-1 [&_code]:text-xs [&_pre]:bg-muted [&_pre]:rounded [&_pre]:p-3 [&_pre]:text-xs [&_pre]:overflow-x-auto [&_strong]:font-semibold";

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

  const html =
    page.content && typeof page.content === "object" && "html" in page.content
      ? String((page.content as { html?: unknown }).html ?? "")
      : "";

  return (
    <div>
      <PageHeader
        title={page.title}
        description={page.metaDescription ?? undefined}
      />
      <div className="mx-auto max-w-4xl px-4 py-8">
        {html ? (
          <article
            className={proseClasses}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            This page has no content yet.
          </p>
        )}
      </div>
    </div>
  );
}
