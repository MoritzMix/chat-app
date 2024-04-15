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

export async function authenticate(prevState: string | undefined, data: any) {
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

  /*
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

    authenticate(undefined, data);
    //then maybe authentificate
  } catch (error) {
    console.error("Error creating user:", error);
  }*/
}

export async function createPost(roomId: string, data: FormData) {
  const content = data.get("message") as string;

  const session = await auth();

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

const sendMessageToStream = async (message: string): Promise<void> => {
  try {
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
