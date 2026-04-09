import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { WorkOrderStatusLookup } from "./work-order-status-lookup";

export const metadata: Metadata = {
  title: "Work Order Status",
};

export default function WorkOrderStatusPage() {
  return (
    <div>
      <PageHeader
        title="Work Order Status"
        description="Enter your reference number to check the status of your work order."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <WorkOrderStatusLookup />
      </div>
    </div>
  );
}
