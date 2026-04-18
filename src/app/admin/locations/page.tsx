"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  reorderLocation,
} from "@/lib/actions/locations";

type Location = {
  id: string;
  name: string;
  address: string;
  description: unknown;
  mapUrl: string | null;
  latitude: unknown;
  longitude: unknown;
  category: string;
  sortOrder: number;
};

type FormData = {
  name: string;
  address: string;
  category: string;
  mapUrl: string;
};

const emptyForm: FormData = {
  name: "",
  address: "",
  category: "Building",
  mapUrl: "",
};

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: Location) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{item.name}</span>
      </div>
    ),
  },
  { key: "address", header: "Building / Address" },
  {
    key: "category",
    header: "Category",
    render: (item: Location) => (
      <Badge variant="outline">{item.category}</Badge>
    ),
    className: "w-28",
  },
];

export default function AdminLocationsPage() {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadData() {
    const items = await getLocations();
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

  function openEdit(item: Location) {
    setForm({
      name: item.name,
      address: item.address,
      category: item.category,
      mapUrl: item.mapUrl || "",
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
    if (!form.name || !form.address) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateLocation(editingId, {
          name: form.name,
          address: form.address,
          category: form.category,
          mapUrl: form.mapUrl || undefined,
        });
      } else {
        await createLocation({
          name: form.name,
          address: form.address,
          category: form.category,
          mapUrl: form.mapUrl || undefined,
        });
      }
      closeForm();
      await loadData();
    } finally {
      setSaving(false);
    }
  }

  async function handleMove(item: Location, direction: "up" | "down") {
    await reorderLocation(item.id, direction);
    await loadData();
  }

  async function handleDelete(item: Location) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await deleteLocation(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-sm text-muted-foreground">
            Manage base locations shown on the public site.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Location" : "Add New Location"}
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
                  placeholder="e.g. METC Main Building"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Building / Address *</label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="e.g. Bldg 2841"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Building">Building</option>
                  <option value="Dining">Dining</option>
                  <option value="Medical">Medical</option>
                  <option value="Recreation">Recreation</option>
                  <option value="Housing">Housing</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Map URL</label>
                <Input
                  value={form.mapUrl}
                  onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
                  placeholder="Google Maps link (optional)"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={saving || !form.name || !form.address}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Location"
                    : "Add Location"}
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
        onMoveUp={(item) => handleMove(item, "up")}
        onMoveDown={(item) => handleMove(item, "down")}
      />
    </div>
  );
}
