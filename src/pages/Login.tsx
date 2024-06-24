import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonImg,
} from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

import "./Login.css"; // Import custom styles for Login page
import logo from "../assets/gapeseed-logo.png"; // Import your logo image file

const Login: React.FC = () => {
  const history = useHistory();

  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);

      const apiUrl = "https://grapeseed-executive.onrender.com/api/clients";
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const apiResponse = await response.json();
      const user = apiResponse.find(
        (element: any) => element.clientEmail === clientEmail
      );

      if (user) {
        if (user.clientpassword === clientPassword) {
          // Save user ID to localStorage
          localStorage.setItem("userId", user._id);

          // Navigate to the 'Dashboard' screen upon successful login
          history.push("/dashboard");
        } else {
          alert("Login Failed", "Invalid password. Please try again.");
          setIsLoggingIn(false);
        }
      } else {
        alert("Login Failed", "Email not found. Please try again.");
        setIsLoggingIn(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoggingIn(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-background">
        <div className="container">
          <IonImg src={logo} className="logo" />

          <IonText className="login-heading">Login</IonText>

          <div className="input-container">
            <IonIcon icon={mailOutline} size="small" className="icon" />
            <IonInput
              value={clientEmail}
              placeholder="Email"
              type="email"
              onIonChange={(e) => setClientEmail(e.detail.value!)}
              className="input"
            />
          </div>

          <div className="input-container">
            <IonIcon icon={lockClosedOutline} size="small" className="icon" />
            <IonInput
              value={clientPassword}
              placeholder="Password"
              type="password"
              onIonChange={(e) => setClientPassword(e.detail.value!)}
              className="input"
            />
          </div>

          <IonButton
            expand="block"
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="login-button"
          >
            <IonText className="button-text">Login</IonText>
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
