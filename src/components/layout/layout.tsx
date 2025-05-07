import { Image, Separator, Stack, Text } from "@fluentui/react";
import { ArrowLeft } from "lucide-react"; // Import arrow icon
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const sidebarNavItems = [
  {
    title: "Meeting Details",
  },
  {
    title: "Agenda",
  },
  {
    title: "Resolutions",
  },
  {
    title: "Participants",
  },
];

interface CreateMeetingLayoutProps {
  children: React.ReactNode;
}

export default function CreateMeetingLayout({ children }: CreateMeetingLayoutProps) {
  const [selectedNavItem, setSelectedNavItem] = useState(sidebarNavItems[0].title);
  const navigate = useNavigate(); // Move useNavigate here

  return (
    <Stack
      tokens={{ childrenGap: 20 }}
      styles={{
        root: {
          padding: 20,
          backgroundColor: "var(--background)", // Match app background
          color: "var(--foreground)", // Match app text color
          fontFamily: "var(--font-sans)", // Match app font
        },
      }}
    >
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        styles={{
          root: {
            width: "100%",
          },
        }}
      >
         <p className="text-2xl font-bold text-gray-800">Create Meeting</p> 
         
        <Button
          variant="ghost"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--primary)",
          }}
          onClick={() => navigate("/dashboard")} // Correct navigation
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Stack>
      <p className="text-sm text-muted-foreground mt-2">
      Set up your meeting details, agenda, and participants.</p>
      <Stack
        horizontalAlign="center"
        styles={{
          root: {
            display: "none",
            maxWidth: "100%",
          },
        }}
      >
        <Image
          src="/examples/meeting-light.png"
          alt="Meeting"
          styles={{ root: { display: "block" } }}
        />
        <Image
          src="/examples/meeting-dark.png"
          alt="Meeting"
          styles={{ root: { display: "none" } }}
        />
      </Stack>
      <Stack tokens={{ childrenGap: 20 }}>
     
        
        <Separator styles={{ root: { borderColor: "var(--border)" } }} />
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <Stack
            styles={{
              root: {
                width: "20%",
                backgroundColor: "var(--sidebar)", // Match sidebar background
                padding: "1rem",
                borderRadius: "var(--radius)", // Match app border radius
              },
            }}
          >
            {sidebarNavItems.map((item, index) => (
              <Button
                key={index}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "0.5rem",
                  backgroundColor: selectedNavItem === item.title ? "var(--primary)" : "var(--muted-background)",
                  color: selectedNavItem === item.title ? "var(--primary-foreground)" : "var(--foreground)",
                  border: "none",
                  borderRadius: "var(--radius)",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedNavItem(item.title)}
              >
                {item.title}
              </Button>
            ))}
          </Stack>
          <Stack
            styles={{
              root: {
                flex: 1,
                padding: "1rem",
                backgroundColor: "var(--card)", // Match card background
                borderRadius: "var(--radius)", // Match app border radius
                boxShadow: "var(--tw-shadow)", // Match app shadow
              },
            }}
          >
            {React.Children.map(children, (child) =>
              React.isValidElement(child) && child.props.title === selectedNavItem ? child : null
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
