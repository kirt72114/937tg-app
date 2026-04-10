"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Users } from "lucide-react";

const mockLeaders = [
  { id: "1", name: "Col. John Mitchell", rank: "Col.", title: "Group Commander", isActive: true },
  { id: "2", name: "Lt Col. Sarah Chen", rank: "Lt Col.", title: "Vice Commander", isActive: true },
  { id: "3", name: "CMSgt Robert Jackson", rank: "CMSgt", title: "Group Superintendent", isActive: true },
  { id: "4", name: "Lt Col. David Rivera", rank: "Lt Col.", title: "Deputy Group Commander", isActive: true },
  { id: "5", name: "CMSgt Angela Foster", rank: "CMSgt", title: "Command Chief", isActive: true },
];

type Leader = (typeof mockLeaders)[number];

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
        data={mockLeaders}
        onEdit={(item) => alert(`Edit: ${item.name}`)}
        onDelete={(item) => alert(`Delete: ${item.name}`)}
      />
    </div>
  );
}
