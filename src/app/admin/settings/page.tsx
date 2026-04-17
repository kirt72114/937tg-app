"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllSettings, saveSettings } from "@/lib/actions/settings";

const textareaClasses =
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y min-h-[80px]";

function ColorField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 rounded border border-input cursor-pointer"
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono"
        />
      </div>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [siteName, setSiteName] = useState("");
  const [shortName, setShortName] = useState("");
  const [branch, setBranch] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#1a3a6b");
  const [accentColor, setAccentColor] = useState("#c5a04e");
  const [navyColor, setNavyColor] = useState("#0f2444");
  const [lightColor, setLightColor] = useState("#f0f4f8");
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    async function load() {
      const settings = await getAllSettings();
      setSiteName(settings.siteName || "");
      setShortName(settings.shortName || "");
      setBranch(settings.branch || "");
      setLocation(settings.location || "");
      setDescription(settings.siteDescription || "");
      setMission(settings.mission || "");
      setVision(settings.vision || "");
      setGroupDescription(settings.groupDescription || "");
      setPrimaryColor(settings.primaryColor || "#1a3a6b");
      setAccentColor(settings.accentColor || "#c5a04e");
      setNavyColor(settings.navyColor || "#0f2444");
      setLightColor(settings.lightColor || "#f0f4f8");
      setFooterText(settings.footerText || "");
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await saveSettings({
        siteName,
        shortName,
        branch,
        location,
        siteDescription: description,
        mission,
        vision,
        groupDescription,
        primaryColor,
        accentColor,
        navyColor,
        lightColor,
        footerText,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Changes apply to the public site immediately after saving.
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saved ? (
            <><Check className="h-4 w-4 mr-2" />Saved!</>
          ) : (
            <><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save Settings"}</>
          )}
        </Button>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Site Name</label>
              <Input
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Full name shown in the header, footer, and browser tab.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Short Name</label>
                <Input
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Used in the mobile menu and tab title suffix.
                </p>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Branch</label>
                <Input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Subtitle under the brand name (e.g. United States Air Force).
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Shown in the footer beside the brand name.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className={textareaClasses}
              />
              <p className="text-xs text-muted-foreground">
                Used for SEO and social previews.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Mission Statement</label>
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                rows={2}
                className={textareaClasses}
              />
              <p className="text-xs text-muted-foreground">
                Appears in the footer brand block.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Vision Statement</label>
              <Input
                value={vision}
                onChange={(e) => setVision(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Group Description</label>
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
                rows={6}
                className={textareaClasses}
              />
              <p className="text-xs text-muted-foreground">
                Long-form description shown in the group section of the
                Leadership page. Blank lines create paragraph breaks.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Footer Tagline</label>
              <textarea
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                rows={2}
                className={textareaClasses}
              />
              <p className="text-xs text-muted-foreground">
                Replaces the default &ldquo;Branch &bull; Location&rdquo; line at the bottom of the footer. Leave blank to use the default.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Theme Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <ColorField
                label="Primary"
                hint="Buttons, links, accent borders. Default Air Force blue."
                value={primaryColor}
                onChange={setPrimaryColor}
              />
              <ColorField
                label="Accent"
                hint="Logo badge, gold highlights, sidebar accents."
                value={accentColor}
                onChange={setAccentColor}
              />
              <ColorField
                label="Navy"
                hint="Header bar, footer background, mobile menu."
                value={navyColor}
                onChange={setNavyColor}
              />
              <ColorField
                label="Page Background"
                hint="Main page background tint behind content."
                value={lightColor}
                onChange={setLightColor}
              />
            </div>

            <div className="rounded-md border p-3">
              <div className="text-xs font-medium mb-2 text-muted-foreground">Preview</div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Navy", value: navyColor },
                  { label: "Primary", value: primaryColor },
                  { label: "Accent", value: accentColor },
                  { label: "Background", value: lightColor },
                ].map((c) => (
                  <div key={c.label} className="flex flex-col items-center gap-1">
                    <div
                      className="h-12 w-12 rounded-md border"
                      style={{ backgroundColor: c.value }}
                    />
                    <span className="text-xs text-muted-foreground">{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
