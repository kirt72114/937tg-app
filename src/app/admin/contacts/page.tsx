"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Search, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllContacts, deleteContact } from "@/lib/actions/contacts";

type Contact = {
  id: string;
  name: string;
  phone: string;
  category: string;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
};

const categoryColors: Record<string, string> = {
  Emergency: "bg-red-100 text-red-700",
  "937 TG": "bg-blue-100 text-blue-700",
  Medical: "bg-green-100 text-green-700",
  "Support Services": "bg-purple-100 text-purple-700",
  Facilities: "bg-amber-100 text-amber-700",
};

const columns = [
  { key: "name", header: "Name", render: (item: Contact) => <span className="font-medium">{item.name}</span> },
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
      <Badge className={categoryColors[item.category] || "bg-gray-100 text-gray-700"}>
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
  const [search, setSearch] = useState("");

  async function loadData() {
    const items = await getAllContacts();
    setData(items);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  async function handleDelete(item: Contact) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await deleteContact(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  const filtered = data.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Phone Directory</h1>
          <p className="text-sm text-muted-foreground">Manage the phone numbers displayed on the public site.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search contacts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>
      <DataTable columns={columns} data={filtered} onEdit={(item) => alert(`Edit: ${item.name}`)} onDelete={handleDelete} />
    </div>
  );
}
