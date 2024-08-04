import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonInput,
} from "@ionic/react";
import axios from "axios";

const FileUpload = () => {
  const [executiveId, setExecutiveId] = useState("");
  const [executiveName, setExecutiveName] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedExecutiveId = localStorage.getItem("userId");
    if (storedExecutiveId) {
      setExecutiveId(storedExecutiveId);
      axios
        .get(`http://localhost:4000/api/clients/_id/${storedExecutiveId}`)
        .then((response) => {
          setExecutiveName(response.data.executiveName);
        })
        .catch((error) => {
          console.error("Error fetching executive name:", error);
        });
    }
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("executive_id", executiveId);
      formData.append("executive_name", executiveName);

      axios
        .post("https://virtuebyte.onrender.com/upload", formData)
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Upload PDF File</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <IonItem>
            <IonLabel>Select a PDF file:</IonLabel>
            <input
              type="file"
              accept=".pdf"
              required
              onChange={handleFileChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Executive ID:</IonLabel>
            <IonInput value={executiveId} readonly />
          </IonItem>
          <IonItem>
            <IonLabel>Executive Name:</IonLabel>
            <IonInput value={executiveName} readonly />
          </IonItem>
          <IonButton type="submit">Upload</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default FileUpload;
