"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const STORAGE_BUCKET = "public-uploads";

/**
 * Upload a file to Supabase storage and record it in the files table.
 * Returns the public URL.
 *
 * Setup required: create a public Supabase Storage bucket named "public-uploads".
 */
export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string | null) || "uploads";

  if (!file) {
    return { error: "No file provided" };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { error: "File too large (max 10 MB)" };
  }

  const admin = createAdminClient();

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
  const path = `${folder}/${Date.now()}-${safeName}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();

  const { error: uploadError } = await admin.storage
    .from(STORAGE_BUCKET)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return {
      error: `Upload failed: ${uploadError.message}. Make sure the "${STORAGE_BUCKET}" bucket exists and is public in Supabase Storage.`,
    };
  }

  const {
    data: { publicUrl },
  } = admin.storage.from(STORAGE_BUCKET).getPublicUrl(path);

  // Record in files table for tracking.
  try {
    await prisma.file.create({
      data: {
        filename: file.name,
        storagePath: path,
        mimeType: file.type || "application/octet-stream",
        sizeBytes: BigInt(file.size),
      },
    });
  } catch {
    // Non-critical; upload succeeded.
  }

  revalidatePath("/admin/files");

  return { url: publicUrl, path };
}

export async function listUploadedFiles() {
  return prisma.file.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
}

export async function listPublicFiles() {
  const supabase = await createClient();
  const files = await prisma.file.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return files.map((f) => {
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(f.storagePath);
    return {
      id: f.id,
      filename: f.filename,
      mimeType: f.mimeType,
      sizeBytes: Number(f.sizeBytes),
      publicUrl,
      createdAt: f.createdAt,
    };
  });
}

export async function deleteUploadedFile(id: string) {
  const file = await prisma.file.findUnique({ where: { id } });
  if (!file) return { error: "File not found" };

  const admin = createAdminClient();
  await admin.storage.from(STORAGE_BUCKET).remove([file.storagePath]);
  await prisma.file.delete({ where: { id } });

  revalidatePath("/admin/files");
  return { success: true };
}
