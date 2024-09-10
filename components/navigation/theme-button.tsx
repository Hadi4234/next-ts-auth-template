"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme, } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "../ui/switch"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [checked, setChecked] = useState(false)

  function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true)
      case "light":
        return setChecked(false)
      case "system":
        return setChecked(false)
    }
  }

  useEffect(() => {
    setSwitchState()
  }, [])
  return (

    <DropdownMenuItem className="font-medium cursor-pointer  ease-in-out">
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex "
      >

        <p className="dark:text-blue-400 mr-2 text-secondary-foreground/75  ">
          {checked ? "Dark" : "Light"}
        </p>
        <Switch
          className=" "
          checked={checked}
          onCheckedChange={(e) => {
            setChecked((prev) => !prev)
            if (e) setTheme("dark")
            if (!e) setTheme("light")
          }}
        />
      </div>
    </DropdownMenuItem>
  )
}
