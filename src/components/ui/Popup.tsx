import React from "react";

export default function Popup({ open, onClose, message }: { open: boolean; onClose: () => void; message: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-background border border-border rounded-lg shadow-lg p-6 max-w-sm w-full">
        <div className="text-foreground text-lg font-semibold mb-2">Warning</div>
        <div className="text-muted-foreground mb-4">{message}</div>
        <button
          className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}