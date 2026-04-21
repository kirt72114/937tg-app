"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check, Smartphone, QrCode } from "lucide-react";

export function ShareWidget() {
  const [copied, setCopied] = useState(false);
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://937tg.app";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "937th Training Group",
          text: "Check out the 937th Training Group app for resources, contacts, and more.",
          url: siteUrl,
        });
      } catch {
        // User cancelled
      }
    }
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-military-navy">
            <span className="text-2xl font-bold text-military-gold">937</span>
          </div>
          <h2 className="text-lg font-bold mb-2">937th Training Group</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Share this app with your wingmen. All the resources, contacts, and
            information you need — right in your pocket.
          </p>

          <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50">
            <div className="text-center">
              <QrCode className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">QR Code</p>
              <p className="text-[10px] text-muted-foreground">Scan to open app</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Input value={siteUrl} readOnly className="text-center text-sm" />
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleShare} className="w-full gap-2">
              <Share2 className="h-4 w-4" />
              Share App
            </Button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Add to Home Screen for the full app experience</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-sm mb-3">How to Install</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">iPhone (Safari)</p>
              <p className="text-xs">Tap the Share button → &quot;Add to Home Screen&quot;</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Android (Chrome)</p>
              <p className="text-xs">Tap the menu (⋮) → &quot;Add to Home Screen&quot; or &quot;Install App&quot;</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
