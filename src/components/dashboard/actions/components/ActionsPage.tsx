
import React, { useState } from "react";
import ActionCard from "../components/ActionCard";
import Modal from "../components/Modal";
import { toast } from "../../../ui/sonner1";
import { 
  PlusCircle, 
  ArrowDown, 
  MessageSquare, 
  CheckCircle,
  ArrowUp,
  Calendar,
  BarChart4,
  FolderPlus,
  FileText,
  Link,
  Clock,
  ListTodo,
  File
} from "lucide-react";
import { Button } from "../../../ui/button1";

export default function ActionsPage() {
  const [modalContent, setModalContent] = useState<string | null>(null);

  const handleAction = (title: string) => {
    toast.success(`You selected: ${title}`);
    setModalContent(title);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const actionCards = [
    { 
      title: "Create Task", 
      desc: "Start a new task and assign it to your team.", 
      icon: <PlusCircle className="h-6 w-6 text-indigo-600" />
    },
    { 
      title: "Assign Task", 
      desc: "Allocate tasks to specific team members.", 
      icon: <FolderPlus className="h-6 w-6 text-blue-600" />
    },
    { 
      title: "Start Chat", 
      desc: "Begin a group conversation with your team.", 
      icon: <MessageSquare className="h-6 w-6 text-green-600" />
    },
    { 
      title: "Complete Task", 
      desc: "Mark tasks as finished or archived.", 
      icon: <CheckCircle className="h-6 w-6 text-purple-600" />
    },
    { 
      title: "Set Priority", 
      desc: "Choose priority levels like High, Medium, or Low.", 
      icon: <ArrowUp className="h-6 w-6 text-red-600" />
    },
    { 
      title: "Schedule Meeting", 
      desc: "Arrange a meeting with date and time.", 
      icon: <Calendar className="h-6 w-6 text-amber-600" />
    },
    { 
      title: "Create Poll", 
      desc: "Launch a team decision-making poll.", 
      icon: <BarChart4 className="h-6 w-6 text-teal-600" />
    },
    { 
      title: "Add Project", 
      desc: "Create a new project and add collaborators.", 
      icon: <PlusCircle className="h-6 w-6 text-cyan-600" />
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Quick Actions</h1>
          <p className="text-gray-500">Access commonly used functions quickly and efficiently</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {actionCards.map((card, index) => (
            <ActionCard
              key={index}
              title={card.title}
              desc={card.desc}
              icon={card.icon}
              onClick={handleAction}
              delay={index * 0.05}
            />
          ))}
        </div>

        {modalContent && (
          <Modal
            title={modalContent}
            onClose={closeModal}
            open={!!modalContent}
          >
            <ModalContent title={modalContent} onClose={closeModal} />
          </Modal>
        )}
      </div>
    </div>
  );
}

interface ModalContentProps {
  title: string;
  onClose: () => void;
}

const ModalContent: React.FC<ModalContentProps> = ({ title, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${title} completed successfully!`);
    onClose();
  };

  switch (title) {
    case "Create Task":
      return (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Task details..."
              className="w-full p-3 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            ></textarea>
          </div>

          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <select 
              id="assignee"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="">Select team member</option>
              <option value="member1">Alex Johnson</option>
              <option value="member2">Sam Taylor</option>
              <option value="member3">Jordan Smith</option>
            </select>
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium"
          >
            Create Task
          </button>
        </form>
      );
      
    case "Start Chat":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Participants
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                Alex Johnson <span className="ml-2 cursor-pointer">×</span>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                Sam Taylor <span className="ml-2 cursor-pointer">×</span>
              </div>
            </div>
            <input
              type="text" 
              placeholder="Add more participants..." 
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              placeholder="Type an initial message..."
              className="w-full p-3 border border-gray-300 rounded-md h-20"
            ></textarea>
          </div>
          
          <button 
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Start Conversation
          </button>
        </div>
      );
      
    case "Complete Task":
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-3">Select the tasks you want to mark as complete:</p>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {['Website redesign', 'Client meeting preparation', 'Update documentation', 'Review pull requests', 'Prepare monthly report'].map((task, i) => (
              <div key={i} className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <input type="checkbox" id={`task-${i}`} className="mr-3 h-5 w-5 text-indigo-600" />
                <label htmlFor={`task-${i}`} className="flex-grow">{task}</label>
              </div>
            ))}
          </div>
          
          <div className="pt-3 border-t border-gray-200 flex justify-between">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => toast.info("Tasks selected for archiving")}
            >
              Archive Selected
            </button>
            <button
              onClick={handleSubmit}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
            >
              Mark as Complete
            </button>
          </div>
        </div>
      );

    case "Schedule Meeting":
      return (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="meeting-title" className="block text-sm font-medium text-gray-700 mb-1">
              Meeting Title
            </label>
            <input
              id="meeting-title"
              type="text"
              placeholder="Enter meeting title"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="meeting-date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                id="meeting-date"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="meeting-time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                id="meeting-time"
                type="time"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="meeting-desc" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="meeting-desc"
              placeholder="Meeting agenda..."
              className="w-full p-3 border border-gray-300 rounded-md h-20"
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition-colors font-medium"
          >
            Schedule Meeting
          </button>
        </form>
      );

    case "Create Poll":
      return (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="poll-question" className="block text-sm font-medium text-gray-700 mb-1">
              Poll Question
            </label>
            <input
              id="poll-question"
              type="text"
              placeholder="Ask a question..."
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Options
            </label>
            {[1, 2, 3].map(num => (
              <div key={num} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Option ${num}`}
                  className="flex-grow p-3 border border-gray-300 rounded-md"
                />
                {num > 2 ? (
                  <button type="button" className="text-red-500 hover:text-red-700">
                    ×
                  </button>
                ) : null}
              </div>
            ))}
            <button 
              type="button" 
              className="text-sm text-indigo-600 hover:text-indigo-800"
              onClick={() => toast.info("Option added")}
            >
              + Add another option
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="allow-multiple" />
            <label htmlFor="allow-multiple" className="text-sm text-gray-700">
              Allow multiple selections
            </label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-md hover:bg-teal-700 transition-colors font-medium"
          >
            Create Poll
          </button>
        </form>
      );

    case "Set Priority":
      return (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-2">Select priority level for your tasks:</p>
          
          <div className="space-y-3">
            <button 
              onClick={handleSubmit}
              className="w-full flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
            >
              <ArrowUp className="h-5 w-5 text-red-600" />
              <div className="text-left">
                <p className="font-medium text-red-700">High Priority</p>
                <p className="text-sm text-red-600">Urgent, requires immediate attention</p>
              </div>
            </button>
            
            <button 
              onClick={handleSubmit}
              className="w-full flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-md hover:bg-yellow-100 transition-colors"
            >
              <div className="h-5 w-5 flex items-center justify-center">
                <div className="h-2 w-2 bg-yellow-600 rounded-full"></div>
              </div>
              <div className="text-left">
                <p className="font-medium text-yellow-700">Medium Priority</p>
                <p className="text-sm text-yellow-600">Important, should be done soon</p>
              </div>
            </button>
            
            <button 
              onClick={handleSubmit}
              className="w-full flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
            >
              <ArrowDown className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <p className="font-medium text-blue-700">Low Priority</p>
                <p className="text-sm text-blue-600">Not urgent, can be scheduled later</p>
              </div>
            </button>
          </div>
        </div>
      );
      
    case "Add Project":
      return (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              placeholder="Enter project name"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="project-desc" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="project-desc"
              placeholder="Project details..."
              className="w-full p-3 border border-gray-300 rounded-md h-20"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Team Members
            </label>
            <div className="p-3 border border-gray-300 rounded-md bg-gray-50">
              <div className="flex flex-wrap gap-2 mb-2">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                  Alex Johnson <span className="ml-2 cursor-pointer">×</span>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="Add team members..." 
                className="w-full p-2 border border-gray-200 rounded" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                Target End Date
              </label>
              <input
                id="end-date"
                type="date"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-md hover:bg-cyan-700 transition-colors font-medium"
          >
            Create Project
          </button>
        </form>
      );

    default:
      return (
        <div className="p-4 bg-gray-50 rounded-md text-gray-700 text-center">
          <p>This is a placeholder for the "{title}" action.</p>
          <p className="text-sm text-gray-500 mt-2">Feature coming soon!</p>
          <button 
            onClick={onClose}
            className="mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      );
  }
};
