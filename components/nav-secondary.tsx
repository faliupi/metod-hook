import * as React from "react"
import { Moon, Send, Sun, type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useModalStore } from "@/hooks/use-modal-store"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const { theme, setTheme } = useTheme()

  const { onOpen } = useModalStore()
  const handleShowFeedbackModal = () => {
    const feedback = items.find((item) => item.title === "Feedback")
    if (feedback) {
      onOpen('feedbackDialog')
    }

  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm"
                onClick={item.title === "Feedback" ? handleShowFeedbackModal : undefined}
              >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarSeparator />
          <div className="w-full flex items-center justify-evenly">

            <Button variant="ghost" className="rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </Button>

            {/* BUTTON SETTINGS */}
            {/* <Button variant="ghost" className="rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings />
            </Button> */}
            <Separator  orientation="vertical" />

            {/* BUTTON FEEDBACK */}
             <Button variant="ghost" className="rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onOpen('feedbackDialog')}>
              <Send />
              Send Feedback
            </Button>
          </div>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
