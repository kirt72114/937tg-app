"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { ImagePicker } from "@/components/admin/image-picker";
import { Plus, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllSquadrons,
  createSquadron,
  updateSquadron,
  deleteSquadron,
  reorderSquadron,
  seedDefaultSquadrons,
} from "@/lib/actions/squadrons";

type Squadron = {
  id: string;
  unit: string;
  motto: string | null;
  mission: string | null;
  vision: string | null;
  afscs: unknown;
  logoUrl: string | null;
  sortOrder: number;
};

type FormState = {
  unit: string;
  motto: string;
  mission: string;
  vision: string;
  afscs: string;
  logoUrl: string;
};

const emptyForm: FormState = {
  unit: "",
  motto: "",
  mission: "",
  vision: "",
  afscs: "",
  logoUrl: "",
};

const textareaClasses =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]";

function afscsToList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  return [];
}

const columns = [
  {
    key: "unit",
    header: "Unit",
    render: (s: Squadron) => <span className="font-medium">{s.unit}</span>,
  },
  {
    key: "motto",
    header: "Motto",
    render: (s: Squadron) => (
      <span className="text-sm italic text-muted-foreground line-clamp-1">
        {s.motto || "—"}
      </span>
    ),
  },
  {
    key: "afscs",
    header: "AFSCs",
    render: (s: Squadron) => (
      <span className="text-xs text-muted-foreground">
        {afscsToList(s.afscs).length}
      </span>
    ),
    className: "w-20",
  },
];

export default function AdminSquadronsPage() {
  const [squadrons, setSquadrons] = useState<Squadron[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    const data = await getAllSquadrons();
    setSquadrons(data as Squadron[]);
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

  function openEdit(s: Squadron) {
    setForm({
      unit: s.unit,
      motto: s.motto || "",
      mission: s.mission || "",
      vision: s.vision || "",
      afscs: afscsToList(s.afscs).join("\n"),
      logoUrl: s.logoUrl || "",
    });
    setEditingId(s.id);
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    if (!form.unit) return;
    setSaving(true);
    try {
      const afscs = form.afscs
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (editingId) {
        await updateSquadron(editingId, {
          unit: form.unit,
          motto: form.motto,
          mission: form.mission,
          vision: form.vision,
          afscs,
          logoUrl: form.logoUrl,
        });
      } else {
        await createSquadron({
          unit: form.unit,
          motto: form.motto || undefined,
          mission: form.mission || undefined,
          vision: form.vision || undefined,
          afscs,
          logoUrl: form.logoUrl || undefined,
        });
      }
      close();
      await load();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to save. The unit name may already be in use."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(s: Squadron) {
    if (!confirm(`Delete ${s.unit}? Leader records keep their unit name.`))
      return;
    await deleteSquadron(s.id);
    await load();
  }

  async function handleMove(s: Squadron, direction: "up" | "down") {
    await reorderSquadron(s.id, direction);
    await load();
  }

  async function handleSeed() {
    setSaving(true);
    try {
      const result = await seedDefaultSquadrons();
      if (result.added === 0) {
        alert("All default squadrons already exist.");
      } else {
        alert(`Added ${result.added} default squadron(s).`);
      }
      await load();
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Squadrons</h1>
          <p className="text-sm text-muted-foreground">
            Each squadron&rsquo;s unit name, motto, mission, vision, and AFSCs
            shown on the public Leadership page.
          </p>
        </div>
        <div className="flex gap-2">
          {squadrons.length === 0 && (
            <Button variant="outline" onClick={handleSeed} disabled={saving}>
              <Sparkles className="h-4 w-4 mr-2" />
              Seed Defaults
            </Button>
          )}
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Squadron
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Squadron" : "Add New Squadron"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={close}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Unit Name *</label>
              <Input
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                placeholder="e.g. 381st Training Squadron"
              />
              <p className="text-xs text-muted-foreground">
                Must exactly match the &ldquo;unit&rdquo; field on leader
                profiles for them to appear in this squadron section.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Motto</label>
              <Input
                value={form.motto}
                onChange={(e) => setForm({ ...form, motto: e.target.value })}
                placeholder="Forge to Excellence and Commitment"
              />
            </div>
            <div className="space-y-1.5">
              <ImagePicker
                value={form.logoUrl}
                onChange={(url) => setForm({ ...form, logoUrl: url })}
                folder="squadrons"
                label="Squadron Patch"
                placeholder="/images/squadrons/381st.png"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Mission</label>
                <textarea
                  value={form.mission}
                  onChange={(e) =>
                    setForm({ ...form, mission: e.target.value })
                  }
                  rows={3}
                  className={textareaClasses}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Vision</label>
                <textarea
                  value={form.vision}
                  onChange={(e) => setForm({ ...form, vision: e.target.value })}
                  rows={3}
                  className={textareaClasses}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">AFSCs</label>
              <textarea
                value={form.afscs}
                onChange={(e) => setForm({ ...form, afscs: e.target.value })}
                rows={6}
                className={`${textareaClasses} font-mono`}
                placeholder={"4Y0X1 - Dental Assistant\n4Y0X2 - Dental Laboratory"}
              />
              <p className="text-xs text-muted-foreground">
                One AFSC per line.
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving || !form.unit}>
                {saving ? "Saving..." : editingId ? "Update Squadron" : "Add Squadron"}
              </Button>
              <Button variant="outline" onClick={close}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable
        columns={columns}
        data={squadrons}
        onEdit={openEdit}
        onDelete={handleDelete}
        onMoveUp={(s) => handleMove(s, "up")}
        onMoveDown={(s) => handleMove(s, "down")}
        emptyMessage="No squadrons yet. Click 'Seed Defaults' to load the standard 381st/382d/383d, or add one manually."
      />
    </div>
  );
}
