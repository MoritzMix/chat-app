import prisma from "@/lib/prisma";
import { logOut, updateUser } from "@/lib/actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/updateUserForm";

export default async function LogOutButton() {
  const data = await auth();

  const userData = await prisma.user.findUnique({
    where: {
      id: Number(data?.user?.id),
    },
  });

  return (
    <div className="flex">
      <p className="font-bold text-2xl text-white leading-10">
        Welcome, {data?.user?.name}
      </p>
      <form className="ml-auto mr-4" action={logOut}>
        <Button variant={"secondary"} type="submit">
          Sign Out
        </Button>
      </form>
      <UpdateUserForm updateUser={updateUser} userData={userData} />
    </div>
  );
}
