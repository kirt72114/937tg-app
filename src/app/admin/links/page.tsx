"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import {
  Plus,
  X,
  ExternalLink,
  ArrowLeft,
  Link as LinkIcon,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllCollections,
  getCollectionWithItems,
  createCollection,
  updateCollection,
  deleteCollection,
  reorderCollection,
  createLinkItem,
  updateLinkItem,
  deleteLinkItem,
  reorderLinkItem,
  seedFooterCollections,
  FOOTER_SLUGS,
} from "@/lib/actions/links";

type Collection = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  sortOrder: number;
  _count: { items: number };
};

type LinkItem = {
  id: string;
  collectionId: string;
  title: string;
  url: string;
  description: string | null;
  icon: string | null;
  sortOrder: number;
};

type CollectionForm = {
  title: string;
  slug: string;
  description: string;
};

type LinkForm = {
  title: string;
  url: string;
  description: string;
  icon: string;
};

const emptyCollectionForm: CollectionForm = { title: "", slug: "", description: "" };
const emptyLinkForm: LinkForm = { title: "", url: "", description: "", icon: "" };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ─── Collections List View ────────────────────────────

const collectionColumns = [
  {
    key: "title",
    header: "Collection",
    render: (item: Collection) => (
      <div className="flex items-center gap-2">
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{item.title}</span>
      </div>
    ),
  },
  {
    key: "slug",
    header: "Slug",
    render: (item: Collection) => (
      <span className="font-mono text-xs text-muted-foreground">{item.slug}</span>
    ),
  },
  {
    key: "_count",
    header: "Links",
    render: (item: Collection) => (
      <Badge variant="outline">{item._count.items}</Badge>
    ),
    className: "w-20",
  },
  {
    key: "description",
    header: "Description",
    render: (item: Collection) => (
      <span className="text-sm text-muted-foreground line-clamp-1">
        {item.description || "—"}
      </span>
    ),
  },
];

// ─── Link Items View ──────────────────────────────────

const linkColumns = [
  {
    key: "title",
    header: "Title",
    render: (item: LinkItem) => (
      <div className="flex items-center gap-2">
        <LinkIcon className="h-4 w-4 text-blue-500" />
        <span className="font-medium">{item.title}</span>
      </div>
    ),
  },
  {
    key: "url",
    header: "URL",
    render: (item: LinkItem) => (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-xs text-blue-600 hover:underline truncate max-w-[300px] inline-block"
      >
        {item.url}
      </a>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (item: LinkItem) => (
      <span className="text-sm text-muted-foreground line-clamp-1">
        {item.description || "—"}
      </span>
    ),
  },
];

export default function AdminLinksPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Collection form state
  const [collectionForm, setCollectionForm] = useState<CollectionForm>(emptyCollectionForm);
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [showCollectionForm, setShowCollectionForm] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  // Detail view state
  const [activeCollection, setActiveCollection] = useState<{
    id: string;
    title: string;
    slug: string;
    description: string | null;
  } | null>(null);
  const [linkItems, setLinkItems] = useState<LinkItem[]>([]);

  // Link item form state
  const [linkForm, setLinkForm] = useState<LinkForm>(emptyLinkForm);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [showLinkForm, setShowLinkForm] = useState(false);

  async function loadCollections() {
    const items = await getAllCollections();
    setCollections(items as Collection[]);
    setLoading(false);
  }

  async function loadCollectionDetail(id: string) {
    const data = await getCollectionWithItems(id);
    if (data) {
      setActiveCollection({
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
      });
      setLinkItems(data.items as LinkItem[]);
    }
  }

  useEffect(() => {
    loadCollections();
  }, []);

  // ─── Collection CRUD ──────────────────────────────────

  function openCreateCollection() {
    setCollectionForm(emptyCollectionForm);
    setEditingCollectionId(null);
    setSlugManual(false);
    setShowCollectionForm(true);
  }

  function openEditCollection(item: Collection) {
    setCollectionForm({
      title: item.title,
      slug: item.slug,
      description: item.description || "",
    });
    setEditingCollectionId(item.id);
    setSlugManual(true);
    setShowCollectionForm(true);
  }

  function closeCollectionForm() {
    setShowCollectionForm(false);
    setEditingCollectionId(null);
    setCollectionForm(emptyCollectionForm);
  }

  function handleCollectionTitleChange(value: string) {
    setCollectionForm((prev) => ({
      ...prev,
      title: value,
      slug: slugManual ? prev.slug : slugify(value),
    }));
  }

  async function handleSaveCollection() {
    if (!collectionForm.title || !collectionForm.slug) return;
    setSaving(true);
    try {
      if (editingCollectionId) {
        await updateCollection(editingCollectionId, {
          title: collectionForm.title,
          slug: collectionForm.slug,
          description: collectionForm.description || undefined,
        });
      } else {
        await createCollection({
          title: collectionForm.title,
          slug: collectionForm.slug,
          description: collectionForm.description || undefined,
        });
      }
      closeCollectionForm();
      await loadCollections();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to save. The slug may already be in use."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteCollection(item: Collection) {
    if (
      !confirm(
        `Delete "${item.title}" and all its links? This cannot be undone.`
      )
    )
      return;
    await deleteCollection(item.id);
    loadCollections();
  }

  async function handleMoveCollection(item: Collection, direction: "up" | "down") {
    await reorderCollection(item.id, direction);
    await loadCollections();
  }

  async function handleSeedFooter() {
    setSaving(true);
    try {
      const result = await seedFooterCollections();
      if (result.collectionsAdded === 0) {
        alert(
          "Footer collections already exist. Edit them below to change the footer link columns."
        );
      } else {
        alert(
          `Created ${result.collectionsAdded} footer collection(s) with ${result.itemsAdded} link(s). They now drive the public footer.`
        );
      }
      await loadCollections();
    } finally {
      setSaving(false);
    }
  }

  // ─── Link Item CRUD ───────────────────────────────────

  function openCreateLink() {
    setLinkForm(emptyLinkForm);
    setEditingLinkId(null);
    setShowLinkForm(true);
  }

  function openEditLink(item: LinkItem) {
    setLinkForm({
      title: item.title,
      url: item.url,
      description: item.description || "",
      icon: item.icon || "",
    });
    setEditingLinkId(item.id);
    setShowLinkForm(true);
  }

  function closeLinkForm() {
    setShowLinkForm(false);
    setEditingLinkId(null);
    setLinkForm(emptyLinkForm);
  }

  async function handleSaveLink() {
    if (!linkForm.title || !linkForm.url || !activeCollection) return;
    setSaving(true);
    try {
      if (editingLinkId) {
        await updateLinkItem(editingLinkId, {
          title: linkForm.title,
          url: linkForm.url,
          description: linkForm.description || undefined,
          icon: linkForm.icon || undefined,
        });
      } else {
        await createLinkItem({
          collectionId: activeCollection.id,
          title: linkForm.title,
          url: linkForm.url,
          description: linkForm.description || undefined,
          icon: linkForm.icon || undefined,
        });
      }
      closeLinkForm();
      await loadCollectionDetail(activeCollection.id);
      await loadCollections();
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteLink(item: LinkItem) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    await deleteLinkItem(item.id);
    if (activeCollection) {
      loadCollectionDetail(activeCollection.id);
      loadCollections();
    }
  }

  async function handleMoveLink(item: LinkItem, direction: "up" | "down") {
    await reorderLinkItem(item.id, direction);
    if (activeCollection) await loadCollectionDetail(activeCollection.id);
  }

  if (loading) return <div className="p-6">Loading...</div>;

  // ─── Detail View (single collection) ─────────────────

  if (activeCollection) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setActiveCollection(null);
                setShowLinkForm(false);
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{activeCollection.title}</h1>
              <p className="text-sm text-muted-foreground">
                {activeCollection.description || `Manage links in this collection`}
              </p>
            </div>
          </div>
          <Button onClick={openCreateLink}>
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>

        {showLinkForm && (
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">
                {editingLinkId ? "Edit Link" : "Add New Link"}
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeLinkForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Title *</label>
                  <Input
                    value={linkForm.title}
                    onChange={(e) =>
                      setLinkForm({ ...linkForm, title: e.target.value })
                    }
                    placeholder="e.g. TRICARE Online"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">URL *</label>
                  <Input
                    value={linkForm.url}
                    onChange={(e) =>
                      setLinkForm({ ...linkForm, url: e.target.value })
                    }
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Description</label>
                <Input
                  value={linkForm.description}
                  onChange={(e) =>
                    setLinkForm({ ...linkForm, description: e.target.value })
                  }
                  placeholder="Brief description of this link"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSaveLink}
                  disabled={saving || !linkForm.title || !linkForm.url}
                >
                  {saving
                    ? "Saving..."
                    : editingLinkId
                      ? "Update Link"
                      : "Add Link"}
                </Button>
                <Button variant="outline" onClick={closeLinkForm}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <DataTable
          columns={linkColumns}
          data={linkItems}
          onEdit={openEditLink}
          onDelete={handleDeleteLink}
          onMoveUp={(item) => handleMoveLink(item, "up")}
          onMoveDown={(item) => handleMoveLink(item, "down")}
          emptyMessage="No links in this collection yet. Click 'Add Link' to create one."
        />
      </div>
    );
  }

  // ─── Collections List View ────────────────────────────

  const hasFooterCollections = collections.some(
    (c) => c.slug === FOOTER_SLUGS.quick || c.slug === FOOTER_SLUGS.resources
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Link Collections</h1>
          <p className="text-sm text-muted-foreground">
            Manage grouped links. Each collection is browsable at{" "}
            <span className="font-mono">/links/&lt;slug&gt;</span>.
          </p>
        </div>
        <div className="flex gap-2">
          {!hasFooterCollections && (
            <Button variant="outline" onClick={handleSeedFooter} disabled={saving}>
              <Sparkles className="h-4 w-4 mr-2" />
              Seed Footer Defaults
            </Button>
          )}
          <Button onClick={openCreateCollection}>
            <Plus className="h-4 w-4 mr-2" />
            Add Collection
          </Button>
        </div>
      </div>

      <Card className="mb-6 border-dashed">
        <CardContent className="p-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Reserved slugs:</span>{" "}
          collections with slug{" "}
          <span className="font-mono">{FOOTER_SLUGS.quick}</span> and{" "}
          <span className="font-mono">{FOOTER_SLUGS.resources}</span> drive
          the two link columns in the public site footer. Their{" "}
          <em>title</em> becomes the column heading. If they don&rsquo;t exist,
          the footer shows hardcoded defaults.
        </CardContent>
      </Card>

      {showCollectionForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingCollectionId ? "Edit Collection" : "Add New Collection"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={closeCollectionForm}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={collectionForm.title}
                  onChange={(e) => handleCollectionTitleChange(e.target.value)}
                  placeholder="e.g. Medical Resources"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Slug *</label>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">/links/</span>
                  <Input
                    value={collectionForm.slug}
                    onChange={(e) => {
                      setSlugManual(true);
                      setCollectionForm({ ...collectionForm, slug: e.target.value });
                    }}
                    placeholder="medical-resources"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={collectionForm.description}
                onChange={(e) =>
                  setCollectionForm({
                    ...collectionForm,
                    description: e.target.value,
                  })
                }
                placeholder="Brief description of this collection"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSaveCollection}
                disabled={
                  saving || !collectionForm.title || !collectionForm.slug
                }
              >
                {saving
                  ? "Saving..."
                  : editingCollectionId
                    ? "Update Collection"
                    : "Add Collection"}
              </Button>
              <Button variant="outline" onClick={closeCollectionForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable
        columns={collectionColumns}
        data={collections}
        onEdit={(item) => loadCollectionDetail(item.id)}
        onDelete={handleDeleteCollection}
        onMoveUp={(item) => handleMoveCollection(item, "up")}
        onMoveDown={(item) => handleMoveCollection(item, "down")}
        emptyMessage="No link collections yet. Click 'Add Collection' to create one."
      />
    </div>
  );
}
