"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { ClipboardList, Eye } from "lucide-react";

const mockWorkOrders = [
  { id: "1", referenceNumber: "WO-2026-00001", submitter: "SSgt Smith", location: "Building 2841", category: "Plumbing", priority: "Medium", status: "in_progress", createdAt: "Mar 15, 2026" },
  { id: "2", referenceNumber: "WO-2026-00002", submitter: "A1C Johnson", location: "Building 2840", category: "Electrical", priority: "High", status: "submitted", createdAt: "Mar 20, 2026" },
  { id: "3", referenceNumber: "WO-2026-00003", submitter: "SrA Williams", location: "Rocco DFAC", category: "HVAC", priority: "Low", status: "completed", createdAt: "Mar 10, 2026" },
  { id: "4", referenceNumber: "WO-2026-00004", submitter: "TSgt Davis", location: "Fitness Center", category: "Structural", priority: "Urgent", status: "submitted", createdAt: "Apr 1, 2026" },
];

type WorkOrder = (typeof mockWorkOrders)[number];

const statusMap = {
  submitted: { label: "Submitted", variant: "default" as const },
  in_progress: { label: "In Progress", variant: "warning" as const },
  completed: { label: "Completed", variant: "success" as const },
  cancelled: { label: "Cancelled", variant: "destructive" as const },
};

const priorityMap = {
  Low: "secondary" as const,
  Medium: "outline" as const,
  High: "warning" as const,
  Urgent: "destructive" as const,
};

const columns = [
  {
    key: "referenceNumber",
    header: "Reference",
    render: (item: WorkOrder) => <span className="font-mono text-xs font-medium">{item.referenceNumber}</span>,
  },
  { key: "submitter", header: "Submitter" },
  { key: "location", header: "Location" },
  { key: "category", header: "Category", className: "w-24" },
  {
    key: "priority",
    header: "Priority",
    render: (item: WorkOrder) => <Badge variant={priorityMap[item.priority as keyof typeof priorityMap]}>{item.priority}</Badge>,
    className: "w-24",
  },
  {
    key: "status",
    header: "Status",
    render: (item: WorkOrder) => {
      const s = statusMap[item.status as keyof typeof statusMap];
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
    className: "w-28",
  },
  { key: "createdAt", header: "Date", className: "w-28" },
];

export default function AdminWorkOrdersPage() {
  const stats = {
    total: mockWorkOrders.length,
    submitted: mockWorkOrders.filter((w) => w.status === "submitted").length,
    inProgress: mockWorkOrders.filter((w) => w.status === "in_progress").length,
    completed: mockWorkOrders.filter((w) => w.status === "completed").length,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Work Orders</h1>
        <p className="text-sm text-muted-foreground">View and manage submitted work orders.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: stats.total, color: "text-foreground" },
          { label: "Submitted", value: stats.submitted, color: "text-blue-600" },
          { label: "In Progress", value: stats.inProgress, color: "text-amber-600" },
          { label: "Completed", value: stats.completed, color: "text-emerald-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={mockWorkOrders}
        onEdit={(item) => alert(`View details: ${item.referenceNumber}`)}
      />
    </div>
  );
}
