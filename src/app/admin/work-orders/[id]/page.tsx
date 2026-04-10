"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function AdminWorkOrderDetailPage() {
  const [newStatus, setNewStatus] = useState("in_progress");
  const [note, setNote] = useState("");

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/work-orders"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold font-mono">WO-2026-00001</h1>
          <p className="text-sm text-muted-foreground">Work Order Details</p>
        </div>
        <Badge variant="warning" className="ml-auto">In Progress</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-muted-foreground">Submitter</dt><dd className="font-medium">SSgt John Smith</dd></div>
                <div><dt className="text-muted-foreground">Email</dt><dd className="font-medium">john.smith@us.af.mil</dd></div>
                <div><dt className="text-muted-foreground">Location</dt><dd className="font-medium">Building 2841 - HQ</dd></div>
                <div><dt className="text-muted-foreground">Category</dt><dd className="font-medium">Plumbing</dd></div>
                <div><dt className="text-muted-foreground">Priority</dt><dd><Badge variant="outline">Medium</Badge></dd></div>
                <div><dt className="text-muted-foreground">Submitted</dt><dd className="font-medium">March 15, 2026</dd></div>
              </dl>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-1">Description</p>
                <p className="text-sm">Leaking faucet in room 204, second floor bathroom. Water drips continuously from the hot water handle.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Update History</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "Mar 17, 2026", status: "In Progress", note: "Assigned to maintenance. Parts ordered." },
                  { date: "Mar 15, 2026", status: "Submitted", note: "Work order received and logged." },
                ].map((update, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-military-blue" />
                      {i < 1 && <div className="w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="outline" className="text-[10px]">{update.status}</Badge>
                        <span className="text-xs text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.note}</p>
                    </div>
                  </div>
                ))}
              </div>
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
              <Button className="w-full" onClick={() => alert("Update saved!")}>
                <Send className="h-4 w-4 mr-2" />
                Submit Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
