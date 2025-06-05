import React from "react"
import { cn } from "../../../lib/utils"
import { Button } from "../../ui/button1"
import { useNavigate } from "react-router-dom"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Button
        variant="ghost"
        className="text-sm font-medium transition-colors hover:text-primary"
        onClick={() => navigate("/Dashboard")}
      >
        Overview
      </Button>

      <Button
        variant="ghost"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => navigate("/actions")}
      >
        Actions
      </Button>

      <Button
        variant="ghost"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => navigate("/calendar")}
      >
        Calendar
      </Button>
      
      <Button
        variant="ghost"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => navigate("/support")}
      >
        Support
      </Button>

      <Button
        variant="ghost"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => navigate("/components")}
      >
        Decision Tracker
      </Button>

      
    </nav>
  )
}