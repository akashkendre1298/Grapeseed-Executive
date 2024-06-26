import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
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
} from "@ionic/react";
import "./ViewEnquiry.css";
import logo from "../assets/gapeseed-logo.png"; // Import your logo image file
const ViewEnquiry = () => {
  const [expandedCards, setExpandedCards] = useState([]);
  const [inquiryData, setInquiryData] = useState([]);
  const apiUrl = "https://grapeseed-executive.onrender.com/api/enquiry";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setInquiryData(data);
      setExpandedCards(new Array(data.length).fill(false));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewMore = (cardNumber) => {
    setExpandedCards((prevExpandedCards) =>
      prevExpandedCards.map((value, index) =>
        index === cardNumber ? !value : value
      )
    );
  };

  const renderCardFields = (data) => {
    return (
      <>
        <IonItem>
          <IonText>Pan Card: {data.Pan_Card}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Adhar Card: {data.Adhar_Card}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Cancelled Cheque: {data.Cancelled_cheque}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Name: {data.name}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Mobile Number: {data.mobile_nu}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Alternative Mobile: {data.Alternative_Mobile}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Mother Name: {data.Mother_Name}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Email: {data.Email}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Last Education: {data.Last_Education}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Married Status: {data.Married_Status}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Nominee Name: {data.Nominee_Name}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Nominee DOB: {data.Nominee_DOB}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Nominee Relationship: {data.Nominee_Ralationship}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Company Name: {data.Company_Name}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Annual Income: {data.Annual_Income}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Industry Name: {data.Industry_Name}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Height: {data.Height}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Weight: {data.Weight}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Life Cover: {data.Life_Cover}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Medical History: {data.medical_History}</IonText>
        </IonItem>
        <IonItem>
          <IonText>Employment Status: {data.Employeement_Status}</IonText>
        </IonItem>
      </>
    );
  };

  return (
    <IonPage>
      <IonContent className="view-enquiry-content">
        <IonRow className="ion-text-center">
          <IonCol>
            <img src={logo} alt="Logo" className="profile-logo" />{" "}
            {/* <h3>View Enquiry</h3> */}
          </IonCol>
        </IonRow>

        {inquiryData.length > 0 ? (
          inquiryData.map((data, index) => (
            <IonCard key={index} className="card">
              <IonCardHeader>
                <IonCardTitle>Customer Details</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonText>Customer Name: {data.name}</IonText>
                    </IonCol>
                    <IonCol>
                      <IonButton onClick={() => handleViewMore(index)}>
                        {expandedCards[index] ? "View Less" : "View More"}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
                {expandedCards[index] && renderCardFields(data)}
              </IonCardContent>
            </IonCard>
          ))
        ) : (
          <IonText
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            No inquiry data available
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewEnquiry;
