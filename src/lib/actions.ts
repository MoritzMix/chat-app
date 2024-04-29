"use server";

import prisma from "@/lib/prisma";
import { auth, signIn, signOut } from "@/auth";
import { AuthError, User } from "next-auth";

//import bcrypt from "bcrypt";
import { UserData } from "./interfaces";
import socket from "@/lib/socket";

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

export async function createUser(data: UserData) {
  console.log("CREATE USER", data);

  const { name, image, email, password } = data;
  const pwhash = password; //await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
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

export async function updateUser(data: User) {
  console.log("UPDATE USER", data);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(data.id),
      },
      data: {
        name: data.name || "",
        image: data.image || "",
        email: data.email || "",
      },
    });
    console.log("User updated successfully:", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
  sendMessageToStream("userUpdate", "User updated");
}

export async function createPost(
  roomId: string | number,
  data: { message: string }
) {
  console.log("CREATE POST", roomId, data);

  const content = data.message;

  const session = await auth();

  await prisma.message.create({
    data: {
      user_id: Number(session?.user?.id),
      room_id: Number(roomId),
      content,
    },
  });
  sendMessageToStream("message", roomId);
}

export async function createRoom(data: {
  name: string;
  description?: string | undefined;
  image?: string | undefined;
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
  sendMessageToStream("roomUpdate", "Room created");
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
  sendMessageToStream("roomUpdate", "Room deleted");
}

const sendMessageToStream = async (type: string, data: any): Promise<void> => {
  try {
    console.log("sending update");
    socket.emit(type, data);
  } catch (error) {
    console.error("Error sending message to stream:", error);
  }
};
