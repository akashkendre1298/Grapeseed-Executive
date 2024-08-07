import React from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { homeOutline, personOutline, settingsOutline } from "ionicons/icons";

import "./Dashboard.css"; // Import your custom styles for Dashboard page
import logo from "../assets/gapeseed-logo.png"; // Import your logo image file

const Dashboard: React.FC = () => {
  const history = useHistory();

  // const handleCardClick = (message: string) => {
  //   switch (message) {
  //     case "Enquiry":
  //       history.push("/enquirypage");
  //       break;
  //     case "View Enquiry":
  //       history.push("/viewenquiry");
  //       break;
  //     case "Update Status":
  //       history.push("/updatestatus");
  //       break;
  //     case "Edit Enquiry Status":
  //       history.push("/updatestatus");
  //       break;
  //     default:
  //       alert(`${message} Clicked!`);
  //       break;
  //   }
  // };

  //   const items = [
  //     { title: "Enquiry", message: "Enquiry" },
  //     { title: "View Enquiry", message: "View Enquiry" },
  //     { title: "Update Status", message: "Update Status" },
  //     { title: "Edit Enquiry Status", message: "Edit Enquiry Status" },
  //   ];
  const handleCardClick = (path) => {
    history.push(path);
  };
  return (
    <IonPage>
      <IonContent className="dashboard-content  ion-padding">
        <IonGrid className="dashboard-grid">
          <IonRow className="dashboard-logo-row">
            <IonCol size="12" className="ion-text-center">
              <img src={logo} alt="Logo" className="dashboard-logo" />
            </IonCol>
          </IonRow>
          <div>
            <div className="row-dashboard">
              <div onClick={() => handleCardClick("/enquirypage")}>
                <button className="card-button">Enquiry</button>
              </div>
              <div>
                <button
                  onClick={() => handleCardClick("/viewenquiry")}
                  className="card-button"
                >
                  View Enquiry{" "}
                </button>
              </div>
            </div>
            <div className="row-dashboard">
              <div>
                <button
                  onClick={() => handleCardClick("/updatestatus")}
                  className="card-button"
                >
                  Update Status
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleCardClick("/editstatus")}
                  className="card-button"
                >
                  Edit Status
                </button>
              </div>
            </div>
            <div className="row-dashboard">
              <div>
                <button
                  onClick={() => handleCardClick("/policydetails")}
                  className="card-button"
                >
                  Policy Details
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleCardClick("/reports")}
                  className="card-button"
                >
                  Reports
                </button>
              </div>
            </div>
          </div>

          {/* <IonRow className="dashboard-cards-row">
            {items.map((item, index) => (
              <IonCol
                size="12"
                sizeMd="6"
                sizeXl="6"
                key={index}
                className="dashboard-card-col"
              >
                <IonCard
                  className="dashboard-card"
                  onClick={() => handleCardClick(item.message)}
                >
                  <IonCardHeader>
                    <IonCardSubtitle>{item.title}</IonCardSubtitle>
                    <IonCardTitle>{item.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
