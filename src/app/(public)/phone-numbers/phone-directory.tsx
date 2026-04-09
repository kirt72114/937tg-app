"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Phone, Search } from "lucide-react";

type Contact = {
  name: string;
  phone: string;
  category: string;
};

const contacts: Contact[] = [
  // Emergency
  { name: "Emergency (911)", phone: "911", category: "Emergency" },
  { name: "Base Emergency", phone: "210-221-1211", category: "Emergency" },
  { name: "Mental Health Crisis Line", phone: "988", category: "Emergency" },
  { name: "Fire Department", phone: "210-221-2222", category: "Emergency" },
  // 937 TG
  { name: "937 TG Orderly Room", phone: "210-808-3100", category: "937 TG" },
  { name: "937 TG First Sergeant", phone: "210-808-3101", category: "937 TG" },
  { name: "Commander's Action Line", phone: "210-808-3102", category: "937 TG" },
  { name: "Training Manager", phone: "210-808-3103", category: "937 TG" },
  // Medical
  { name: "BAMC Operator", phone: "210-916-9900", category: "Medical" },
  { name: "TRICARE Appointments", phone: "800-874-2273", category: "Medical" },
  { name: "METC Sick Call", phone: "210-808-3200", category: "Medical" },
  { name: "Nurse Advice Line", phone: "800-874-2273", category: "Medical" },
  // Support Services
  { name: "Chapel", phone: "210-221-9004", category: "Support Services" },
  { name: "Legal / ADC", phone: "210-808-3300", category: "Support Services" },
  { name: "Finance Office", phone: "210-808-3400", category: "Support Services" },
  { name: "Military OneSource", phone: "800-342-9647", category: "Support Services" },
  // Facilities
  { name: "Work Orders / CE", phone: "210-808-3500", category: "Facilities" },
  { name: "Barracks Management", phone: "210-808-3501", category: "Facilities" },
  { name: "Dining Facility (DFAC)", phone: "210-808-3502", category: "Facilities" },
  // Transportation
  { name: "Shuttle Information", phone: "210-808-3600", category: "Transportation" },
  { name: "POV Registration", phone: "210-808-3601", category: "Transportation" },
];

const categoryColors: Record<string, string> = {
  Emergency: "bg-red-100 text-red-700",
  "937 TG": "bg-blue-100 text-blue-700",
  Medical: "bg-green-100 text-green-700",
  "Support Services": "bg-purple-100 text-purple-700",
  Facilities: "bg-amber-100 text-amber-700",
  Transportation: "bg-teal-100 text-teal-700",
};

export function PhoneDirectory() {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(filtered.map((c) => c.category))];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, number, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No contacts found matching &quot;{search}&quot;
        </div>
      )}

      {categories.map((category) => (
        <Card key={category}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Badge className={categoryColors[category] || "bg-gray-100 text-gray-700"}>
                {category}
              </Badge>
              <CardTitle className="text-base">{category}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {filtered
                .filter((c) => c.category === category)
                .map((contact) => (
                  <div
                    key={contact.name + contact.phone}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <span className="text-sm font-medium">{contact.name}</span>
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-2 text-sm font-medium text-military-blue hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {contact.phone}
                    </a>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
