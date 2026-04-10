"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function getCurrentAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const admin = await prisma.adminUser.findUnique({
    where: { supabaseAuthId: user.id },
  });

  return admin;
}

export async function createAdminUser(data: {
  email: string;
  password: string;
  name: string;
  role: "super_admin" | "admin" | "editor";
}) {
  const supabaseAdmin = createAdminClient();

  const { data: authUser, error } = await supabaseAdmin.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
  });

  if (error) {
    return { error: error.message };
  }

  const admin = await prisma.adminUser.create({
    data: {
      email: data.email,
      name: data.name,
      role: data.role,
      supabaseAuthId: authUser.user.id,
    },
  });

  revalidatePath("/admin/users");
  return { admin };
}
