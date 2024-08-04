import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./UpdateStatus.css";
import logo from "../assets/gapeseed-logo.png"; // Import your logo image file

const UpdateStatus = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [showDetailsMap, setShowDetailsMap] = useState({});
  const apiUrl = "http://localhost:4000/api/enquiry";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        setEnquiries(data);
        const initialStatuses = data.reduce((acc, inquiry) => {
          acc[inquiry._id] = inquiry.Enquiry_Status || ""; // Ensure this matches your API's field name
          return acc;
        }, {});
        setStatuses(initialStatuses);
        const initialShowDetailsMap = data.reduce((acc, inquiry) => {
          acc[inquiry._id] = false;
          return acc;
        }, {});
        setShowDetailsMap(initialShowDetailsMap);
      } else {
        console.log("No data found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewMore = (inquiryId) => {
    setShowDetailsMap((prev) => ({ ...prev, [inquiryId]: true }));
  };

  const handleViewLess = (inquiryId) => {
    setShowDetailsMap((prev) => ({ ...prev, [inquiryId]: false }));
  };

  const handleStatusChange = async (inquiryId, status) => {
    try {
      const response = await fetch(`${apiUrl}/${inquiryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Enquiry_Status: status,
        }),
      });

      if (response.ok) {
        console.log("Status edited successfully");
        setStatuses((prevStatuses) => ({
          ...prevStatuses,
          [inquiryId]: status,
        }));
      } else {
        console.log("Error editing status");
      }
    } catch (error) {
      console.error("Error editing status:", error);
    }
  };

  const statusOptions = ["Pending", "Approved", "Rejected"];

  return (
    <IonPage>
      <IonContent className="edit-enquiry-container ion-padding">
        <IonRow className="ion-text-center">
          <IonCol>
            <img src={logo} alt="Logo" className="profile-logo" />{" "}
            {/* <h3>View Enquiry</h3> */}
          </IonCol>
        </IonRow>

        {enquiries.map((inquiryData) => (
          <IonCard key={inquiryData._id} className="edit-enquiry-card">
            <IonCardHeader>
              <IonCardTitle>Customer Details</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonText>Customer Name: {inquiryData.name}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => handleViewMore(inquiryData._id)}
                      className="edit-enquiry-view-more-button"
                    >
                      View More
                    </IonButton>
                    <IonItem className="edit-enquiry-dropdown-button">
                      <IonSelect
                        value={statuses[inquiryData._id] || ""}
                        placeholder="Update Status"
                        interface="popover"
                        onIonChange={(e) =>
                          handleStatusChange(inquiryData._id, e.detail.value)
                        }
                      >
                        {statusOptions.map((option, index) => (
                          <IonSelectOption key={index} value={option}>
                            {option}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
              {showDetailsMap[inquiryData._id] && (
                <>
                  <IonItem>
                    <IonText>Pan Card: {inquiryData.Pan_Card}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Adhar Card: {inquiryData.Adhar_Card}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Cancelled Cheque: {inquiryData.Cancelled_cheque}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Mobile Number: {inquiryData.mobile_nu}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Alternative Mobile: {inquiryData.Alternative_Mobile}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Mother Name: {inquiryData.Mother_Name}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Email: {inquiryData.Email}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Last Education: {inquiryData.Last_Education}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Married Status: {inquiryData.Married_Status}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Nominee Name: {inquiryData.Nominee_Name}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Nominee DOB: {inquiryData.Nominee_DOB}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Nominee Relationship: {inquiryData.Nominee_Ralationship}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Company Name: {inquiryData.Company_Name}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Annual Income: {inquiryData.Annual_Income}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Industry Name: {inquiryData.Industry_Name}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Height: {inquiryData.Height}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Weight: {inquiryData.Weight}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Life Cover: {inquiryData.Life_Cover}</IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Medical History: {inquiryData.medical_History}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>
                      Employment Status: {inquiryData.Employeement_Status}
                    </IonText>
                  </IonItem>
                  <IonItem>
                    <IonText>Status: {statuses[inquiryData._id]}</IonText>
                  </IonItem>
                  <IonButton
                    onClick={() => handleViewLess(inquiryData._id)}
                    className="edit-enquiry-view-more-button"
                  >
                    View Less
                  </IonButton>
                </>
              )}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default UpdateStatus;
