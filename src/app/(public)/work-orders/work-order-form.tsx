"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ClipboardList } from "lucide-react";

const workOrderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().min(1, "Please select a location"),
  category: z.string().min(1, "Please select a category"),
  priority: z.string().min(1, "Please select a priority level"),
  description: z.string().min(20, "Description must be at least 20 characters"),
});

type WorkOrderFormData = z.infer<typeof workOrderSchema>;

const locations = [
  "Building 2841 - HQ",
  "Building 2840 - Dormitories",
  "Building 2846 - Rocco DFAC",
  "Building 2797 - Fitness Center",
  "Other",
];

const categories = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Structural",
  "Pest Control",
  "Other",
];

const priorities = ["Low", "Medium", "High", "Urgent"];

const selectClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function WorkOrderForm() {
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkOrderFormData>({
    resolver: zodResolver(workOrderSchema),
  });

  function onSubmit(data: WorkOrderFormData) {
    const ref = `WO-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`;
    setRefNumber(ref);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto border-emerald-200 border-2">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Work Order Submitted!</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Your work order has been received and is being processed.
          </p>
          <div className="bg-muted rounded-lg p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-1">
              Reference Number
            </p>
            <p className="text-2xl font-mono font-bold text-military-blue">
              {refNumber}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Save this reference number to track your work order status.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                setRefNumber("");
              }}
            >
              Submit Another
            </Button>
            <Button asChild>
              <a href="/work-orders/status">Check Status</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-military-blue" />
          <CardTitle>Work Order Request</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Your Name <span className="text-destructive">*</span>
            </label>
            <Input
              id="name"
              placeholder="e.g. SSgt John Smith"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john.smith@us.af.mil"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone (optional)
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="210-555-0123"
              {...register("phone")}
            />
          </div>

          {/* Location & Category row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="location" className="text-sm font-medium">
                Location <span className="text-destructive">*</span>
              </label>
              <select
                id="location"
                className={selectClasses}
                defaultValue=""
                {...register("location")}
              >
                <option value="" disabled>
                  Select location...
                </option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-xs text-destructive">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-destructive">*</span>
              </label>
              <select
                id="category"
                className={selectClasses}
                defaultValue=""
                {...register("category")}
              >
                <option value="" disabled>
                  Select category...
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <label htmlFor="priority" className="text-sm font-medium">
              Priority <span className="text-destructive">*</span>
            </label>
            <select
              id="priority"
              className={selectClasses}
              defaultValue=""
              {...register("priority")}
            >
              <option value="" disabled>
                Select priority...
              </option>
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="text-xs text-destructive">
                {errors.priority.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe the issue in detail (location within building, what's broken, when it started, etc.)"
              className={`${selectClasses} h-auto min-h-[100px] resize-y`}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Work Order"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
