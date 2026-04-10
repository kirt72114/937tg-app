"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/admin/data-table";
import { Plus, Info } from "lucide-react";

const mockNavItems = [
  { id: "1", label: "Home", href: "/", section: "primary", sortOrder: 1, isVisible: true },
  { id: "2", label: "Meet Your Leadership", href: "/leadership", section: "primary", sortOrder: 2, isVisible: true },
  { id: "3", label: "Meet Your MTLs", href: "/mtls", section: "primary", sortOrder: 3, isVisible: true },
  { id: "4", label: "METC", href: "/metc", section: "primary", sortOrder: 4, isVisible: true },
  { id: "5", label: "Important Phone Numbers", href: "/phone-numbers", section: "primary", sortOrder: 5, isVisible: true },
  { id: "6", label: "AiT Guide", href: "/ait-guide", section: "primary", sortOrder: 6, isVisible: true },
  { id: "7", label: "ADC", href: "/adc", section: "primary", sortOrder: 7, isVisible: true },
  { id: "8", label: "Work Orders", href: "/work-orders", section: "primary", sortOrder: 8, isVisible: true },
  { id: "9", label: "DFAC Hours", href: "/dfac-hours", section: "more", sortOrder: 1, isVisible: true },
  { id: "10", label: "Shuttle Route", href: "/shuttle", section: "more", sortOrder: 2, isVisible: true },
  { id: "11", label: "AFSCs", href: "/afscs", section: "more", sortOrder: 3, isVisible: true },
  { id: "12", label: "Leadership Programs", href: "/leadership-programs", section: "more", sortOrder: 4, isVisible: true },
  { id: "13", label: "Share App", href: "/share", section: "more", sortOrder: 5, isVisible: true },
];

type NavItem = (typeof mockNavItems)[number];

const columns = [
  {
    key: "label",
    header: "Label",
    render: (item: NavItem) => <span className="font-medium">{item.label}</span>,
  },
  {
    key: "href",
    header: "Path",
    render: (item: NavItem) => <span className="font-mono text-xs text-muted-foreground">{item.href}</span>,
  },
  {
    key: "section",
    header: "Section",
    render: (item: NavItem) => (
      <Badge variant={item.section === "primary" ? "default" : "secondary"}>
        {item.section === "primary" ? "Primary" : "More"}
      </Badge>
    ),
    className: "w-24",
  },
  {
    key: "sortOrder",
    header: "Order",
    render: (item: NavItem) => <span className="text-muted-foreground">#{item.sortOrder}</span>,
    className: "w-20",
  },
  {
    key: "isVisible",
    header: "Visible",
    render: (item: NavItem) => (
      <Badge variant={item.isVisible ? "success" : "secondary"}>
        {item.isVisible ? "Yes" : "Hidden"}
      </Badge>
    ),
    className: "w-24",
  },
];

export default function AdminNavigationPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Navigation</h1>
          <p className="text-sm text-muted-foreground">Manage navigation items and their display order.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Nav Item</Button>
      </div>

      <Card className="mb-6">
        <CardContent className="flex items-start gap-3 p-4">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p>Drag-and-drop reordering will be available in a future update. Currently, use the edit button to change sort order values manually.</p>
          </div>
        </CardContent>
      </Card>

      <DataTable
        columns={columns}
        data={mockNavItems}
        onEdit={(item) => alert(`Edit: ${item.label}`)}
        onDelete={(item) => alert(`Delete: ${item.label}`)}
      />
    </div>
  );
}
