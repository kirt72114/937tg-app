"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getAllContacts } from "@/lib/actions/contacts";
import type { ContactsDirectoryBlock } from "@/lib/content-blocks";

export function ContactsDirectoryEditor({
  block,
  onChange,
}: {
  block: ContactsDirectoryBlock;
  onChange: (next: ContactsDirectoryBlock) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const contacts = await getAllContacts();
      const unique = [...new Set(contacts.map((c) => c.category))].sort();
      setCategories(unique);
    }
    load();
  }, []);

  const selected = block.categories ?? [];

  function toggle(cat: string) {
    const next = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    onChange({ ...block, categories: next.length > 0 ? next : undefined });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pulls contacts from the phone directory. Manage individual entries
        under <span className="font-medium">Admin → Contacts</span>.
      </p>

      <label className="flex items-center gap-2 text-sm">
        <Input
          type="checkbox"
          checked={block.searchable}
          onChange={(e) =>
            onChange({ ...block, searchable: e.target.checked })
          }
          className="h-4 w-4"
        />
        Show a search box above the directory
      </label>

      <div className="space-y-1.5">
        <label className="text-sm font-medium">Filter by category</label>
        <p className="text-xs text-muted-foreground">
          Pick categories to include. Select none to show every category.
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.length === 0 && (
            <span className="text-xs text-muted-foreground">
              No contact categories yet.
            </span>
          )}
          {categories.map((cat) => {
            const isOn = selected.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggle(cat)}
                className="focus:outline-none"
              >
                <Badge
                  variant={isOn ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {cat}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
