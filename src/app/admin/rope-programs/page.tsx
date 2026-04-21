"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, X, Sparkles, Award } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllRopePrograms,
  createRopeProgram,
  updateRopeProgram,
  deleteRopeProgram,
  reorderRopeProgram,
  seedDefaultRopePrograms,
} from "@/lib/actions/rope-programs";
import type { RopeColor } from "@prisma/client";

type RopeProgram = {
  id: string;
  ropeColor: RopeColor;
  title: string;
  description: unknown;
  requirements: unknown;
  sortOrder: number;
};

type FormState = {
  ropeColor: RopeColor;
  title: string;
  descriptionText: string;
  requirements: string;
  responsibilities: string;
};

const emptyForm: FormState = {
  ropeColor: "green",
  title: "",
  descriptionText: "",
  requirements: "",
  responsibilities: "",
};

const textareaClasses =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const colorBadges: Record<RopeColor, string> = {
  green: "bg-emerald-500 text-white",
  yellow: "bg-amber-500 text-white",
  red: "bg-red-500 text-white",
};

function extractText(value: unknown): string {
  if (value && typeof value === "object" && "text" in value) {
    return String((value as { text?: unknown }).text ?? "");
  }
  return "";
}

function extractList(
  value: unknown,
  key: "requirements" | "responsibilities"
): string[] {
  if (value && typeof value === "object" && key in value) {
    const list = (value as Record<string, unknown>)[key];
    if (Array.isArray(list)) return list.map(String);
  }
  return [];
}

const columns = [
  {
    key: "ropeColor",
    header: "Color",
    render: (p: RopeProgram) => (
      <Badge className={colorBadges[p.ropeColor]}>
        {p.ropeColor.charAt(0).toUpperCase() + p.ropeColor.slice(1)}
      </Badge>
    ),
    className: "w-24",
  },
  {
    key: "title",
    header: "Title",
    render: (p: RopeProgram) => (
      <div className="flex items-center gap-2">
        <Award className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{p.title}</span>
      </div>
    ),
  },
  {
    key: "requirements",
    header: "Items",
    render: (p: RopeProgram) => (
      <span className="text-xs text-muted-foreground">
        {extractList(p.requirements, "requirements").length} req /{" "}
        {extractList(p.requirements, "responsibilities").length} resp
      </span>
    ),
    className: "w-28",
  },
];

export default function AdminRopeProgramsPage() {
  const [programs, setPrograms] = useState<RopeProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    const data = await getAllRopePrograms();
    setPrograms(data as RopeProgram[]);
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

  function openEdit(p: RopeProgram) {
    setForm({
      ropeColor: p.ropeColor,
      title: p.title,
      descriptionText: extractText(p.description),
      requirements: extractList(p.requirements, "requirements").join("\n"),
      responsibilities: extractList(p.requirements, "responsibilities").join(
        "\n"
      ),
    });
    setEditingId(p.id);
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function splitLines(value: string): string[] {
    return value
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }

  async function handleSave() {
    if (!form.title) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateRopeProgram(editingId, {
          ropeColor: form.ropeColor,
          title: form.title,
          descriptionText: form.descriptionText,
          requirements: splitLines(form.requirements),
          responsibilities: splitLines(form.responsibilities),
        });
      } else {
        await createRopeProgram({
          ropeColor: form.ropeColor,
          title: form.title,
          descriptionText: form.descriptionText,
          requirements: splitLines(form.requirements),
          responsibilities: splitLines(form.responsibilities),
        });
      }
      close();
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(p: RopeProgram) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    await deleteRopeProgram(p.id);
    await load();
  }

  async function handleMove(p: RopeProgram, direction: "up" | "down") {
    await reorderRopeProgram(p.id, direction);
    await load();
  }

  async function handleSeed() {
    setSaving(true);
    try {
      const result = await seedDefaultRopePrograms();
      if (result.added === 0) {
        alert("All default rope programs already exist.");
      } else {
        alert(`Added ${result.added} rope program(s).`);
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
          <h1 className="text-2xl font-bold">Airman Leadership Programs</h1>
          <p className="text-sm text-muted-foreground">
            Rope Program tiers shown on the public{" "}
            <code className="text-xs">/leadership-programs</code> page.
          </p>
        </div>
        <div className="flex gap-2">
          {programs.length === 0 && (
            <Button variant="outline" onClick={handleSeed} disabled={saving}>
              <Sparkles className="h-4 w-4 mr-2" />
              Seed Defaults
            </Button>
          )}
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Program
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Rope Program" : "Add New Rope Program"}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Rope Color *</label>
                <select
                  value={form.ropeColor}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ropeColor: e.target.value as RopeColor,
                    })
                  }
                  className={selectClasses}
                >
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                  <option value="red">Red</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Green Rope - Peer Leader"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={form.descriptionText}
                onChange={(e) =>
                  setForm({ ...form, descriptionText: e.target.value })
                }
                rows={3}
                className={textareaClasses}
                placeholder="What this rope position is and its purpose..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Requirements</label>
                <textarea
                  value={form.requirements}
                  onChange={(e) =>
                    setForm({ ...form, requirements: e.target.value })
                  }
                  rows={6}
                  className={textareaClasses}
                  placeholder={
                    "Minimum 2 weeks in training\nNo active UIF or disciplinary actions"
                  }
                />
                <p className="text-xs text-muted-foreground">One per line.</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Responsibilities</label>
                <textarea
                  value={form.responsibilities}
                  onChange={(e) =>
                    setForm({ ...form, responsibilities: e.target.value })
                  }
                  rows={6}
                  className={textareaClasses}
                  placeholder={
                    "Mentor newly arrived Airmen\nAssist with accountability formations"
                  }
                />
                <p className="text-xs text-muted-foreground">One per line.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving || !form.title}>
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Program"
                    : "Add Program"}
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
        data={programs}
        onEdit={openEdit}
        onDelete={handleDelete}
        onMoveUp={(p) => handleMove(p, "up")}
        onMoveDown={(p) => handleMove(p, "down")}
        emptyMessage="No rope programs yet. Click 'Seed Defaults' to load the Green/Yellow/Red tiers."
      />
    </div>
  );
}
