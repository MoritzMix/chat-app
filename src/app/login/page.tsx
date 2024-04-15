import { CreateUserForm } from "@/components/createUserForm";
import { LoginForm } from "@/components/loginForm";
import { authenticate, createUser } from "@/lib/actions";

export default function LoginPage() {
  return (
    <div className="flex-1 rounded-lg bg-green-50 px-6 pb-4 pt-8">
      <LoginForm authenticate={authenticate} />
      <CreateUserForm createUser={createUser} />
    </div>
  );
}
