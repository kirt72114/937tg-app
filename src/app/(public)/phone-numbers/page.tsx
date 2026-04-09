import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { PhoneDirectory } from "./phone-directory";

export const metadata: Metadata = {
  title: "Important Phone Numbers",
};

export default function PhoneNumbersPage() {
  return (
    <div>
      <PageHeader
        title="Important Phone Numbers"
        description="Find contact information for key offices and services. Tap any number to call."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <PhoneDirectory />
      </div>
    </div>
  );
}
