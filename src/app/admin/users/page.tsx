"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Shield } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Capt Sarah Mitchell", email: "sarah.mitchell@us.af.mil", role: "super_admin", createdAt: "Jan 1, 2026" },
  { id: "2", name: "TSgt Maria Santos", email: "maria.santos@us.af.mil", role: "admin", createdAt: "Feb 15, 2026" },
  { id: "3", name: "SSgt Kevin Brown", email: "kevin.brown@us.af.mil", role: "editor", createdAt: "Mar 1, 2026" },
];

type AdminUser = (typeof mockUsers)[number];

const roleMap = {
  super_admin: { label: "Super Admin", variant: "destructive" as const },
  admin: { label: "Admin", variant: "default" as const },
  editor: { label: "Editor", variant: "secondary" as const },
};

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: AdminUser) => {
      const r = roleMap[item.role as keyof typeof roleMap];
      return (
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-xs text-muted-foreground">{r.label}</p>
        </div>
      );
    },
  },
  { key: "email", header: "Email" },
  {
    key: "role",
    header: "Role",
    render: (item: AdminUser) => {
      const r = roleMap[item.role as keyof typeof roleMap];
      return <Badge variant={r.variant}>{r.label}</Badge>;
    },
    className: "w-32",
  },
  { key: "createdAt", header: "Added", className: "w-32" },
];

export default function AdminUsersPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">Manage admin users and their roles.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Invite User</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="flex items-start gap-3 p-4">
          <Shield className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p>Only <strong>Super Admins</strong> can invite new users and change roles. Admins can manage content. Editors can only edit existing content.</p>
          </div>
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        data={mockUsers}
        onEdit={(item) => alert(`Edit: ${item.name}`)}
        onDelete={(item) => alert(`Remove: ${item.name}`)}
      />
    </div>
  );
}
