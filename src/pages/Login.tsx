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
import axios from "axios";

const Login: React.FC = () => {
  const history = useHistory();

  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true);

      const apiUrl = "http://localhost:4000/api/clients/login";
      const response = await axios.post(apiUrl, {
        clientEmail,
        clientPassword,
      });

      if (
        response.status === 200 &&
        response.data.client &&
        response.data.client.id
      ) {
        // Save id and token to localStorage
        localStorage.setItem("userId", response.data.client.id);
        console.log(response.data.client.id);

        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);

        // Navigate to the 'Dashboard' screen upon successful login
        history.push("/dashboard");
      } else {
        alert("Login Failed: Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        // Handle specific error cases as needed
        alert(`Login Failed: ${error.response.data.message}`);
      } else if (error.request) {
        alert("Login Failed: No response from server. Please try again.");
      } else {
        alert(`Login Failed: ${error.message}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="login-background">
        <div className="container">
          <IonImg src={logo} className="logo-login" />

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
