import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "Meet Your MTLs",
};

export default function MtlsPage() {
  return (
    <div>
      <PageHeader
        title="Meet Your MTLs"
        description="Military Training Leaders dedicated to your success."
      />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Content coming soon. This page is under development.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
