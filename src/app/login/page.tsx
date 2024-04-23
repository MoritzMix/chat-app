import { CreateUserForm } from "@/components/createUserForm";
import { LoginForm } from "@/components/loginForm";
import { authenticate, createUser } from "@/lib/actions";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex justify-center md:bg-gray-50 bg-chat-purple-dark">
      <div className="flex flex-col self-center w-full md:w-1/2 bg-chat-purple-dark md:bg-chat-purple-light md:shadow-md md:rounded-lg px-6 py-3 md:px-12 md:py-6">
        <p className="">Log In</p>
        <LoginForm authenticate={authenticate} />
        <Separator className="bg-white my-6 sm:my-12"></Separator>
        <p>Sign Up</p>
        <CreateUserForm createUser={createUser} />
      </div>
    </div>
  );
}
