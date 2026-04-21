"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Phone, Search } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  phone: string;
  category: string;
};

const categoryColors: Record<string, string> = {
  Emergency: "bg-red-100 text-red-700",
  "937 TG": "bg-blue-100 text-blue-700",
  Medical: "bg-green-100 text-green-700",
  "Support Services": "bg-purple-100 text-purple-700",
  Facilities: "bg-amber-100 text-amber-700",
  Recreation: "bg-teal-100 text-teal-700",
  Transportation: "bg-teal-100 text-teal-700",
};

export function ContactsDirectoryView({
  contacts,
  searchable,
}: {
  contacts: Contact[];
  searchable: boolean;
}) {
  const [search, setSearch] = useState("");

  const filtered = searchable
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.phone.includes(search) ||
          c.category.toLowerCase().includes(search.toLowerCase())
      )
    : contacts;

  const categories = [...new Set(filtered.map((c) => c.category))];

  return (
    <div className="space-y-6">
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, number, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {categories.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          {search
            ? `No contacts found matching "${search}"`
            : "No contacts available."}
        </div>
      )}

      {categories.map((category) => (
        <Card key={category}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Badge
                className={
                  categoryColors[category] || "bg-gray-100 text-gray-700"
                }
              >
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
                    key={contact.id}
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
