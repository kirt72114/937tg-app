"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllProfiles, deleteProfile } from "@/lib/actions/leadership";

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

  async function loadData() {
    const items = await getAllProfiles("leadership");
    setData(items);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

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
          <p className="text-sm text-muted-foreground">Manage leadership profiles displayed on the public site.</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Leader
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
