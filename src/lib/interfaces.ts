import { Message } from "@prisma/client";

export interface MessageWithUser extends Message {
  id: number;
  content: string;
  timestamp: Date;
  user: {
    id: number;
    name: string;
    surname: string;
    image: string;
  };
}

export interface MessageWithData extends MessageWithUser {
  message: MessageWithUser;
  isCurrentUser: boolean;
}
