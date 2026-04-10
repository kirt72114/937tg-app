"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Megaphone, Pin } from "lucide-react";
import { useState } from "react";

const mockAnnouncements = [
  { id: "1", title: "Welcome to the 937th Training Group", priority: "normal", isPinned: true, publishDate: "Apr 8, 2026", expireDate: "—" },
  { id: "2", title: "DFAC Hours Update", priority: "important", isPinned: false, publishDate: "Apr 5, 2026", expireDate: "Apr 30, 2026" },
  { id: "3", title: "Base-Wide Safety Stand Down", priority: "urgent", isPinned: false, publishDate: "Apr 1, 2026", expireDate: "Apr 15, 2026" },
];

type Announcement = (typeof mockAnnouncements)[number];

const columns = [
  {
    key: "title",
    header: "Title",
    render: (item: Announcement) => (
      <div className="flex items-center gap-2">
        {item.isPinned && <Pin className="h-3 w-3 text-military-gold" />}
        <span className="font-medium">{item.title}</span>
      </div>
    ),
  },
  {
    key: "priority",
    header: "Priority",
    render: (item: Announcement) => {
      const v = { normal: "secondary" as const, important: "warning" as const, urgent: "destructive" as const };
      return <Badge variant={v[item.priority as keyof typeof v]}>{item.priority}</Badge>;
    },
    className: "w-28",
  },
  { key: "publishDate", header: "Published", className: "w-32" },
  { key: "expireDate", header: "Expires", className: "w-32" },
];

export default function AdminAnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-sm text-muted-foreground">Manage announcements for the home page.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Create Announcement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Announcement title" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Content</label>
              <textarea
                rows={3}
                placeholder="Announcement content..."
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => { setShowForm(false); setNewTitle(""); }}>Save</Button>
              <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <DataTable
        columns={columns}
        data={mockAnnouncements}
        onEdit={(item) => alert(`Edit: ${item.title}`)}
        onDelete={(item) => alert(`Delete: ${item.title}`)}
      />
    </div>
  );
}
