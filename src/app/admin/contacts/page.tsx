"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Search, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  reorderContact,
} from "@/lib/actions/contacts";

type Contact = {
  id: string;
  name: string;
  phone: string;
  category: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
};

type FormData = {
  name: string;
  phone: string;
  category: string;
  description: string;
  isActive: boolean;
};

const emptyForm: FormData = {
  name: "",
  phone: "",
  category: "937 TG",
  description: "",
  isActive: true,
};

const categoryColors: Record<string, string> = {
  Emergency: "bg-red-100 text-red-700",
  "937 TG": "bg-blue-100 text-blue-700",
  Medical: "bg-green-100 text-green-700",
  "Support Services": "bg-purple-100 text-purple-700",
  Facilities: "bg-amber-100 text-amber-700",
};

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: Contact) => (
      <span className="font-medium">{item.name}</span>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    render: (item: Contact) => (
      <span className="flex items-center gap-1 font-mono text-sm">
        <Phone className="h-3 w-3 text-muted-foreground" />
        {item.phone}
      </span>
    ),
  },
  {
    key: "category",
    header: "Category",
    render: (item: Contact) => (
      <Badge
        className={categoryColors[item.category] || "bg-gray-100 text-gray-700"}
      >
        {item.category}
      </Badge>
    ),
  },
  {
    key: "isActive",
    header: "Status",
    render: (item: Contact) => (
      <Badge variant={item.isActive ? "success" : "secondary"}>
        {item.isActive ? "Active" : "Hidden"}
      </Badge>
    ),
    className: "w-24",
  },
];

export default function AdminContactsPage() {
  const [data, setData] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadData() {
    const items = await getAllContacts();
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

  function openEdit(item: Contact) {
    setForm({
      name: item.name,
      phone: item.phone,
      category: item.category,
      description: item.description || "",
      isActive: item.isActive,
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
    if (!form.name || !form.phone) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateContact(editingId, {
          name: form.name,
          phone: form.phone,
          category: form.category,
          description: form.description || undefined,
          isActive: form.isActive,
        });
      } else {
        await createContact({
          name: form.name,
          phone: form.phone,
          category: form.category,
          description: form.description || undefined,
        });
      }
      closeForm();
      await loadData();
    } finally {
      setSaving(false);
    }
  }

  async function handleMove(item: Contact, direction: "up" | "down") {
    await reorderContact(item.id, direction);
    await loadData();
  }

  async function handleDelete(item: Contact) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await deleteContact(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const filtered = data.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Phone Directory</h1>
          <p className="text-sm text-muted-foreground">
            Manage the phone numbers displayed on the public site.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Contact" : "Add New Contact"}
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
                  placeholder="e.g. CQ Desk"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Phone *</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. (210) 808-1234"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Emergency">Emergency</option>
                  <option value="937 TG">937 TG</option>
                  <option value="Medical">Medical</option>
                  <option value="Support Services">Support Services</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>
              {editingId && (
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="font-medium">Active (visible on public site)</span>
                  </label>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Brief description (optional)"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={saving || !form.name || !form.phone}
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Contact"
                    : "Add Contact"}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
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
        onMoveUp={search ? undefined : (item) => handleMove(item, "up")}
        onMoveDown={search ? undefined : (item) => handleMove(item, "down")}
      />
    </div>
  );
}
