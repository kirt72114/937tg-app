"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Pin, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/lib/actions/announcements";

type Announcement = {
  id: string;
  title: string;
  content: unknown;
  priority: string;
  isPinned: boolean;
  publishDate: Date;
  expireDate: Date | null;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type FormData = {
  title: string;
  content: string;
  priority: string;
  isPinned: boolean;
  expireDate: string;
};

const emptyForm: FormData = {
  title: "",
  content: "",
  priority: "normal",
  isPinned: false,
  expireDate: "",
};

function formatDate(date: Date | null): string {
  if (!date) return "\u2014";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const columns = [
  {
    key: "title",
    header: "Title",
    render: (item: Announcement) => (
      <div className="flex items-center gap-2">
        {item.isPinned && <Pin className="h-3 w-3 text-military-gold" />}
        <span className="font-medium">{item.title}</span>
      </div>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    render: (item: Announcement) => {
      const v = {
        normal: "secondary" as const,
        important: "warning" as const,
        urgent: "destructive" as const,
      };
      return (
        <Badge variant={v[item.priority as keyof typeof v]}>
          {item.priority}
        </Badge>
      );
    },
    className: "w-28",
  },
  {
    key: "publishDate",
    header: "Published",
    render: (item: Announcement) => formatDate(item.publishDate),
    className: "w-32",
  },
  {
    key: "expireDate",
    header: "Expires",
    render: (item: Announcement) => formatDate(item.expireDate),
    className: "w-32",
  },
];

export default function AdminAnnouncementsPage() {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadData() {
    const items = await getAllAnnouncements();
    setData(items);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(item: Announcement) {
    setForm({
      title: item.title,
      content:
        typeof item.content === "object" &&
        item.content !== null &&
        "html" in item.content
          ? String((item.content as { html: string }).html)
          : "",
      priority: item.priority,
      isPinned: item.isPinned,
      expireDate: item.expireDate
        ? new Date(item.expireDate).toISOString().split("T")[0]
        : "",
    });
    setEditingId(item.id);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (!form.title) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateAnnouncement(editingId, {
          title: form.title,
          content: form.content || undefined,
          priority: form.priority as "normal" | "important" | "urgent",
          isPinned: form.isPinned,
          expireDate: form.expireDate ? new Date(form.expireDate) : null,
        });
      } else {
        await createAnnouncement({
          title: form.title,
          content: form.content || undefined,
          priority: form.priority as "normal" | "important" | "urgent",
          isPinned: form.isPinned,
          expireDate: form.expireDate ? new Date(form.expireDate) : undefined,
        });
      }
      closeForm();
      await loadData();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Announcement) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    await deleteAnnouncement(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-sm text-muted-foreground">
            Manage announcements for the home page.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Announcement" : "Create Announcement"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title *</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Announcement title"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={4}
                placeholder="Announcement content (HTML supported)..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Expire Date</label>
                <Input
                  type="date"
                  value={form.expireDate}
                  onChange={(e) => setForm({ ...form, expireDate: e.target.value })}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPinned}
                    onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="font-medium">Pin to top</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving || !form.title}>
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Announcement"
                    : "Create Announcement"}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable
        columns={columns}
        data={data}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
