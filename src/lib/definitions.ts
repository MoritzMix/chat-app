export type Message = {
    message_id: string;
    room_id: string;
    user_id: string;
    content: string;
    timestamp: any;
  };

  export type Room = {
    room_id: string;
    name: string;
    description: string;
  };

  export type User = {
    user_id: string;
    name: string;
    surname: string;
  };

  /*
  export type Message = {
    id: string;
  };
  */