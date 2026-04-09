import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = {
  title: "In-Processing",
};

export default function InProcessingPage() {
  return (
    <div>
      <PageHeader
        title="In-Processing"
        description="Checklist and information for arriving personnel."
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
