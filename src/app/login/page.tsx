import { CreateUserForm } from "@/components/createUserForm";
import { LoginForm } from "@/components/loginForm";
import { authenticate, createUser } from "@/lib/actions";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex justify-center bg-gray-50">
      <div className="flex flex-col self-center w-1/2 bg-chat-purple-light shadow-md rounded-lg  px-12 py-6">
        <p>Log In</p>
        <LoginForm authenticate={authenticate} />
        <Separator className="bg-white my-12"></Separator>
        <p>Create User</p>
        <CreateUserForm createUser={createUser} />
      </div>
    </div>
  );
}
