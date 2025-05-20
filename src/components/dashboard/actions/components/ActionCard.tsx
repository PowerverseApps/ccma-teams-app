import React, { useEffect, useRef } from "react";
import { Button } from "../../../ui/button1";

interface ActionCardProps {
  title: string;
  desc: string;
  icon?: React.ReactNode;
  onClick: (title: string) => void;
  delay?: number;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, desc, icon, onClick, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1';
          cardRef.current.style.transform = 'translateY(0)';
        }
      }, delay * 1000);
    }
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col h-full"
      style={{ 
        transition: "all 0.4s ease-out",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon || <div className="h-6 w-6 bg-gray-200 rounded-full"></div>}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 pt-1">{title}</h2>
      </div>
      
      <p className="text-gray-500 text-sm flex-grow mb-4">{desc}</p>
      
      <Button
        onClick={() => onClick(title)}
        className="self-start bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700"
      >
        Go
      </Button>
    </div>
  );
};

export default ActionCard;
