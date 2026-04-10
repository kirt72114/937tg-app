"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { getLocations, deleteLocation } from "@/lib/actions/locations";

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
    render: (item: Location) => <Badge variant="outline">{item.category}</Badge>,
    className: "w-28",
  },
];

export default function AdminLocationsPage() {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const items = await getLocations();
    setData(items);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

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
          <p className="text-sm text-muted-foreground">Manage base locations shown on the public site.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Location</Button>
      </div>
      <DataTable columns={columns} data={data} onEdit={(item) => alert(`Edit: ${item.name}`)} onDelete={handleDelete} />
    </div>
  );
}
