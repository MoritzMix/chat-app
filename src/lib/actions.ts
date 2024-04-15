"use server";

import prisma from "@/lib/prisma";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

import axios from "axios";
import io from "socket.io-client";

import bcrypt from "bcrypt";
import { UserData } from "./interfaces";

// Define the URL where your Socket.IO server is running
const socket = io("http://localhost:3000");

// Define the type for the message
type MessageType = {
  message: string;
};

export async function authenticate(data: any) {
  console.log("data", data);
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

export async function createUser(data) {
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

//ToDo: Change to other format
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
  //then
  sendMessageToStream(content);

  //return { success: true };
}

export async function createRoom(data) {
  console.log("CREATE ROOM", data);

  const { name, description, image } = data;

  const newRoom = await prisma.room.create({
    data: {
      name,
      description,
      image,
    },
  });

  console.log("Room created successfully:", newRoom);
  //sendMessageToStream shouldnt take any data.
  sendMessageToStream(name);

  //return { success: true };
}

export async function deleteRoom(data) {
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
  //sendMessageToStream shouldnt take any data.
  sendMessageToStream("1");
}

const sendMessageToStream = async (message: string): Promise<void> => {
  try {
    console.log("sending update", message);
    // Perform any necessary actions here
    // For example, making an API call using axios
    const response = await axios.post<MessageType>(
      "http://localhost:3000/api/ws",
      {
        message,
      }
    );

    // If the action was successful, emit the message to the stream
    socket.emit("message1", message);
  } catch (error) {
    console.error("Error sending message to stream:", error);
  }
};
