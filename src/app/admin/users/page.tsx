"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "@/lib/actions/auth";

type Role = "super_admin" | "admin" | "editor";

type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
};

const roleMap: Record<
  Role,
  { label: string; variant: "destructive" | "default" | "secondary" }
> = {
  super_admin: { label: "Super Admin", variant: "destructive" },
  admin: { label: "Admin", variant: "default" },
  editor: { label: "Editor", variant: "secondary" },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: AdminUser) => (
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.email}</p>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (item: AdminUser) => {
      const r = roleMap[item.role];
      return <Badge variant={r.variant}>{r.label}</Badge>;
    },
    className: "w-32",
  },
  {
    key: "createdAt",
    header: "Added",
    render: (item: AdminUser) => (
      <span className="text-sm text-muted-foreground">
        {dateFormatter.format(new Date(item.createdAt))}
      </span>
    ),
    className: "w-40",
  },
];

type FormState = {
  name: string;
  email: string;
  password: string;
  role: Role;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  password: "",
  role: "editor",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    const data = await getAllAdminUsers();
    setUsers(data as AdminUser[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setError(null);
    setShowForm(true);
  }

  function openEdit(item: AdminUser) {
    setForm({ name: item.name, email: item.email, password: "", role: item.role });
    setEditingId(item.id);
    setError(null);
    setShowForm(true);
  }

  function close() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        const res = await updateAdminUser(editingId, {
          name: form.name,
          role: form.role,
        });
        if ("error" in res && res.error) {
          setError(res.error);
          return;
        }
      } else {
        if (!form.email || !form.password || !form.name) {
          setError("Name, email, and password are required.");
          return;
        }
        const res = await createAdminUser({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        });
        if ("error" in res && res.error) {
          setError(res.error);
          return;
        }
      }
      close();
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: AdminUser) {
    if (!confirm(`Remove ${item.name}? This deletes their login.`)) return;
    const res = await deleteAdminUser(item.id);
    if ("error" in res && res.error) {
      alert(res.error);
      return;
    }
    await load();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage admin users and their roles.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="flex items-start gap-3 p-4">
          <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Super Admins</strong> manage everything including users.{" "}
              <strong>Admins</strong> manage all content.{" "}
              <strong>Editors</strong> can only edit existing content.
            </p>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit User" : "Invite New User"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={close}>
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
                  placeholder="e.g. Capt Sarah Mitchell"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="user@us.af.mil"
                  disabled={!!editingId}
                />
                {editingId && (
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed after creation.
                  </p>
                )}
              </div>
            </div>
            {!editingId && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Temporary Password *</label>
                <Input
                  type="text"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="At least 8 characters"
                />
                <p className="text-xs text-muted-foreground">
                  Share this with the user. They can change it after their first login.
                </p>
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Role</label>
              <select
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value as Role })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving || !form.name}>
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update User"
                    : "Invite User"}
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
        data={users}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage="No admin users yet. Click 'Invite User' to add one."
      />
    </div>
  );
}
