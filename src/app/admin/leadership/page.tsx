"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "@/lib/actions/leadership";

type Leader = {
  id: string;
  name: string;
  rank: string;
  title: string;
  unit: string;
  bio: unknown;
  photoUrl: string | null;
  sortOrder: number;
  profileType: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type FormData = {
  name: string;
  rank: string;
  title: string;
  unit: string;
  bio: string;
  photoUrl: string;
  profileType: string;
};

const emptyForm: FormData = {
  name: "",
  rank: "",
  title: "",
  unit: "",
  bio: "",
  photoUrl: "",
  profileType: "leadership",
};

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: Leader) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-military-blue/10 text-military-blue text-xs font-bold">
          {item.name.split(" ").slice(-1)[0][0]}
        </div>
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.rank}</p>
        </div>
      </div>
    ),
  },
  { key: "title", header: "Position" },
  { key: "unit", header: "Unit" },
  {
    key: "profileType",
    header: "Type",
    render: (item: Leader) => (
      <Badge variant="outline">
        {item.profileType === "leadership" ? "Leadership" : "MTL"}
      </Badge>
    ),
    className: "w-28",
  },
  {
    key: "isActive",
    header: "Status",
    render: (item: Leader) => (
      <Badge variant={item.isActive ? "success" : "secondary"}>
        {item.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
    className: "w-24",
  },
];

export default function AdminLeadershipPage() {
  const [data, setData] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadData() {
    const items = await getAllProfiles("leadership");
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

  function openEdit(item: Leader) {
    setForm({
      name: item.name,
      rank: item.rank,
      title: item.title,
      unit: item.unit || "",
      bio:
        typeof item.bio === "object" &&
        item.bio !== null &&
        "html" in item.bio
          ? String((item.bio as { html: string }).html)
          : "",
      photoUrl: item.photoUrl || "",
      profileType: item.profileType,
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
    if (!form.name || !form.rank || !form.title) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateProfile(editingId, {
          name: form.name,
          rank: form.rank,
          title: form.title,
          unit: form.unit || undefined,
          bio: form.bio || undefined,
          photoUrl: form.photoUrl || undefined,
        });
      } else {
        await createProfile({
          name: form.name,
          rank: form.rank,
          title: form.title,
          unit: form.unit || undefined,
          bio: form.bio || undefined,
          photoUrl: form.photoUrl || undefined,
          profileType: form.profileType as "leadership" | "mtl",
        });
      }
      closeForm();
      await loadData();
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(item: Leader) {
    await updateProfile(item.id, { isActive: !item.isActive });
    await loadData();
  }

  async function handleDelete(item: Leader) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await deleteProfile(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Leadership</h1>
          <p className="text-sm text-muted-foreground">
            Manage leadership profiles displayed on the public site.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Leader
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Leader" : "Add New Leader"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Name *</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Brian Caruthers"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Rank *</label>
                <Input
                  value={form.rank}
                  onChange={(e) => setForm({ ...form, rank: e.target.value })}
                  placeholder="e.g. Col"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Title / Position *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Commander"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Unit</label>
                <Input
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  placeholder="e.g. 937th Training Group"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Photo URL</label>
                <Input
                  value={form.photoUrl}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  placeholder="/images/leadership/photo.jpg"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Profile Type</label>
                <select
                  value={form.profileType}
                  onChange={(e) => setForm({ ...form, profileType: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="leadership">Leadership</option>
                  <option value="mtl">MTL</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={3}
                placeholder="Brief biography..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving || !form.name || !form.rank || !form.title}>
                {saving ? "Saving..." : editingId ? "Update Leader" : "Add Leader"}
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
