import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { WorkOrderForm } from "./work-order-form";

export const metadata: Metadata = {
  title: "Submit a Work Order",
};

export default function WorkOrdersPage() {
  return (
    <div>
      <PageHeader
        title="Submit a Work Order"
        description="Report maintenance issues in dormitories or facilities. You'll receive a reference number to track your request."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <WorkOrderForm />
      </div>
    </div>
  );
}
