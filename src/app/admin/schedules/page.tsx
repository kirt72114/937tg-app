"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Calendar } from "lucide-react";

const mockSchedules = [
  { id: "1", title: "Rocco DFAC - Weekday Hours", scheduleType: "dfac", effectiveDate: "Mar 1, 2026", isCurrent: true },
  { id: "2", title: "Rocco DFAC - Weekend/Holiday Hours", scheduleType: "dfac", effectiveDate: "Mar 1, 2026", isCurrent: true },
  { id: "3", title: "JBSA Shuttle Route A", scheduleType: "shuttle", effectiveDate: "Jan 15, 2026", isCurrent: true },
  { id: "4", title: "Holiday Schedule - Christmas Block Leave", scheduleType: "other", effectiveDate: "Dec 20, 2025", isCurrent: false },
];

type Schedule = (typeof mockSchedules)[number];

const typeMap = {
  dfac: { label: "DFAC", variant: "default" as const },
  shuttle: { label: "Shuttle", variant: "warning" as const },
  other: { label: "Other", variant: "secondary" as const },
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
      const t = typeMap[item.scheduleType as keyof typeof typeMap];
      return <Badge variant={t.variant}>{t.label}</Badge>;
    },
    className: "w-24",
  },
  { key: "effectiveDate", header: "Effective Date", className: "w-36" },
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
        data={mockSchedules}
        onEdit={(item) => alert(`Edit: ${item.title}`)}
        onDelete={(item) => alert(`Delete: ${item.title}`)}
      />
    </div>
  );
}
