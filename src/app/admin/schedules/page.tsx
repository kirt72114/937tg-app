"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Calendar, X, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  seedDefaultSchedules,
} from "@/lib/actions/schedules";

type Schedule = {
  id: string;
  title: string;
  scheduleType: string;
  content: unknown;
  effectiveDate: Date;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type FormData = {
  title: string;
  scheduleType: string;
  content: string;
  effectiveDate: string;
  isCurrent: boolean;
};

const emptyForm: FormData = {
  title: "",
  scheduleType: "dfac",
  content: "",
  effectiveDate: new Date().toISOString().split("T")[0],
  isCurrent: true,
};

const typeMap: Record<
  string,
  { label: string; variant: "default" | "warning" | "secondary" }
> = {
  dfac: { label: "DFAC", variant: "default" },
  shuttle: { label: "Shuttle", variant: "warning" },
  other: { label: "Other", variant: "secondary" },
};

const columns = [
  {
    key: "title",
    header: "Title",
    render: (item: Schedule) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{item.title}</span>
      </div>
    ),
  },
  {
    key: "scheduleType",
    header: "Type",
    render: (item: Schedule) => {
      const t = typeMap[item.scheduleType] ?? {
        label: item.scheduleType,
        variant: "secondary" as const,
      };
      return <Badge variant={t.variant}>{t.label}</Badge>;
    },
    className: "w-24",
  },
  {
    key: "effectiveDate",
    header: "Effective Date",
    render: (item: Schedule) => (
      <span className="text-sm">
        {new Date(item.effectiveDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
    ),
    className: "w-36",
  },
  {
    key: "isCurrent",
    header: "Status",
    render: (item: Schedule) => (
      <Badge variant={item.isCurrent ? "success" : "secondary"}>
        {item.isCurrent ? "Current" : "Archived"}
      </Badge>
    ),
    className: "w-28",
  },
];

export default function AdminSchedulesPage() {
  const [data, setData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadData() {
    const items = await getAllSchedules();
    setData(items as Schedule[]);
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

  function openEdit(item: Schedule) {
    setForm({
      title: item.title,
      scheduleType: item.scheduleType,
      content:
        typeof item.content === "object" && item.content !== null
          ? JSON.stringify(item.content, null, 2)
          : "",
      effectiveDate: new Date(item.effectiveDate).toISOString().split("T")[0],
      isCurrent: item.isCurrent,
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
    if (!form.title || !form.effectiveDate) return;

    let contentObj: object = {};
    if (form.content) {
      try {
        contentObj = JSON.parse(form.content);
      } catch {
        alert("Content must be valid JSON. Example: {\"hours\": \"0600-1800\"}");
        return;
      }
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateSchedule(editingId, {
          title: form.title,
          scheduleType: form.scheduleType as "dfac" | "shuttle" | "other",
          content: contentObj,
          effectiveDate: new Date(form.effectiveDate),
          isCurrent: form.isCurrent,
        });
      } else {
        await createSchedule({
          title: form.title,
          scheduleType: form.scheduleType as "dfac" | "shuttle" | "other",
          content: contentObj,
          effectiveDate: new Date(form.effectiveDate),
        });
      }
      closeForm();
      await loadData();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Schedule) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    await deleteSchedule(item.id);
    loadData();
  }

  async function handleSeed() {
    setSaving(true);
    try {
      const result = await seedDefaultSchedules();
      if (result.added === 0) {
        alert("All default schedules already exist.");
      } else {
        alert(`Added ${result.added} schedule(s).`);
      }
      await loadData();
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Schedules</h1>
          <p className="text-sm text-muted-foreground">
            Manage DFAC hours, shuttle routes, and other schedules.
          </p>
        </div>
        <div className="flex gap-2">
          {data.length === 0 && (
            <Button variant="outline" onClick={handleSeed} disabled={saving}>
              <Sparkles className="h-4 w-4 mr-2" />
              Seed Defaults
            </Button>
          )}
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Schedule" : "Add New Schedule"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. DFAC Holiday Hours"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Type</label>
                <select
                  value={form.scheduleType}
                  onChange={(e) =>
                    setForm({ ...form, scheduleType: e.target.value })
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="dfac">DFAC</option>
                  <option value="shuttle">Shuttle</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Effective Date *</label>
                <Input
                  type="date"
                  value={form.effectiveDate}
                  onChange={(e) =>
                    setForm({ ...form, effectiveDate: e.target.value })
                  }
                />
              </div>
              {editingId && (
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isCurrent}
                      onChange={(e) =>
                        setForm({ ...form, isCurrent: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="font-medium">Mark as current</span>
                  </label>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Content (JSON)
              </label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={10}
                placeholder={
                  form.scheduleType === "shuttle"
                    ? '{\n  "operatingHours": { "weekday": "Mon-Fri: 0600-2000", "weekend": "Sat-Sun: 0800-1800" },\n  "frequency": "Every 30 minutes",\n  "stops": [\n    { "name": "METC Campus", "time": ":00 / :30" }\n  ]\n}'
                    : '{\n  "meals": [\n    { "name": "Breakfast", "time": "0600 - 0800", "notes": "Hot breakfast served" },\n    { "name": "Lunch", "time": "1100 - 1300", "notes": "Full lunch menu" }\n  ]\n}'
                }
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[160px]"
              />
              <p className="text-xs text-muted-foreground">
                {form.scheduleType === "shuttle"
                  ? "Shuttle shape: operatingHours, frequency, stops [{ name, time }]."
                  : form.scheduleType === "dfac"
                    ? "DFAC shape: meals [{ name, time, notes }]."
                    : "Enter any JSON; rendered as raw on the public page."}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={saving || !form.title || !form.effectiveDate}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Schedule"
                    : "Add Schedule"}
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
