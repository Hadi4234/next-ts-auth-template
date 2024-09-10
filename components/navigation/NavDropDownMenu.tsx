import LogOut from "@/component/LogOut"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { auth } from "@/server/auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { CircleUserRound } from "lucide-react"
import { ModeToggle } from "./theme-button"


export default async function NavDropDownMenu() {
  const session = await auth()
  if (session?.user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={`${session?.user?.image}`} alt="@shadcn" />
            <AvatarFallback><CircleUserRound /></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem >Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem><ModeToggle /></DropdownMenuItem>
          <DropdownMenuItem><LogOut /></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

}