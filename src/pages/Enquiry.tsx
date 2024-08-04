import React, { useState, useEffect } from "react";
import axios from "axios";
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
  IonItemDivider,
  IonText,
  IonList,
} from "@ionic/react";
import "./Enquiry.css"; // Import your custom CSS file
import logo from "../assets/gapeseed-logo.png"; // Import your logo image file

const EnquiryPage: React.FC = () => {
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
    Executive_Id: "",
    Executive_Name: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formDataState, setFormDataState] = useState({
    Executive_Id: "",
    Executive_Name: "",
  });
  useEffect(() => {
    const executiveId = localStorage.getItem("userId");
    console.log("Executive ID:", executiveId);

    if (executiveId) {
      axios
        .get(`http://localhost:4000/api/clients/_id/${executiveId}`)
        .then((response) => {
          console.log("Executive details response:", response.data);

          if (response.data && response.data.length > 0) {
            const { clientName } = response.data[0];
            console.log("Client name:", clientName);

            setFormDataState({
              Executive_Id: executiveId,
              Executive_Name: clientName,
            });
          } else {
            console.error(
              "Client details not found in response data:",
              response.data
            );
          }
        })
        .catch((error) => {
          console.error("Error fetching executive details:", error);
        });
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: any, name: string) => {
    setFormData({ ...formData, [name]: e.detail.value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: any = {};

    const requiredFields = [
      "Pan_Card",
      "Adhar_Card",
      "name",
      "mobile_nu",
      "Mother_Name",
      "Email",
      "Nominee_Name",
      "Nominee_Ralationship",
      "Company_Name",
      "Annual_Income",
      "Industry_Name",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        valid = false;
        newErrors[field] = "This field is required";
      }
    });

    if (formData.name && !/^[A-Za-z\s]+$/.test(formData.name)) {
      valid = false;
      newErrors.name = "Invalid name format";
    }

    if (formData.mobile_nu && !/^\d{10}$/.test(formData.mobile_nu)) {
      valid = false;
      newErrors.mobile_nu = "Mobile number must be exactly 10 digits";
    }

    if (
      formData.Alternative_Mobile &&
      !/^\d{10}$/.test(formData.Alternative_Mobile)
    ) {
      valid = false;
      newErrors.Alternative_Mobile =
        "Alternative mobile number must be exactly 10 digits";
    }

    if (formData.Email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
      valid = false;
      newErrors.Email = "Invalid email format";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    console.log("Form Data:", formData);
    if (!validateForm()) {
      setAlertMessage("Please fix the errors in the form.");
      setShowAlert(true);
      return;
    }

    try {
      const apiUrl = "http://localhost:4000/api/enquiry";
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        throw new Error("Network response was not ok");
      }

      console.log("Enquiry saved:", response.data);
      setAlertMessage("Enquiry saved successfully!");
      setShowAlert(true);
    } catch (error) {
      console.error("Error saving enquiry:", error);
      setAlertMessage("Failed to save enquiry. Please try again.");
      setShowAlert(true);
    }
  };

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (file) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("executive_id", formDataState.Executive_Id || "");
      uploadData.append("executive_name", formDataState.Executive_Name || "");

      axios
        .post("https://virtuebyte.onrender.com/upload", uploadData)
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error(
            "Error uploading file:",
            error.response?.data || error.message
          );
        });
    }
  };

  return (
    <IonPage>
      <IonContent className="enquiry-content ion-padding">
        <IonRow className="ion-text-center">
          <IonCol>
            <img src={logo} alt="Logo" className="profile-logo" />
          </IonCol>
        </IonRow>
        <IonAccordionGroup>
          {/* Customer Details */}
          <IonAccordion value="customer-details" style={{ margin: "1em 0" }}>
            <IonItem slot="header">
              <IonLabel>Customer Details</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Pan_Card"
                  value={formData.Pan_Card}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Pan Card"
                />
                {errors.Pan_Card && (
                  <div className="error">{errors.Pan_Card}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Adhar_Card"
                  value={formData.Adhar_Card}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Adhar Card"
                />
                {errors.Adhar_Card && (
                  <div className="error">{errors.Adhar_Card}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Cancelled_cheque"
                  type="text"
                  value={formData.Cancelled_cheque}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Cancelled Cheque"
                />
                {errors.Cancelled_cheque && (
                  <div className="error">{errors.Cancelled_cheque}</div>
                )}
              </IonItem>
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
                {errors.Employeement_Status && (
                  <div className="error">{errors.Employeement_Status}</div>
                )}
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
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="name"
                  type="text"
                  value={formData.name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Name"
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="mobile_nu"
                  type="tel"
                  value={formData.mobile_nu}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Mobile Number"
                  maxlength={10}
                />
                {errors.mobile_nu && (
                  <div className="error">{errors.mobile_nu}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Alternative_Mobile"
                  type="tel"
                  value={formData.Alternative_Mobile}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Alternative Mobile"
                  maxlength={10}
                />
                {errors.Alternative_Mobile && (
                  <div className="error">{errors.Alternative_Mobile}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Mother_Name"
                  value={formData.Mother_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Mother's Name"
                />
                {errors.Mother_Name && (
                  <div className="error">{errors.Mother_Name}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Last_Education"
                  value={formData.Last_Education}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Last Education"
                />
                {errors.Last_Education && (
                  <div className="error">{errors.Last_Education}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Email"
                  value={formData.Email}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Email"
                />
                {errors.Email && <div className="error">{errors.Email}</div>}
              </IonItem>
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
                {errors.lifeStage && (
                  <div className="error">{errors.lifeStage}</div>
                )}
              </IonItem>
            </div>
          </IonAccordion>

          {/* Nominee Information */}
          <IonAccordion value="nominee-information" style={{ margin: "1em 0" }}>
            <IonItem slot="header">
              <IonLabel>Nominee Information</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Nominee_Name"
                  value={formData.Nominee_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Nominee Name"
                />
                {errors.Nominee_Name && (
                  <div className="error">{errors.Nominee_Name}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <label htmlFor="">
                  Nominee DOB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
                <IonInput
                  name="Nominee_DOB"
                  type="date"
                  value={formData.Nominee_DOB}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Nominee DOB"
                />
                {errors.Nominee_DOB && (
                  <div className="error">{errors.Nominee_DOB}</div>
                )}
              </IonItem>

              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Nominee_Ralationship"
                  value={formData.Nominee_Ralationship}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Nominee Relationship"
                />
                {errors.Nominee_Ralationship && (
                  <div className="error">{errors.Nominee_Ralationship}</div>
                )}
              </IonItem>
            </div>
          </IonAccordion>

          {/* Work Details */}
          <IonAccordion value="work-details" style={{ margin: "1em 0" }}>
            <IonItem slot="header">
              <IonLabel>Work Details</IonLabel>
            </IonItem>
            <div slot="content">
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Company_Name"
                  value={formData.Company_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Company Name"
                />
                {errors.Company_Name && (
                  <div className="error">{errors.Company_Name}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Annual_Income"
                  value={formData.Annual_Income}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Annual Income"
                />
                {errors.Annual_Income && (
                  <div className="error">{errors.Annual_Income}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Industry_Name"
                  value={formData.Industry_Name}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Industry Name"
                />
                {errors.Industry_Name && (
                  <div className="error">{errors.Industry_Name}</div>
                )}
              </IonItem>
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
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Height"
                  value={formData.Height}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Height"
                />
                {errors.Height && <div className="error">{errors.Height}</div>}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Weight"
                  value={formData.Weight}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Weight"
                />
                {errors.Weight && <div className="error">{errors.Weight}</div>}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="Life_Cover"
                  value={formData.Life_Cover}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Life Cover"
                />
                {errors.Life_Cover && (
                  <div className="error">{errors.Life_Cover}</div>
                )}
              </IonItem>
              <IonItem style={{ margin: "0.5em 0" }}>
                <IonInput
                  name="medical_History"
                  value={formData.medical_History}
                  onIonChange={handleChange}
                  fill="outline"
                  className="enquiry-input"
                  placeholder="Medical History"
                />
                {errors.medical_History && (
                  <div className="error">{errors.medical_History}</div>
                )}
              </IonItem>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

        <div>
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
            {/* <IonItem>
              <IonLabel>Executive ID:</IonLabel>
              <IonInput value={formData.Executive_Id} readonly />
            </IonItem>
            <IonItem>
              <IonLabel>Executive Name:</IonLabel>
              <IonInput value={formData.Executive_Name} readonly />
            </IonItem> */}

            <IonButton type="submit">Upload</IonButton>

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
          </form>
        </div>

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
