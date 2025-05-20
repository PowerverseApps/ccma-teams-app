import React from 'react';
import { TooltipProvider } from "./components/ui/tooltip1";


import './App.css';

function App() {
  return (
    <TooltipProvider>
      {/* Add your app content here */}
      <div>Welcome to the app!</div>
    </TooltipProvider>
  );
}

export default App;

export {};