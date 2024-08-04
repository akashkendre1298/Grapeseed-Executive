import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonItemDivider,
} from "@ionic/react";

const KYCUpload: React.FC = () => {
  const [result, setResult] = useState("");

  const uploadFiles = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a FormData object from the form
    const formData = new FormData(event.currentTarget);

    try {
      // Send a POST request with the form data
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      // Get the JSON result from the response
      const result = await response.json();

      // Display the result on the page
      setResult(result.result);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      setResult("Error: " + error.message);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload Files for KYC</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <form onSubmit={uploadFiles} encType="multipart/form-data">
            <IonItem>
              <IonLabel position="stacked">
                Upload Aadhaar Card (PDF/Image):
              </IonLabel>
              <input
                type="file"
                name="adhar"
                accept=".pdf,.png,.jpg,.jpeg"
                required
              />
            </IonItem>
            <IonItemDivider></IonItemDivider>
            <IonItem>
              <IonLabel position="stacked">Upload Your Image:</IonLabel>
              <input
                type="file"
                name="image"
                accept=".png,.jpg,.jpeg"
                required
              />
            </IonItem>
            <IonItemDivider></IonItemDivider>
            <IonButton expand="full" type="submit">
              Upload
            </IonButton>
          </form>
          {result && (
            <IonItem>
              <IonText>{result}</IonText>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default KYCUpload;
