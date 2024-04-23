"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { isDesktop } from "@/lib/utils";

const userFormSchema = z.object({
  name: z
    .string({
      required_error: "Please select a name to display.",
    })
    .min(1),
  image: z.string().optional(),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  password: z.string().min(7),
});

type ProfileFormValues = z.infer<typeof userFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  image: "",
  email: "",
  password: "",
};

export function CreateUserForm({
  createUser,
}: {
  createUser: (data: ProfileFormValues) => void;
}) {
  const [open, setOpen] = useState(false);
  //const isOnDesktop = isDesktop(window);
  // If the user is on a desktop, show the dialog
  if (isDesktop(window)) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Create new user</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>Fast and Easy.</DialogDescription>
          </DialogHeader>
          <ProfileForm createUser={createUser} />
        </DialogContent>
      </Dialog>
    );
  }

  // If the user is on mobile, show the drawer
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create User</DrawerTitle>
          <DrawerDescription>Fast and Easy.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <ProfileForm createUser={createUser} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({
  createUser,
}: {
  createUser: (data: ProfileFormValues) => void;
}) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit() {
    console.log("Here", form.getValues());
    createUser(form.getValues());
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vorname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bild-URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMail</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-4" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
