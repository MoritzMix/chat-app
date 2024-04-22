import { logOut, updateUser } from "@/lib/actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/updateUserForm";
import { WSHandler } from "@/components/wsHandler";

async function LogOutButton() {
  return (
    <>
      <form className="ml-auto mr-4" action={logOut}>
        <Button variant={"secondary"} type="submit">
          Sign Out
        </Button>
      </form>
    </>
  );
}

export async function Header() {
  const data = await auth();
  const username = data?.user?.name;
  return (
    <div className="flex justify-end bg-chat-purple-dark fixed py-4 px-12 w-full">
      <p className="font-bold text-2xl text-white leading-10">
        Welcome, {username}
      </p>
      <LogOutButton />
      <UpdateUserForm updateUser={updateUser} userData={data?.user} />
      <WSHandler />
    </div>
  );
}
