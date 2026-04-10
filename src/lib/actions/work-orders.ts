"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { WorkOrderStatus, WorkOrderPriority } from "@prisma/client";

function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(10000 + Math.random() * 90000);
  return `WO-${year}-${random}`;
}

export async function submitWorkOrder(data: {
  submitterName: string;
  submitterEmail: string;
  submitterPhone?: string;
  location: string;
  category: string;
  priority: WorkOrderPriority;
  description: string;
}) {
  const referenceNumber = generateReferenceNumber();
  const workOrder = await prisma.workOrder.create({
    data: { ...data, referenceNumber },
  });
  revalidatePath("/admin/work-orders");
  return workOrder;
}

export async function lookupWorkOrder(referenceNumber: string) {
  const workOrder = await prisma.workOrder.findUnique({
    where: { referenceNumber: referenceNumber.toUpperCase().trim() },
    include: {
      updates: {
        orderBy: { createdAt: "desc" },
        include: { updater: { select: { name: true } } },
      },
    },
  });
  return workOrder;
}

export async function getAllWorkOrders() {
  return prisma.workOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { updates: true } } },
  });
}

export async function getWorkOrder(id: string) {
  return prisma.workOrder.findUnique({
    where: { id },
    include: {
      updates: {
        orderBy: { createdAt: "desc" },
        include: { updater: { select: { name: true } } },
      },
    },
  });
}

export async function updateWorkOrderStatus(data: {
  workOrderId: string;
  status: WorkOrderStatus;
  notes?: string;
  updatedBy?: string;
}) {
  const [, workOrder] = await prisma.$transaction([
    prisma.workOrderUpdate.create({
      data: {
        workOrderId: data.workOrderId,
        status: data.status,
        notes: data.notes,
        updatedBy: data.updatedBy,
      },
    }),
    prisma.workOrder.update({
      where: { id: data.workOrderId },
      data: { status: data.status },
    }),
  ]);
  revalidatePath(`/admin/work-orders/${data.workOrderId}`);
  revalidatePath("/admin/work-orders");
  return workOrder;
}
