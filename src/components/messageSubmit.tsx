import { createPost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoomEntryProps } from "@/lib/interfaces";

export default function RoomEntry({ className, roomId }: RoomEntryProps) {
  return (
    <form className={className} action={createPost.bind(null, roomId)}>
      <div className="p-6 flex w-full items-center space-x-2">
        <Input
          className="max-w-sm mr-3"
          type="text"
          name="message"
          placeholder="Nachricht eingeben"
        />
        <Button className="chat-purple-dark" type="submit">
          Senden
        </Button>
      </div>
    </form>
  );
}
