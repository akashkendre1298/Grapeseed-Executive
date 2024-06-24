import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonAlert,
} from "@ionic/react";
import "./Enquiry.css"; // Import your custom CSS file

const EnquiryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    Pan_Card: "",
    Adhar_Card: "",
    Cancelled_cheque: "",
    Employeement_Status: "",
    name: "",
    mobile_nu: "",
    Alternative_Mobile: "",
    Mother_Name: "",
    Last_Education: "",
    Email: "",
    Married_Status: "",
    lifeStage: "",
    Nominee_Name: "",
    Nominee_DOB: "",
    Nominee_Ralationship: "",
    Company_Name: "",
    Annual_Income: "",
    Industry_Name: "",
    Height: "",
    Weight: "",
    Life_Cover: "",
    medical_History: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: any, name: string) => {
    setFormData({ ...formData, [name]: e.detail.value });
  };

  const handleSave = async () => {
    try {
      const apiUrl = "https://grapeseed-executive.onrender.com/api/enquiry";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Enquiry saved:", result);
      setAlertMessage("Enquiry saved successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error saving enquiry:", error);
      setAlertMessage("Failed to save enquiry. Please try again.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Enquiry Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="enquiry-content">
        <IonAccordionGroup>
          {/* Customer Details */}
          <IonAccordion value="customer-details">
            <IonItem slot="header">
              <IonLabel>Customer Details</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem>
                <IonLabel position="stacked">Pan Card</IonLabel>
                <IonInput
                  name="Pan_Card"
                  value={formData.Pan_Card}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Adhar Card</IonLabel>
                <IonInput
                  name="Adhar_Card"
                  value={formData.Adhar_Card}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Cancelled Cheque</IonLabel>
                <IonInput
                  name="Cancelled_cheque"
                  value={formData.Cancelled_cheque}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Employeement Status</IonLabel>
                <IonSelect
                  interface="popover"
                  value={formData.Employeement_Status}
                  onIonChange={(e) =>
                    handleSelectChange(e, "Employeement_Status")
                  }
                  className="enquiry-input"
                >
                  <IonSelectOption value="self_employed">
                    Self Employed
                  </IonSelectOption>
                  <IonSelectOption value="salaried">Salaried</IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>
          </IonAccordion>

          {/* Personal Information */}
          <IonAccordion value="personal-information">
            <IonItem slot="header">
              <IonLabel>Personal Information</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput
                  name="name"
                  value={formData.name}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Mobile Number</IonLabel>
                <IonInput
                  name="mobile_nu"
                  value={formData.mobile_nu}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Alternative Mobile</IonLabel>
                <IonInput
                  name="Alternative_Mobile"
                  value={formData.Alternative_Mobile}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Mother's Name</IonLabel>
                <IonInput
                  name="Mother_Name"
                  value={formData.Mother_Name}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Last Education</IonLabel>
                <IonInput
                  name="Last_Education"
                  value={formData.Last_Education}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  name="Email"
                  value={formData.Email}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Married Status</IonLabel>
                <IonInput
                  name="Married_Status"
                  value={formData.Married_Status}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Life Stage</IonLabel>
                <IonSelect
                  value={formData.lifeStage}
                  onIonChange={(e) => handleSelectChange(e, "lifeStage")}
                  className="enquiry-input"
                >
                  <IonSelectOption value="Single">Single</IonSelectOption>
                  <IonSelectOption value="Married">Married</IonSelectOption>
                  <IonSelectOption value="Married with Children">
                    Married with Children
                  </IonSelectOption>
                  <IonSelectOption value="Close to Retirement">
                    Close to Retirement
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
            </div>
          </IonAccordion>

          {/* Nominee Information */}
          <IonAccordion value="nominee-information">
            <IonItem slot="header">
              <IonLabel>Nominee Information</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem>
                <IonLabel position="stacked">Nominee Name</IonLabel>
                <IonInput
                  name="Nominee_Name"
                  value={formData.Nominee_Name}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Nominee DOB</IonLabel>
                <IonInput
                  name="Nominee_DOB"
                  value={formData.Nominee_DOB}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Nominee Relationship</IonLabel>
                <IonInput
                  name="Nominee_Ralationship"
                  value={formData.Nominee_Ralationship}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
            </div>
          </IonAccordion>

          {/* Work Details */}
          <IonAccordion value="work-details">
            <IonItem slot="header">
              <IonLabel>Work Details</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem>
                <IonLabel position="stacked">Company Name</IonLabel>
                <IonInput
                  name="Company_Name"
                  value={formData.Company_Name}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Annual Income</IonLabel>
                <IonInput
                  name="Annual_Income"
                  value={formData.Annual_Income}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Industry Name</IonLabel>
                <IonInput
                  name="Industry_Name"
                  value={formData.Industry_Name}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
            </div>
          </IonAccordion>

          {/* Physical Information */}
          <IonAccordion value="physical-information">
            <IonItem slot="header">
              <IonLabel>Physical Information</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem>
                <IonLabel position="stacked">Height</IonLabel>
                <IonInput
                  name="Height"
                  value={formData.Height}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Weight</IonLabel>
                <IonInput
                  name="Weight"
                  value={formData.Weight}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Life Cover</IonLabel>
                <IonInput
                  name="Life_Cover"
                  value={formData.Life_Cover}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Medical History</IonLabel>
                <IonInput
                  name="medical_History"
                  value={formData.medical_History}
                  onIonChange={handleChange}
                  className="enquiry-input"
                />
              </IonItem>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        <IonButton
          expand="block"
          onClick={handleSave}
          className="enquiry-save-button"
        >
          Save
        </IonButton>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Alert"}
          message={alertMessage}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EnquiryPage;
