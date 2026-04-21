import { PageHeader } from "@/components/shared/page-header";
import { ShareWidget } from "@/components/shared/share-widget";

export default function SharePage() {
  return (
    <div>
      <PageHeader
        title="Share This App"
        description="Share the 937th Training Group app with your fellow Airmen."
      />
      <div className="px-4 py-8">
        <ShareWidget />
      </div>
    </div>
  );
}
