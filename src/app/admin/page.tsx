import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Megaphone,
  ClipboardList,
  Eye,
  Users,
  Phone,
} from "lucide-react";

const stats = [
  { label: "Total Pages", value: "24", icon: FileText, color: "text-blue-600" },
  { label: "Announcements", value: "1", icon: Megaphone, color: "text-amber-600" },
  { label: "Work Orders", value: "0", icon: ClipboardList, color: "text-green-600" },
  { label: "Page Views", value: "0", icon: Eye, color: "text-purple-600" },
  { label: "Leadership", value: "0", icon: Users, color: "text-indigo-600" },
  { label: "Contacts", value: "0", icon: Phone, color: "text-teal-600" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to the 937th Training Group admin panel.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No work orders yet. They will appear here once submitted.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No recent activity to display.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
