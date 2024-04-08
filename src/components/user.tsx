import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function User() {
  const user = await prisma.user.findMany({});

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>

          {user.map((user) => (
            <SelectItem
              key={String(user.id)}
              value={String(user.id)}
              {...user}
              id={String(user.id)}
            >
              {user.name} {user.surname}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

/*
<ul className="divide-y divide-gray-200 pt-6">
      {rooms.map((room) => (
        <RoomEntry key={room.id} {...room} />
      ))}
    </ul>
*/
