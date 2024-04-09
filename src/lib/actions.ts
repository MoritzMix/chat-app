"use server";

import { signIn, signOut } from "@/auth";

import { AuthError } from "next-auth";

import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}

export async function createPost(roomId: string, data: FormData) {
  const content = data.get("message") as string;

  console.log("add", content);

  await prisma.message.create({
    data: {
      user_id: 90,
      room_id: Number(roomId),
      content,
    },
  });

  //return { success: true };
  revalidatePath("sinnlos?");
}
