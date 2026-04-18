"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Search, X, Sparkles, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllAfscs,
  createAfsc,
  updateAfsc,
  deleteAfsc,
  reorderAfsc,
  seedDefaultAfscs,
} from "@/lib/actions/afscs";

type Afsc = {
  id: string;
  code: string;
  title: string;
  description: string | null;
  duration: string | null;
  sortOrder: number;
  isActive: boolean;
};

type FormState = {
  code: string;
  title: string;
  description: string;
  duration: string;
  isActive: boolean;
};

const emptyForm: FormState = {
  code: "",
  title: "",
  description: "",
  duration: "",
  isActive: true,
};

const textareaClasses =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]";

const columns = [
  {
    key: "code",
    header: "Code",
    render: (a: Afsc) => (
      <Badge variant="default" className="font-mono">
        {a.code}
      </Badge>
    ),
    className: "w-28",
  },
  {
    key: "title",
    header: "Title",
    render: (a: Afsc) => <span className="font-medium">{a.title}</span>,
  },
  {
    key: "duration",
    header: "Duration",
    render: (a: Afsc) => (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <GraduationCap className="h-3 w-3" />
        {a.duration || "—"}
      </span>
    ),
    className: "w-32",
  },
  {
    key: "isActive",
    header: "Status",
    render: (a: Afsc) => (
      <Badge variant={a.isActive ? "success" : "secondary"}>
        {a.isActive ? "Active" : "Hidden"}
      </Badge>
    ),
    className: "w-24",
  },
];

export default function AdminAfscsPage() {
  const [afscs, setAfscs] = useState<Afsc[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    const data = await getAllAfscs();
    setAfscs(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEdit(a: Afsc) {
    setForm({
      code: a.code,
      title: a.title,
      description: a.description || "",
      duration: a.duration || "",
      isActive: a.isActive,
    });
    setEditingId(a.id);
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (!form.code || !form.title) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateAfsc(editingId, {
          code: form.code,
          title: form.title,
          description: form.description || undefined,
          duration: form.duration || undefined,
          isActive: form.isActive,
        });
      } else {
        await createAfsc({
          code: form.code,
          title: form.title,
          description: form.description || undefined,
          duration: form.duration || undefined,
        });
      }
      close();
      await load();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to save. The AFSC code may already be in use."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(a: Afsc) {
    if (!confirm(`Delete ${a.code}?`)) return;
    await deleteAfsc(a.id);
    await load();
  }

  async function handleMove(a: Afsc, direction: "up" | "down") {
    await reorderAfsc(a.id, direction);
    await load();
  }

  async function handleSeed() {
    setSaving(true);
    try {
      const result = await seedDefaultAfscs();
      if (result.added === 0) {
        alert("All default AFSCs already exist.");
      } else {
        alert(`Added ${result.added} AFSC(s).`);
      }
      await load();
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const filtered = afscs.filter(
    (a) =>
      a.code.toLowerCase().includes(search.toLowerCase()) ||
      a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">AFSCs</h1>
          <p className="text-sm text-muted-foreground">
            Air Force Specialty Codes trained at the 937th Training Group. Shown
            on the public <code className="text-xs">/afscs</code> page.
          </p>
        </div>
        <div className="flex gap-2">
          {afscs.length === 0 && (
            <Button variant="outline" onClick={handleSeed} disabled={saving}>
              <Sparkles className="h-4 w-4 mr-2" />
              Seed Defaults
            </Button>
          )}
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add AFSC
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit AFSC" : "Add New AFSC"}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={close}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Code *</label>
                <Input
                  value={form.code}
                  onChange={(e) =>
                    setForm({ ...form, code: e.target.value.toUpperCase() })
                  }
                  placeholder="e.g. 4N0X1"
                  className="font-mono"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Aerospace Medical Technician"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Duration</label>
                <Input
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                  placeholder="e.g. 72 days"
                />
              </div>
              {editingId && (
                <div className="flex items-end pb-1 sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="font-medium">
                      Active (visible on public site)
                    </span>
                  </label>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className={textareaClasses}
                placeholder="Brief description of what this AFSC covers..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={saving || !form.code || !form.title}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update AFSC"
                    : "Add AFSC"}
              </Button>
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search AFSCs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      <DataTable
        columns={columns}
        data={filtered}
        onEdit={openEdit}
        onDelete={handleDelete}
        onMoveUp={search ? undefined : (a) => handleMove(a, "up")}
        onMoveDown={search ? undefined : (a) => handleMove(a, "down")}
        emptyMessage="No AFSCs yet. Click 'Seed Defaults' to load the standard 8 medical AFSCs."
      />
    </div>
  );
}
