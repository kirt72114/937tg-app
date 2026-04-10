"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { Plus, MapPin } from "lucide-react";

const mockLocations = [
  { id: "1", name: "937 TG Headquarters", building: "Building 2841", category: "Training" },
  { id: "2", name: "METC Campus", building: "3490 Gruber Rd", category: "Training" },
  { id: "3", name: "AiT Dormitories", building: "Building 2840", category: "Housing" },
  { id: "4", name: "Rocco Dining Facility", building: "Building 2846", category: "Dining" },
  { id: "5", name: "Main Exchange (BX)", building: "2250 Wilson Way", category: "Services" },
  { id: "6", name: "Jimmy Brought Fitness Center", building: "Building 2797", category: "Recreation" },
  { id: "7", name: "Brooke Army Medical Center", building: "3551 Roger Brooke Dr", category: "Medical" },
];

type Location = (typeof mockLocations)[number];

const columns = [
  {
    key: "name",
    header: "Name",
    render: (item: Location) => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{item.name}</span>
      </div>
    ),
  },
  { key: "building", header: "Building / Address" },
  {
    key: "category",
    header: "Category",
    render: (item: Location) => <Badge variant="outline">{item.category}</Badge>,
    className: "w-28",
  },
];

export default function AdminLocationsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Locations</h1>
          <p className="text-sm text-muted-foreground">Manage base locations shown on the public site.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" />Add Location</Button>
      </div>
      <DataTable columns={columns} data={mockLocations} onEdit={(item) => alert(`Edit: ${item.name}`)} onDelete={(item) => alert(`Delete: ${item.name}`)} />
    </div>
  );
}
