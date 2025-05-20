import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, open }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-1">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
