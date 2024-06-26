import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Login from "./pages/Login";

import ViewEnquiry from "./pages/ViewEnquiry";
import Dashboard from "./pages/Dashboard";
import UpdateStatus from "./pages/UpdateStatus";
import ProfilePage from "./pages/ProfilePage";
import EnquiryPage from "./pages/Enquiry";
import EditStatus from "./pages/EditStatus";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={Login} />
        <Redirect exact from="/" to="/login" />
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/viewenquiry" component={ViewEnquiry} />
            <Route path="/enquirypage" component={EnquiryPage} />
            <Route path="/updatestatus" component={UpdateStatus} />
            <Route path="/editstatus" component={EditStatus} />
            <Route path="/profilepage" component={ProfilePage} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon aria-hidden="true" icon={square} />
              <IonLabel>Dashboard</IonLabel>
            </IonTabButton>
            <IonTabButton tab="reports" href="/reports">
              <IonIcon aria-hidden="true" icon={square} />
              <IonLabel>Reports</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  // <IonApp>
  //   <IonReactRouter>
  //     <IonTabs>
  //       <IonRouterOutlet>
  //         <Route exact path="/tab1">
  //           <Tab1 />
  //         </Route>
  //         <Route exact path="/tab2">
  //           <Tab2 />
  //         </Route>
  //         <Route path="/tab3">
  //           <Tab3 />
  //         </Route>
  //         <Route path="/login">
  //           <Login />
  //         </Route>
  //         <Route path="/dashboard">
  //           <Dashboard />
  //         </Route>
  //         <Route path="/profile">
  //           <ProfilePage />
  //         </Route>
  //         <Route exact path="/">
  //           <Redirect to="/tab1" />
  //         </Route>
  //       </IonRouterOutlet>
  //       <IonTabBar slot="bottom">
  //         <IonTabButton tab="tab1" href="/tab1">
  //           <IonIcon aria-hidden="true" icon={triangle} />
  //           <IonLabel>Tab 1</IonLabel>
  //         </IonTabButton>
  //         <IonTabButton tab="tab2" href="/tab2">
  //           <IonIcon aria-hidden="true" icon={ellipse} />
  //           <IonLabel>Tab 2</IonLabel>
  //         </IonTabButton>
  //         <IonTabButton tab="tab3" href="/tab3">
  //           <IonIcon aria-hidden="true" icon={square} />
  //           <IonLabel>Tab 3</IonLabel>
  //         </IonTabButton>
  //         <IonTabButton tab="login" href="/login">
  //           <IonIcon aria-hidden="true" icon={square} />
  //           <IonLabel>Login</IonLabel>
  //         </IonTabButton>
  //         <IonTabButton tab="dashboard" href="/dashboard">
  //           <IonIcon aria-hidden="true" icon={square} />
  //           <IonLabel>Dashboard</IonLabel>
  //         </IonTabButton>
  //         <IonTabButton tab="profile" href="/profile">
  //           <IonIcon aria-hidden="true" icon={square} />
  //           <IonLabel>Profile</IonLabel>
  //         </IonTabButton>
  //       </IonTabBar>
  //     </IonTabs>
  //   </IonReactRouter>
  // </IonApp>
);

export default App;
