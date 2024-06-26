import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faHome,
  faIdCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import logo from "../assets/gapeseed-logo.png"; // Import your logo image file

import "./ProfilePage.css"; // Import your custom CSS file

const ProfilePage: React.FC = () => {
  const history = useHistory();
  const [profileData, setProfileData] = useState({
    clientName: "",
    clientPhone: "",
    clientAddress: "",
    clientPanCard: "",
    clientEmail: "",
  });
  const [isLoading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // To store alert messages

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Retrieve user ID from localStorage
        const userId = localStorage.getItem("userId");
        console.log("User ID from localStorage:", userId); // Debugging log

        if (userId) {
          // Fetch user data using the retrieved user ID
          const apiUrl = `https://executive-grapeseed.onrender.com/api/clients/${userId}`;
          const response = await fetch(apiUrl);

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const userData = await response.json();
          console.log("Fetched user data:", userData); // Debugging log

          setProfileData(userData);
          setLoading(false);
        } else {
          console.warn("User ID not found in localStorage");
          setAlertMessage("User ID not found. Please login again.");
          setShowAlert(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error during profile data fetch:", error);
        setAlertMessage("Failed to fetch profile data. Please try again.");
        setShowAlert(true);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  const handleLogout = async () => {
    try {
      // Clear user data from localStorage
      localStorage.removeItem("userId");

      // Navigate to the login screen or any other screen after logout
      history.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      setAlertMessage("Failed to logout. Please try again.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage className="profile-page-container">
      <IonContent fullscreen>
        <IonGrid>
          {/* Logo Section */}
          <IonRow className="ion-text-center">
            <IonCol>
              <img src={logo} alt="Logo" className="profile-logo" />
            </IonCol>
          </IonRow>

          {/* Profile Data Section */}
          <IonRow className="ion-margin-top">
            <IonCol>
              <IonText className="profile-title">
                <h2>Profile Page</h2>
              </IonText>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top">
            <IonCol>
              <div className="profile-data-container">
                <ProfileDataRow
                  icon={faUser}
                  text={`Full Name: ${profileData.clientName}`}
                />
                <ProfileDataRow
                  icon={faPhone}
                  text={`Contact Number: ${profileData.clientPhone}`}
                />
                <ProfileDataRow
                  icon={faHome}
                  text={`Address: ${profileData.clientAddress}`}
                />
                <ProfileDataRow
                  icon={faIdCard}
                  text={`Pan Card: ${profileData.clientPanCard}`}
                />
                <ProfileDataRow
                  icon={faEnvelope}
                  text={`Email: ${profileData.clientEmail}`}
                />
              </div>
            </IonCol>
          </IonRow>

          {/* Logout Button */}
          <IonRow className="ion-margin-top ion-justify-content-center">
            <IonCol size="auto">
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </IonCol>
          </IonRow>

          {/* Loading Indicator */}
          <IonLoading isOpen={isLoading} message={"Loading profile data..."} />

          {/* Alert for Errors */}
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={"Error"}
            message={alertMessage}
            buttons={["OK"]}
          />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

interface ProfileDataRowProps {
  icon: any; // Replace 'any' with appropriate icon type if possible
  text: string;
}

const ProfileDataRow: React.FC<ProfileDataRowProps> = ({ icon, text }) => (
  <IonRow className="ion-align-items-center ion-margin-bottom profile-row">
    <IonCol size="auto">
      <FontAwesomeIcon icon={icon} size="lg" className="profile-icon" />
    </IonCol>
    <IonCol>{text}</IonCol>
  </IonRow>
);

export default ProfilePage;
