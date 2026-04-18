"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ArrowLeft, Save, Eye, Globe } from "lucide-react";
import Link from "next/link";
import {
  getPageById,
  createPage,
  updatePage,
} from "@/lib/actions/pages";
import type { PageType } from "@prisma/client";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPageEditorPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const pageId = params.id;
  const isNew = pageId === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [content, setContent] = useState("");
  const [pageType, setPageType] = useState<PageType>("dynamic");
  const [externalUrl, setExternalUrl] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    if (isNew) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const page = await getPageById(pageId);
        if (!page) {
          setError("Page not found");
          return;
        }
        setTitle(page.title);
        setSlug(page.slug);
        setSlugManuallyEdited(true);
        setContent(
          typeof page.content === "object" &&
            page.content !== null &&
            "html" in page.content
            ? String((page.content as { html: string }).html)
            : ""
        );
        setPageType(page.pageType);
        setExternalUrl(page.externalUrl || "");
        setMetaDescription(page.metaDescription || "");
        setIsPublished(page.isPublished);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [pageId, isNew]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value);
    setSlugManuallyEdited(true);
  }

  async function handleSave() {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      if (isNew) {
        const page = await createPage({
          title,
          slug,
          content: content || undefined,
          metaDescription: metaDescription || undefined,
          pageType,
          externalUrl: externalUrl || undefined,
          isPublished,
        });
        router.push(`/admin/pages/${page.id}`);
      } else {
        await updatePage(pageId, {
          title,
          slug,
          content,
          metaDescription,
          pageType,
          externalUrl: externalUrl || undefined,
          isPublished,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save page. The slug may already be in use."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/pages">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isNew ? "New Page" : "Edit Page"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {title || "Untitled"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && slug && (
            <Button variant="outline" size="sm" asChild>
              <Link href={`/${slug}`} target="_blank">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Link>
            </Button>
          )}
          <Button size="sm" onClick={handleSave} disabled={saving || !title}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : isNew ? "Create Page" : "Save"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Page title"
                />
              </div>
              {pageType !== "external_link" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Content</label>
                  <RichTextEditor
                    content={content}
                    onChange={setContent}
                    placeholder="Write your page content here..."
                  />
                </div>
              )}
              {pageType === "external_link" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">External URL *</label>
                  <Input
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    Users visiting this page will be redirected to the external URL.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge variant={isPublished ? "success" : "secondary"}>
                  {isPublished ? "Published" : "Draft"}
                </Badge>
              </div>
              <Button
                variant={isPublished ? "outline" : "default"}
                className="w-full"
                onClick={() => setIsPublished(!isPublished)}
              >
                <Globe className="h-4 w-4 mr-2" />
                {isPublished ? "Unpublish" : "Publish"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Changes take effect after clicking Save.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Slug</label>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">/</span>
                  <Input
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="page-slug"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  URL path. Must be unique.
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Page Type</label>
                <select
                  value={pageType}
                  onChange={(e) => setPageType(e.target.value as PageType)}
                  className={selectClasses}
                >
                  <option value="static">Static</option>
                  <option value="dynamic">Dynamic (CMS)</option>
                  <option value="external_link">External Link</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief description for search engines..."
                  rows={3}
                  className={`${selectClasses} h-auto resize-y`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
