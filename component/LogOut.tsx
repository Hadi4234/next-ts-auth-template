import { signOut } from "@/server/auth"



export default function LogOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button>Log Out</button>
    </form>
  )
}