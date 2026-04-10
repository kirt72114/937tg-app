"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllProfiles, deleteProfile } from "@/lib/actions/leadership";

type Mtl = {
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

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: Mtl) => (
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-xs text-muted-foreground">{item.rank}</p>
      </div>
    ),
  },
  { key: "title", header: "Assignment" },
  {
    key: "isActive",
    header: "Status",
    render: (item: Mtl) => (
      <Badge variant={item.isActive ? "success" : "secondary"}>
        {item.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
    className: "w-24",
  },
];

export default function AdminMtlsPage() {
  const [data, setData] = useState<Mtl[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const items = await getAllProfiles("mtl");
    setData(items);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  async function handleDelete(item: Mtl) {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await deleteProfile(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">MTLs</h1>
          <p className="text-sm text-muted-foreground">Manage Military Training Leader profiles.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add MTL
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        onEdit={(item) => alert(`Edit: ${item.name}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
