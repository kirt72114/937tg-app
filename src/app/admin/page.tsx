import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  FileText,
  Megaphone,
  ClipboardList,
  Users,
  Phone,
  MapPin,
} from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [announcementCount, workOrderCount, leadershipCount, contactCount, locationCount, recentWorkOrders] =
    await Promise.all([
      prisma.announcement.count(),
      prisma.workOrder.count(),
      prisma.leadershipProfile.count({ where: { isActive: true } }),
      prisma.contact.count({ where: { isActive: true } }),
      prisma.location.count(),
      prisma.workOrder.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    { label: "Announcements", value: announcementCount, icon: Megaphone, color: "text-amber-600" },
    { label: "Work Orders", value: workOrderCount, icon: ClipboardList, color: "text-green-600" },
    { label: "Leadership", value: leadershipCount, icon: Users, color: "text-indigo-600" },
    { label: "Contacts", value: contactCount, icon: Phone, color: "text-teal-600" },
    { label: "Locations", value: locationCount, icon: MapPin, color: "text-purple-600" },
  ];

  const statusBadge: Record<string, "default" | "warning" | "success" | "destructive"> = {
    submitted: "default",
    in_progress: "warning",
    completed: "success",
    cancelled: "destructive",
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to the 937th Training Group admin panel.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
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
            {recentWorkOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No work orders yet. They will appear here once submitted.
              </p>
            ) : (
              <div className="space-y-3">
                {recentWorkOrders.map((wo) => (
                  <Link
                    key={wo.id}
                    href={`/admin/work-orders/${wo.id}`}
                    className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-mono font-medium">{wo.referenceNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {wo.submitterName} &middot; {wo.location}
                      </p>
                    </div>
                    <Badge variant={statusBadge[wo.status] ?? "default"}>
                      {wo.status.replace("_", " ")}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Open Work Orders</span>
              <span className="font-medium">
                {recentWorkOrders.filter((wo) => wo.status === "submitted" || wo.status === "in_progress").length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Contacts</span>
              <span className="font-medium">{contactCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Profiles</span>
              <span className="font-medium">{leadershipCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Locations</span>
              <span className="font-medium">{locationCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
