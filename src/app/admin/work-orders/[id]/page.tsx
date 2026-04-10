"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getWorkOrder, updateWorkOrderStatus } from "@/lib/actions/work-orders";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

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

type WorkOrderData = {
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
  updates: {
    id: string;
    status: string;
    notes: string | null;
    createdAt: Date;
    updater: { name: string } | null;
  }[];
};

export default function AdminWorkOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [workOrder, setWorkOrder] = useState<WorkOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("in_progress");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadData() {
    const wo = await getWorkOrder(id);
    if (wo) {
      setWorkOrder(wo as WorkOrderData);
      setNewStatus(wo.status);
    }
    setLoading(false);
  }

  useEffect(() => { loadData(); }, [id]);

  async function handleSubmitUpdate() {
    if (!workOrder) return;
    setSubmitting(true);
    await updateWorkOrderStatus({
      workOrderId: workOrder.id,
      status: newStatus as "submitted" | "in_progress" | "completed" | "cancelled",
      notes: note || undefined,
    });
    setNote("");
    await loadData();
    setSubmitting(false);
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!workOrder) return <div className="p-6">Work order not found.</div>;

  const currentStatus = statusMap[workOrder.status] ?? { label: workOrder.status, variant: "default" as const };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/work-orders"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-mono">{workOrder.referenceNumber}</h1>
          <p className="text-sm text-muted-foreground">Work Order Details</p>
        </div>
        <Badge variant={currentStatus.variant} className="ml-auto">{currentStatus.label}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-muted-foreground">Submitter</dt><dd className="font-medium">{workOrder.submitterName}</dd></div>
                <div><dt className="text-muted-foreground">Email</dt><dd className="font-medium">{workOrder.submitterEmail}</dd></div>
                <div><dt className="text-muted-foreground">Phone</dt><dd className="font-medium">{workOrder.submitterPhone || "N/A"}</dd></div>
                <div><dt className="text-muted-foreground">Location</dt><dd className="font-medium">{workOrder.location}</dd></div>
                <div><dt className="text-muted-foreground">Category</dt><dd className="font-medium">{workOrder.category}</dd></div>
                <div><dt className="text-muted-foreground">Priority</dt><dd><Badge variant={priorityMap[workOrder.priority] ?? "outline"}>{workOrder.priority}</Badge></dd></div>
                <div><dt className="text-muted-foreground">Submitted</dt><dd className="font-medium">{new Date(workOrder.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</dd></div>
              </dl>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm">{workOrder.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Update History</CardTitle></CardHeader>
            <CardContent>
              {workOrder.updates.length === 0 ? (
                <p className="text-sm text-muted-foreground">No updates yet.</p>
              ) : (
                <div className="space-y-4">
                  {workOrder.updates.map((update, i) => (
                    <div key={update.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-military-blue" />
                        {i < workOrder.updates.length - 1 && <div className="w-px flex-1 bg-border" />}
                      </div>
                      <div className="pb-2">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Badge variant="outline" className="text-[10px]">
                            {(statusMap[update.status]?.label) ?? update.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(update.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                          {update.updater && (
                            <span className="text-xs text-muted-foreground">by {update.updater.name}</span>
                          )}
                        </div>
                        {update.notes && <p className="text-sm text-muted-foreground">{update.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader><CardTitle className="text-base">Add Update</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">New Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className={selectClasses}>
                  <option value="submitted">Submitted</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Add a note about this update..."
                  className={`${selectClasses} h-auto resize-y`}
                />
              </div>
              <Button className="w-full" onClick={handleSubmitUpdate} disabled={submitting}>
                <Send className="h-4 w-4 mr-2" />
                {submitting ? "Submitting..." : "Submit Update"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
