import { logOut } from "@/lib/actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function LogOutButton() {
  const data = await auth();

  return (
    <div className="flex">
      <p className="font-bold text-2xl text-white leading-10">
        Welcome, {data?.user?.name}
      </p>
      <form className="ml-auto" action={logOut}>
        <Button
          className="bg-chat-blue-dark text-chat-blue-light ml-auto"
          type="submit"
        >
          Sign Out
        </Button>
      </form>
    </div>
  );
}
