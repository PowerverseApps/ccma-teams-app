import React from "react";
import { app, teamsCore } from "@microsoft/teams-js";
import MediaQuery from "react-responsive";
import "./App.css";
import Dashboard from "./dashboard/page";

interface TabState {
  context: object;
  meetingId: string;
  userName: string;
}

class Tab extends React.Component<{}, TabState> {
  constructor(props: any) {
    super(props);
    this.state = {
      context: {},
      meetingId: "",
      userName: "",
    };
  }

  //React lifecycle method that gets called once a component has finished mounting
  //Learn more: https://reactjs.org/docs/react-component.html#componentdidmount
  componentDidMount() {
    app.initialize().then(() => {
      // Notifies that the app initialization is successfully and is ready for user interaction.
      app.notifySuccess();

      // Get the user context from Teams and set it in the state
      app.getContext().then(async (context) => {
        this.setState({
          meetingId: context.meeting?.id ?? "",
          userName: context.user?.userPrincipalName ?? "",
        });

        // Enable app caching.
        // App Caching was configured in this sample to reduce the reload time of your app in a meeting.
        // To learn about limitations and available scopes, please check https://learn.microsoft.com/en-us/microsoftteams/platform/apps-in-teams-meetings/app-caching-for-your-tab-app.
        if (context.page.frameContext === "sidePanel") {
          teamsCore.registerOnLoadHandler(() => {
            // Use context.contentUrl to route to the correct page.
            app.notifySuccess();
          });

          teamsCore.registerBeforeUnloadHandler((readyToUnload) => {
            // Dispose resources here if necessary.
            // Notify readiness by invoking readyToUnload.
            readyToUnload();
            return true;
          });
        }
      });
    });
    // Next steps: Error handling using the error object
  }

  render() {
    let meetingId = this.state.meetingId ?? "";
    let userPrincipleName = this.state.userName ?? "";

    return (
      <div>
       <Dashboard />
        <MediaQuery maxWidth={280}>
          <h3>This is the side panel</h3>
          <a href="https://docs.microsoft.com/en-us/microsoftteams/platform/apps-in-teams-meetings/teams-apps-in-meetings">
            Need more info, open this document in new tab or window.
          </a>
        </MediaQuery>
      </div>
    );
  }
}

export default Tab;
