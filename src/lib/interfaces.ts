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
  image: string | null;
  email: string;
  password: string;
}

export interface MessageWithData extends MessageWithUser {
  message: MessageWithUser;
  isCurrentUser: boolean;
}

export interface RoomEntryProps {
  className: string;
  roomId: string;
}

export interface IUserContext {
  id: number;
  name: string;
  image: string | null;
  email: string;
  setUserData: (userData: Partial<IUserContext>) => void;
}
