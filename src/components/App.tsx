import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import "./../tailwind.css";
import Dashboard from "./dashboard/page";
import CreateMeeting from "./create-meeting/page";
import { MeetingView } from "./details-meeting/page";
import { MeetingProvider } from "./details-meeting/components/meeting-context";
import Support from "./dashboard/Support/Support";
import MeetingsList from "./dashboard/meetings-list/meetings-list";


/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  return (
    <MeetingProvider>

    <Router>
      <Routes>
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termsofuse" element={<TermsOfUse />} />
        <Route path="/tab" element={<Tab />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-meeting" element={<CreateMeeting />} />
        <Route path="/details-meeting/:id" element={<MeetingView />} />
        <Route path="/support" element={<Support />} />
        <Route path="/meetings" element={<MeetingsList />} />
        <Route path="/actions" element={<MeetingsList />} />
        <Route path="/calendar" element={<MeetingsList />} />

      </Routes>
    </Router>
    </MeetingProvider>
  );
}
