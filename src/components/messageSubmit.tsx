"use client";

import { createPost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RoomEntryProps } from "@/lib/interfaces";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const messageFormSchema = z.object({
  message: z.string({
    required_error: "No empty text.",
  }),
});
type MessageFormValues = z.infer<typeof messageFormSchema>;

const defaultValues: Partial<MessageFormValues> = {
  message: "",
};

export default function RoomEntry({ className, roomId }: RoomEntryProps) {
  const form = useForm<MessageFormValues>({
    resolver: zodResolver(messageFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const createPostWithId = createPost.bind(null, roomId);

  function onSubmit(data) {
    createPostWithId(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className="p-6 flex w-full items-center space-x-2">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="chat-purple-dark" type="submit">
            Senden
          </Button>
        </div>
      </form>
    </Form>
  );
}
