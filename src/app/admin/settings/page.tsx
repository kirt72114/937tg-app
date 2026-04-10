"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { useState } from "react";

const textareaClasses =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]";

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState("937th Training Group");
  const [description, setDescription] = useState(
    "Official website of the 937th Training Group, JBSA-Fort Sam Houston"
  );
  const [mission, setMission] = useState(
    "Together we develop Warrior Medics by providing comprehensive medical education and readiness training."
  );
  const [vision, setVision] = useState(
    "Premier Medics: Agile, Empowered and Innovative"
  );
  const [primaryColor, setPrimaryColor] = useState("#1a3a6b");
  const [accentColor, setAccentColor] = useState("#c5a04e");
  const [footerText, setFooterText] = useState(
    "937th Training Group | JBSA-Fort Sam Houston, TX | United States Air Force"
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure site-wide settings and appearance.</p>
        </div>
        <Button onClick={() => alert("Settings saved!")}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Site Name</label>
              <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className={textareaClasses}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mission Statement</label>
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                rows={2}
                className={textareaClasses}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Vision Statement</label>
              <Input value={vision} onChange={(e) => setVision(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-10 rounded border border-input cursor-pointer"
                  />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="font-mono" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="h-10 w-10 rounded border border-input cursor-pointer"
                  />
                  <Input value={accentColor} onChange={(e) => setAccentColor(e.target.value)} className="font-mono" />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Footer Text</label>
              <textarea
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                rows={2}
                className={textareaClasses}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
