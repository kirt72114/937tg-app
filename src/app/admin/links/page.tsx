"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, ExternalLink } from "lucide-react";

const mockCollections = [
  { id: "1", title: "JBSA Resources", slug: "jbsa-resources", itemCount: 5, description: "Joint Base San Antonio links and resources" },
  { id: "2", title: "Military OneSource", slug: "military-onesource", itemCount: 3, description: "Support services and counseling resources" },
  { id: "3", title: "Finance Resources", slug: "finance", itemCount: 4, description: "Pay, travel, and financial readiness links" },
  { id: "4", title: "Medical Resources", slug: "medical", itemCount: 6, description: "BAMC, TRICARE, and health resources" },
];

type LinkCollection = (typeof mockCollections)[number];

const columns = [
  {
    key: "title",
    header: "Collection",
    render: (item: LinkCollection) => (
      <div className="flex items-center gap-2">
        <ExternalLink className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{item.title}</span>
      </div>
    ),
  },
  {
    key: "slug",
    header: "Slug",
    render: (item: LinkCollection) => <span className="font-mono text-xs text-muted-foreground">{item.slug}</span>,
  },
  {
    key: "itemCount",
    header: "Links",
    render: (item: LinkCollection) => <Badge variant="outline">{item.itemCount}</Badge>,
    className: "w-20",
  },
  {
    key: "description",
    header: "Description",
    render: (item: LinkCollection) => <span className="text-muted-foreground">{item.description}</span>,
  },
];

export default function AdminLinksPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Link Collections</h1>
          <p className="text-sm text-muted-foreground">Manage grouped external links shown on the public site.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Collection</Button>
      </div>
      <DataTable
        columns={columns}
        data={mockCollections}
        onEdit={(item) => alert(`Edit: ${item.title}`)}
        onDelete={(item) => alert(`Delete: ${item.title}`)}
      />
    </div>
  );
}
