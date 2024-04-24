import { CreateUserForm } from "@/components/createUserForm";
import { LoginForm } from "@/components/loginForm";
import { authenticate, createUser } from "@/lib/actions";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  return (
    <div className="w-full h-full flex justify-center md:bg-gray-50 bg-chat-purple">
      <div className="flex flex-col self-center w-full md:w-1/2 bg-chat-purple md:bg-chat-purple-light md:shadow-md md:rounded-lg px-6 py-3 md:px-12 md:py-6">
        <p className="text-white md:text-black text-center text-xl font-semibold mb-6">
          Log In
        </p>
        <LoginForm authenticate={authenticate} />
        <Separator className="bg-white my-12 relative">
          <p className="text-white text-center bg-chat-purple md:bg-chat-purple-light w-[50px] absolute inset-0 m-auto -top-3">
            or
          </p>
        </Separator>
        <CreateUserForm createUser={createUser} />
      </div>
    </div>
  );
}
