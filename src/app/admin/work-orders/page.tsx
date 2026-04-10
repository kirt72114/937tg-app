"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllWorkOrders } from "@/lib/actions/work-orders";

type WorkOrder = {
  id: string;
  referenceNumber: string;
  submitterName: string;
  submitterEmail: string;
  submitterPhone: string | null;
  location: string;
  category: string;
  priority: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  _count: { updates: number };
};

const statusMap: Record<string, { label: string; variant: "default" | "warning" | "success" | "destructive" }> = {
  submitted: { label: "Submitted", variant: "default" },
  in_progress: { label: "In Progress", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

const priorityMap: Record<string, "secondary" | "outline" | "warning" | "destructive"> = {
  low: "secondary",
  medium: "outline",
  high: "warning",
  urgent: "destructive",
};

const columns = [
  {
    key: "referenceNumber",
    header: "Reference",
    render: (item: WorkOrder) => (
      <Link href={`/admin/work-orders/${item.id}`} className="font-mono text-xs font-medium text-military-blue hover:underline">
        {item.referenceNumber}
      </Link>
    ),
  },
  { key: "submitterName", header: "Submitter" },
  { key: "location", header: "Location" },
  { key: "category", header: "Category", className: "w-24" },
  {
    key: "priority",
    header: "Priority",
    render: (item: WorkOrder) => <Badge variant={priorityMap[item.priority] ?? "outline"}>{item.priority}</Badge>,
    className: "w-24",
  },
  {
    key: "status",
    header: "Status",
    render: (item: WorkOrder) => {
      const s = statusMap[item.status] ?? { label: item.status, variant: "default" as const };
      return <Badge variant={s.variant}>{s.label}</Badge>;
    },
    className: "w-28",
  },
  {
    key: "createdAt",
    header: "Date",
    render: (item: WorkOrder) => (
      <span className="text-sm text-muted-foreground">
        {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
      </span>
    ),
    className: "w-28",
  },
];

export default function AdminWorkOrdersPage() {
  const [data, setData] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllWorkOrders().then((items) => {
      setData(items as WorkOrder[]);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const stats = {
    total: data.length,
    submitted: data.filter((w) => w.status === "submitted").length,
    inProgress: data.filter((w) => w.status === "in_progress").length,
    completed: data.filter((w) => w.status === "completed").length,
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
        data={data}
        onEdit={(item) => {
          window.location.href = `/admin/work-orders/${item.id}`;
        }}
      />
    </div>
  );
}
