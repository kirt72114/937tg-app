import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { PhoneDirectory } from "./phone-directory";
import { getContacts } from "@/lib/actions/contacts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Important Phone Numbers",
};

export default async function PhoneNumbersPage() {
  const contacts = await getContacts();

  return (
    <div>
      <PageHeader
        title="Important Phone Numbers"
        description="Find contact information for key offices and services. Tap any number to call."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <PhoneDirectory contacts={contacts} />
      </div>
    </div>
  );
}
