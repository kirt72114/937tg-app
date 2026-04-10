"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllSchedules, deleteSchedule } from "@/lib/actions/schedules";

type Schedule = {
  id: string;
  title: string;
  scheduleType: string;
  content: unknown;
  effectiveDate: Date;
  isCurrent: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const typeMap: Record<string, { label: string; variant: "default" | "warning" | "secondary" }> = {
  dfac: { label: "DFAC", variant: "default" },
  shuttle: { label: "Shuttle", variant: "warning" },
  other: { label: "Other", variant: "secondary" },
};

const columns = [
  {
    key: "title",
    header: "Title",
    render: (item: Schedule) => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{item.title}</span>
      </div>
    ),
  },
  {
    key: "scheduleType",
    header: "Type",
    render: (item: Schedule) => {
      const t = typeMap[item.scheduleType] ?? { label: item.scheduleType, variant: "secondary" as const };
      return <Badge variant={t.variant}>{t.label}</Badge>;
    },
    className: "w-24",
  },
  {
    key: "effectiveDate",
    header: "Effective Date",
    render: (item: Schedule) => (
      <span className="text-sm">
        {new Date(item.effectiveDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </span>
    ),
    className: "w-36",
  },
  {
    key: "isCurrent",
    header: "Status",
    render: (item: Schedule) => (
      <Badge variant={item.isCurrent ? "success" : "secondary"}>
        {item.isCurrent ? "Current" : "Archived"}
      </Badge>
    ),
    className: "w-28",
  },
];

export default function AdminSchedulesPage() {
  const [data, setData] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    const items = await getAllSchedules();
    setData(items as Schedule[]);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  async function handleDelete(item: Schedule) {
    if (!confirm(`Delete "${item.title}"?`)) return;
    await deleteSchedule(item.id);
    loadData();
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Schedules</h1>
          <p className="text-sm text-muted-foreground">Manage DFAC hours, shuttle routes, and other schedules.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Schedule</Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        onEdit={(item) => alert(`Edit: ${item.title}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
