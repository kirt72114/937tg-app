"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, X, Eye, EyeOff, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllNavItems,
  createNavItem,
  updateNavItem,
  deleteNavItem,
  reorderNavItem,
  toggleNavVisibility,
  seedDefaultNavigation,
} from "@/lib/actions/navigation";
import type { NavSection } from "@prisma/client";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string | null;
  section: NavSection;
  sortOrder: number;
  isVisible: boolean;
};

type FormData = {
  label: string;
  href: string;
  icon: string;
  section: NavSection;
  isVisible: boolean;
};

const emptyForm: FormData = {
  label: "",
  href: "/",
  icon: "",
  section: "primary",
  isVisible: true,
};

const ICON_OPTIONS = [
  "Home", "Users", "UserCheck", "GraduationCap", "Phone", "BookOpen",
  "Scale", "Globe", "DollarSign", "LogIn", "LogOut", "MapPin",
  "ClipboardList", "Search", "UtensilsCrossed", "Bus", "Route",
  "BadgeInfo", "HeartHandshake", "Award", "Shield", "ShieldAlert",
  "Link", "Share2", "FileText", "Calendar", "Star", "Info",
];

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const columns = [
  {
    key: "label",
    header: "Label",
    render: (item: NavItem) => <span className="font-medium">{item.label}</span>,
  },
  {
    key: "href",
    header: "Path",
    render: (item: NavItem) => (
      <span className="font-mono text-xs text-muted-foreground">{item.href}</span>
    ),
  },
  {
    key: "icon",
    header: "Icon",
    render: (item: NavItem) => (
      <span className="text-xs text-muted-foreground">{item.icon || "—"}</span>
    ),
    className: "w-28",
  },
  {
    key: "section",
    header: "Section",
    render: (item: NavItem) => (
      <Badge variant={item.section === "primary" ? "default" : "secondary"}>
        {item.section === "primary" ? "Primary" : "More"}
      </Badge>
    ),
    className: "w-24",
  },
  {
    key: "isVisible",
    header: "Visible",
    render: (item: NavItem) => (
      <Badge variant={item.isVisible ? "success" : "secondary"}>
        {item.isVisible ? "Yes" : "Hidden"}
      </Badge>
    ),
    className: "w-24",
  },
];

export default function AdminNavigationPage() {
  const [data, setData] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function loadData() {
    const items = await getAllNavItems();
    setData(items as NavItem[]);
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

  function openEdit(item: NavItem) {
    setForm({
      label: item.label,
      href: item.href,
      icon: item.icon || "",
      section: item.section,
      isVisible: item.isVisible,
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
    if (!form.label || !form.href) return;
    setSaving(true);
    try {
      if (editingId) {
        await updateNavItem(editingId, {
          label: form.label,
          href: form.href,
          icon: form.icon || undefined,
          section: form.section,
          isVisible: form.isVisible,
        });
      } else {
        await createNavItem({
          label: form.label,
          href: form.href,
          icon: form.icon || undefined,
          section: form.section,
          isVisible: form.isVisible,
        });
      }
      closeForm();
      await loadData();
    } finally {
      setSaving(false);
    }
  }

  async function handleMove(item: NavItem, direction: "up" | "down") {
    await reorderNavItem(item.id, direction);
    await loadData();
  }

  async function handleToggleVisibility(item: NavItem) {
    await toggleNavVisibility(item.id);
    await loadData();
  }

  async function handleDelete(item: NavItem) {
    if (!confirm(`Delete "${item.label}" from navigation?`)) return;
    await deleteNavItem(item.id);
    loadData();
  }

  async function handleSeed() {
    if (
      !confirm(
        "Populate navigation with all default menu items? Existing items will be kept — only missing ones will be added."
      )
    )
      return;
    const result = await seedDefaultNavigation();
    await loadData();
    alert(`Added ${result.added} navigation item(s).`);
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const primaryItems = data.filter((i) => i.section === "primary");
  const moreItems = data.filter((i) => i.section === "more");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Navigation</h1>
          <p className="text-sm text-muted-foreground">
            Manage navigation items and their display order.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSeed}>
            <Sparkles className="h-4 w-4 mr-2" />
            Seed Defaults
          </Button>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Nav Item
          </Button>
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">
              {editingId ? "Edit Nav Item" : "Add New Nav Item"}
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeForm}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Label *</label>
                <Input
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="e.g. Meet Your Leadership"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Path (href) *</label>
                <Input
                  value={form.href}
                  onChange={(e) => setForm({ ...form, href: e.target.value })}
                  placeholder="e.g. /leadership"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className={selectClasses}
                >
                  <option value="">None</option>
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Section</label>
                <select
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value as NavSection })}
                  className={selectClasses}
                >
                  <option value="primary">Primary</option>
                  <option value="more">More</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setForm({ ...form, isVisible: !form.isVisible })}
              >
                {form.isVisible ? (
                  <><Eye className="h-4 w-4 mr-2" />Visible</>
                ) : (
                  <><EyeOff className="h-4 w-4 mr-2" />Hidden</>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">
                Hidden items won&apos;t appear in the public navigation.
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={saving || !form.label || !form.href}
              >
                {saving ? "Saving..." : editingId ? "Update" : "Add Item"}
              </Button>
              <Button variant="outline" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {data.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <p className="mb-4">No navigation items yet.</p>
            <Button onClick={handleSeed}>
              <Sparkles className="h-4 w-4 mr-2" />
              Seed Default Navigation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Primary Navigation ({primaryItems.length})
            </h2>
            <DataTable
              columns={columns}
              data={primaryItems}
              onEdit={openEdit}
              onDelete={handleDelete}
              onMoveUp={(item) => handleMove(item, "up")}
              onMoveDown={(item) => handleMove(item, "down")}
              emptyMessage="No primary navigation items."
            />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              More Menu ({moreItems.length})
            </h2>
            <DataTable
              columns={columns}
              data={moreItems}
              onEdit={openEdit}
              onDelete={handleDelete}
              onMoveUp={(item) => handleMove(item, "up")}
              onMoveDown={(item) => handleMove(item, "down")}
              emptyMessage="No items in the More menu."
            />
          </div>
        </div>
      )}
    </div>
  );
}
