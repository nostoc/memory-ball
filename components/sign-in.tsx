
import { signIn } from "@/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google")
            }}
        >
            <button className="btn btn-outline bg-background font-bricolage font-bold text-white" type="submit">Log in</button>
        </form>
    )
} 