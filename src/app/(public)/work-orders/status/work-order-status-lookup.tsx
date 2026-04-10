"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, MapPin, FileText, AlertCircle } from "lucide-react";
import { lookupWorkOrder } from "@/lib/actions/work-orders";

const statusBadge: Record<string, { label: string; variant: "default" | "warning" | "success" | "destructive" }> = {
  submitted: { label: "Submitted", variant: "default" },
  in_progress: { label: "In Progress", variant: "warning" },
  completed: { label: "Completed", variant: "success" },
  cancelled: { label: "Cancelled", variant: "destructive" },
};

type WorkOrderResult = {
  referenceNumber: string;
  status: string;
  createdAt: Date;
  location: string;
  category: string;
  priority: string;
  description: string;
  updates: {
    status: string;
    notes: string | null;
    createdAt: Date;
    updater: { name: string } | null;
  }[];
} | null;

export function WorkOrderStatusLookup() {
  const [refInput, setRefInput] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [workOrder, setWorkOrder] = useState<WorkOrderResult>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!refInput.trim()) return;
    setLoading(true);
    try {
      const result = await lookupWorkOrder(refInput);
      setWorkOrder(result);
      setSearched(true);
    } catch {
      setWorkOrder(null);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  const badge = workOrder ? statusBadge[workOrder.status] : null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter reference number (e.g. WO-2026-12345)"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {searched && !workOrder && (
        <Card className="border-amber-200">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-1">No Work Order Found</h3>
            <p className="text-sm text-muted-foreground">
              No work order was found with reference number &quot;{refInput}&quot;.
              Please check the number and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {searched && workOrder && badge && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-mono">
                {workOrder.referenceNumber}
              </CardTitle>
              <Badge variant={badge.variant}>{badge.label}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Submitted</p>
                  <p className="font-medium">
                    {new Date(workOrder.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{workOrder.location}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-medium">{workOrder.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Priority</p>
                <p className="font-medium capitalize">{workOrder.priority}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Description</p>
              </div>
              <p className="text-sm">{workOrder.description}</p>
            </div>

            {workOrder.updates.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3">Update History</h3>
                <div className="space-y-4">
                  {workOrder.updates.map((update, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-military-blue" />
                        {i < workOrder.updates.length - 1 && (
                          <div className="w-px flex-1 bg-border" />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium capitalize">
                            {update.status.replace("_", " ")}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(update.createdAt).toLocaleDateString("en-US", {
                              year: "numeric", month: "short", day: "numeric",
                            })}
                          </span>
                        </div>
                        {update.notes && (
                          <p className="text-sm text-muted-foreground">{update.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
