import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { DollarSign, Phone, MapPin, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Finance",
};

const commonIssues = [
  { issue: "Pay not received", action: "Visit Finance during walk-in hours with your LES and orders" },
  { issue: "BAH/BAS issues", action: "Bring a copy of your lease or dependent documentation" },
  { issue: "Travel voucher", action: "Submit within 5 business days of arrival; bring receipts and orders" },
  { issue: "Debt / overpayment", action: "Schedule an appointment to set up a payment plan" },
  { issue: "Allotments", action: "Can be set up through myPay or at the Finance office" },
];

export default function FinancePage() {
  return (
    <div>
      <PageHeader
        title="Finance"
        description="Finance office information, hours, and resources for 937 TG personnel."
      />
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Phone className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <a href="tel:2108083400" className="text-sm font-medium text-military-blue hover:underline">
                  210-808-3400
                </a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <MapPin className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium">Building 2841, Room 110</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="h-5 w-5 text-military-blue" />
              <div>
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="text-sm font-medium">Mon-Fri 0800-1530</p>
                <p className="text-xs text-muted-foreground">Walk-ins: 0800-1100</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-military-blue" />
              <CardTitle className="text-lg">Common Finance Issues</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commonIssues.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-military-blue mt-1" />
                  <div>
                    <p className="text-sm font-medium">{item.issue}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200">
          <CardContent className="flex items-start gap-4 p-6">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm mb-1">Important: Check Your LES</h3>
              <p className="text-sm text-muted-foreground">
                Review your Leave and Earnings Statement (LES) on myPay every month. Report
                any discrepancies to the Finance office immediately. Catching errors early prevents
                larger issues down the line.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
