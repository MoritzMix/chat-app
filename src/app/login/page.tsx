import { CreateUserForm } from "@/components/createUserForm";
import { LoginForm } from "@/components/loginForm";
import { authenticate, createUser } from "@/lib/actions";

export default function LoginPage() {
  return (
    <div>
      <LoginForm authenticate={authenticate} />
      <CreateUserForm createUser={createUser} />
    </div>
  );
}
