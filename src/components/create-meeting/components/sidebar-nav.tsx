"use client"

import React from "react"

interface SidebarNavProps {
  items: {
    title: string
  }[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <div style={{ width: "100%" }}>
      {items.map((item, index) => (
        <button
          key={index}
          style={{
            width: "100%",
            padding: "8px 12px",
            marginBottom: "8px",
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "var(--radius)",
            cursor: "pointer",
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  )
}