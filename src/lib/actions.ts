"use server";

import prisma from "@/lib/prisma";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

import io from "socket.io-client";

//import bcrypt from "bcrypt";
import { UserData } from "./interfaces";

// Define the URL where your Socket.IO server is running
const socket = io("http://localhost:3001");

export async function authenticate(data: { email: string; password: string }) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
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

export async function reloadData() {
  revalidatePath("sinnlos?");
}

export async function createUser(data: UserData) {
  console.log("CREATE USER", data);

  const { name, surname, image, email, password } = data;
  const pwhash = password; //await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        image,
        email,
        pwhash,
      },
    });
    console.log("User created successfully:", newUser);

    authenticate({ email, password });
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function updateUser(data) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        surname: data.surname,
        image: data.image,
        email: data.email,
      },
    });
    console.log("User updated successfully:", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
  sendMessageToStream("User updated");
}

export async function createPost(roomId: string, data: FormData) {
  const content = data.get("message") as string;

  const session = await auth();
  console.log("CREATE POST", roomId, session?.user?.id, content);
  await prisma.message.create({
    data: {
      user_id: Number(session?.user?.id),
      room_id: Number(roomId),
      content,
    },
  });
  sendMessageToStream("Post created");
}

export async function createRoom(data: {
  name: string;
  description: string;
  image: string;
}) {
  console.log("CREATE ROOM", data);

  const { name, description, image } = data;

  try {
    const newRoom = await prisma.room.create({
      data: {
        name,
        description,
        image,
      },
    });
    console.log("Room successfully created:", newRoom);
  } catch (error) {
    console.error("Error deleting room:", error);
  }
  sendMessageToStream("Room created");
}

export async function deleteRoom(data: { id: number }) {
  console.log("Delete Room", data);

  const { id } = data;

  try {
    const deleteRoom = await prisma.room.delete({
      where: {
        id: id,
      },
    });
    console.log("Room successfully deleted:", deleteRoom);
  } catch (error) {
    console.error("Error deleting room:", error);
  }
  sendMessageToStream("Room deleted");
}

const sendMessageToStream = async (message: string): Promise<void> => {
  try {
    console.log("sending update", message);
    socket.emit("message", message);
  } catch (error) {
    console.error("Error sending message to stream:", error);
  }
};
