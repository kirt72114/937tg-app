import { getContacts } from "@/lib/actions/contacts";
import type { ContactsDirectoryBlock } from "@/lib/content-blocks";
import { ContactsDirectoryView } from "./contacts-directory-view";

export async function ContactsDirectoryDisplay({
  block,
}: {
  block: ContactsDirectoryBlock;
}) {
  const allContacts = await getContacts();

  const contacts =
    block.categories && block.categories.length > 0
      ? allContacts.filter((c) => block.categories!.includes(c.category))
      : allContacts;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ContactsDirectoryView
        contacts={contacts.map((c) => ({
          id: c.id,
          name: c.name,
          phone: c.phone,
          category: c.category,
        }))}
        searchable={block.searchable}
      />
    </div>
  );
}
