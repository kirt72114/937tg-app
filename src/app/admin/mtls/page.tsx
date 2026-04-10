"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus } from "lucide-react";

const mockMtls = [
  { id: "1", name: "TSgt Maria Santos", rank: "TSgt", title: "Lead MTL - Building 2841", isActive: true },
  { id: "2", name: "TSgt James Williams", rank: "TSgt", title: "Floor MTL - Dorm A", isActive: true },
  { id: "3", name: "SSgt Kevin Brown", rank: "SSgt", title: "Floor MTL - Dorm B", isActive: true },
  { id: "4", name: "SSgt Ashley Davis", rank: "SSgt", title: "Floor MTL - Dorm C", isActive: true },
  { id: "5", name: "TSgt Michael Chen", rank: "TSgt", title: "Lead MTL - Building 2840", isActive: true },
  { id: "6", name: "SSgt Nicole Thompson", rank: "SSgt", title: "Floor MTL - Dorm D", isActive: true },
  { id: "7", name: "TSgt David Kim", rank: "TSgt", title: "Weekend Duty MTL", isActive: true },
  { id: "8", name: "SSgt Brandon Lee", rank: "SSgt", title: "Floor MTL - Dorm E", isActive: false },
];

type Mtl = (typeof mockMtls)[number];

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
        data={mockMtls}
        onEdit={(item) => alert(`Edit: ${item.name}`)}
        onDelete={(item) => alert(`Delete: ${item.name}`)}
      />
    </div>
  );
}
