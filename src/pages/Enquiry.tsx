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
  IonCol,
  IonRow,
} from "@ionic/react";
import "./Enquiry.css"; // Import your custom CSS file
import logo from "../assets/gapeseed-logo.png"; // Import your logo image file

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
    file_upload: "",
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
      <IonContent className="enquiry-content ion-padding">
        <IonRow className="ion-text-center">
          <IonCol>
            <img src={logo} alt="Logo" className="profile-logo" />{" "}
            {/* <h3>View Enquiry</h3> */}
          </IonCol>
        </IonRow>
        <IonAccordionGroup>
          {/* Customer Details */}
          <IonAccordion value="customer-details" style={{ margin: "1em 0" }}>
            <IonItem slot="header">
              <IonLabel>Customer Details</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Pan_Card"
                  value={formData.Pan_Card}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Pan Card"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Adhar_Card"
                  value={formData.Adhar_Card}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Adhar Card"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Adhar Card</IonLabel>
                <IonInput
                  name="Adhar_Card"
                  value={formData.Adhar_Card}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Cancelled_cheque"
                  value={formData.Cancelled_cheque}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Cancelled Cheque"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Cancelled Cheque</IonLabel>
                <IonInput
                  name="Cancelled_cheque"
                  value={formData.Cancelled_cheque}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              {/* <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Employeement_Status"
                  value={formData.Employeement_Status}
                  onIonChange={(e) =>
                    handleSelectChange(e, "Employeement_Status")
                  }
                  className="enquiry-input"
                  placeholder="Employeement_Status"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem> */}
              <IonItem>
                <IonLabel>Employeement Status</IonLabel>
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
          <IonAccordion
            value="personal-information"
            style={{ margin: "1em 0" }}
          >
            <IonItem slot="header">
              <IonLabel>Personal Information</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="name"
                  value={formData.name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Name"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Name</IonLabel>
                <IonInput
                  name="name"
                  value={formData.name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="mobile_nu"
                  value={formData.mobile_nu}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Mobile Number"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Mobile Number</IonLabel>
                <IonInput
                  name="mobile_nu"
                  value={formData.mobile_nu}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Alternative_Mobile"
                  value={formData.Alternative_Mobile}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Alternative Mobile"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Alternative Mobile</IonLabel>
                <IonInput
                  name="Alternative_Mobile"
                  value={formData.Alternative_Mobile}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Mother_Name"
                  value={formData.Mother_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Mother's Name"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Mother's Name</IonLabel>
                <IonInput
                  name="Mother_Name"
                  value={formData.Mother_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Last_Education"
                  value={formData.Last_Education}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Last Education"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Last Education</IonLabel>
                <IonInput
                  name="Last_Education"
                  value={formData.Last_Education}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Email"
                  value={formData.Email}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Email"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  name="Email"
                  value={formData.Email}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              {/* <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Married_Status"
                  value={formData.Married_Status}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Married Status"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem> */}
              {/* <IonItem>
                <IonLabel position="stacked">Married Status</IonLabel>
                <IonInput
                  name="Married_Status"
                  value={formData.Married_Status}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem>
                <IonLabel>Life Stage</IonLabel>
                <IonSelect
                  interface="popover"
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
          <IonAccordion value="nominee-information" style={{ margin: "1em 0" }}>
            <IonItem slot="header">
              <IonLabel>Nominee Information</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Nominee_Name"
                  value={formData.Nominee_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Nominee Name"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Nominee Name</IonLabel>
                <IonInput
                  name="Nominee_Name"
                  value={formData.Nominee_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Nominee_DOB"
                  value={formData.Nominee_DOB}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Nominee DOB"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Nominee DOB</IonLabel>
                <IonInput
                  name="Nominee_DOB"
                  value={formData.Nominee_DOB}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Nominee_Ralationship"
                  value={formData.Nominee_Ralationship}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Nominee Relationship"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Nominee Relationship</IonLabel>
                <IonInput
                  name="Nominee_Ralationship"
                  value={formData.Nominee_Ralationship}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
            </div>
          </IonAccordion>

          {/* Work Details */}
          <IonAccordion value="work-details" style={{ margin: "1em 0" }}>
            <IonItem slot="header">
              <IonLabel>Work Details</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Company_Name"
                  value={formData.Company_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Company Name"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Company Name</IonLabel>
                <IonInput
                  name="Company_Name"
                  value={formData.Company_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Annual_Income"
                  value={formData.Annual_Income}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Annual Income"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Annual Income</IonLabel>
                <IonInput
                  name="Annual_Income"
                  value={formData.Annual_Income}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Industry_Name"
                  value={formData.Industry_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Industry Name"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Industry Name</IonLabel>
                <IonInput
                  name="Industry_Name"
                  value={formData.Industry_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
            </div>
          </IonAccordion>

          {/* Physical Information */}
          <IonAccordion
            value="physical-information"
            style={{ margin: "1em 0" }}
          >
            <IonItem slot="header">
              <IonLabel>Physical Information</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem
                style={{
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Height"
                  value={formData.Height}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Height"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Height</IonLabel>
                <IonInput
                  name="Height"
                  value={formData.Height}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Weight"
                  value={formData.Weight}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Weight"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Weight</IonLabel>
                <IonInput
                  name="Weight"
                  value={formData.Weight}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="Life_Cover"
                  value={formData.Life_Cover}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Life Cover"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Life Cover</IonLabel>
                <IonInput
                  name="Life_Cover"
                  value={formData.Life_Cover}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <IonInput
                  name="medical_History"
                  value={formData.medical_History}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Medical History"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
                />
              </IonItem>
              {/* <IonItem>
                <IonLabel position="stacked">Medical History</IonLabel>
                <IonInput
                  name="medical_History"
                  value={formData.medical_History}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                />
              </IonItem> */}
            </div>
          </IonAccordion>
          {/* File upload */}
          <IonAccordion value="file_upload" style={{ margin: "1em 0" }}>
            <IonItem slot="header">
              <IonLabel>File upload</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem
                style={{
                  // border: "1px solid",
                  margin: "0.5em 0",
                  display: "flex",
                  alignItem: "center",
                }}
              >
                <input
                  name="Height"
                  type="file"
                  // value={formData.Height}
                  // onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Upload file"
                  style={{
                    display: "flex",
                    alignItem: "center",
                  }}
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
