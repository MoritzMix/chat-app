import { Message } from "@prisma/client";

export interface MessageWithUser extends Message {
  id: number;
  content: string;
  timestamp: Date;
  user: {
    id: number;
    name: string;
    image: string | null;
  };
}

export interface UserData {
  name: string;
  image?: string | undefined;
  email: string;
  password: string;
}

export interface RoomEntryProps {
  className: string;
  roomId: number;
}

export interface IUserContext {
  id: number;
  name: string;
  image: string | null;
  email: string;
  setUserData: (userData: Partial<IUserContext>) => void;
}
