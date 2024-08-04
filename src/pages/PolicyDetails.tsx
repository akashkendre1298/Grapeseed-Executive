import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonSearchbar,
} from "@ionic/react";
import axios from "axios";
import { add, remove } from "ionicons/icons";
import "./PolicyDetails.css";

const PolicyDetails: React.FC = () => {
  const [policyDetails, setPolicyDetails] = useState<any[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<any[]>([]);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/maxlifedata"
        );
        setPolicyDetails(response.data);
        setFilteredPolicies(response.data); // Initially set filtered policies to all policies
      } catch (error) {
        console.error("Error fetching the policy details:", error);
      }
    };

    fetchPolicyDetails();
  }, []);

  const toggleAccordion = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  const handleSearch = (event: CustomEvent) => {
    const searchQuery = event.detail.value as string;
    setSearchText(searchQuery);
    filterPolicies(searchQuery);
  };

  const filterPolicies = (query: string) => {
    if (!query) {
      setFilteredPolicies(policyDetails); // If empty query, show all policies
    } else {
      const filtered = policyDetails.filter(
        (policy) =>
          (policy.policyNo &&
            policy.policyNo.toLowerCase().includes(query.toLowerCase())) ||
          (policy.policyholder &&
            policy.policyholder.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredPolicies(filtered);
    }
  };

  if (policyDetails.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Policy Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Loading...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Policy Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={searchText}
          onIonInput={handleSearch}
          debounce={500}
          placeholder="Search by Policy No or Policyholder"
        />
        <IonList>
          {filteredPolicies.map((policy, index) => (
            <IonItem key={index} className="accordion-item">
              <IonLabel className="accordion-label">
                <h2
                  className="accordion-title"
                  onClick={() => toggleAccordion(index)}
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Policy No: {policy["Policy Number"]}
                  <IonIcon icon={expandedItem === index ? remove : add} />
                </h2>
                {expandedItem === index && (
                  <div className="accordion-content">
                    <div className="policy-details">
                      <h2>Policyholder Name</h2>
                      <p>{policy["Policyholder Name"]}</p>
                      <h2>Premium Payment Mode</h2>
                      <p>{policy["Premium Payment Mode"]}</p>
                      <h2>Policy Number</h2>
                      <p>{policy["Policy Number"]}</p>
                      <h2>Date of Commencement</h2>
                      <p>{policy["Date of Commencement"]}</p>
                      <h2>Sum Assured</h2>
                      <p>{policy["Sum Assured"]}</p>
                      <h2>Monthly Income Benefit</h2>
                      <p>{policy["Monthly Income Benefit"]}</p>
                      <h2>Maturity Date</h2>
                      <p>{policy["Maturity Date"]}</p>
                      <h2>Policy Term</h2>
                      <p>{policy["Policy Term"]}</p>
                      <h2>Death Benefit</h2>
                      <p>{policy["Death Benefit"]}</p>
                      <h2>Premium Payment Term</h2>
                      <p>{policy["Premium Payment Term"]}</p>
                      <h2>Premium Amount</h2>
                      <p>{policy["Premium Amount"]}</p>
                      <h2>Premium Payment Due Date</h2>
                      <p>{policy["Premium Payment Due Date"]}</p>
                      <h2>Last Premium Due Date</h2>
                      <p>{policy["Last Premium Due Date"]}</p>
                      <h2>Policy No./ Proposal No</h2>
                      <p>{policy["Policy No./ Proposal No"]}</p>
                      <h2>Date of Proposal</h2>
                      <p>{policy["Date of Proposal"]}</p>
                      <h2>Policyholder</h2>
                      <p>{policy.policyholder}</p>
                      <h2>PAN</h2>
                      <p>{policy.pan}</p>
                      <h2>Relationship</h2>
                      <p>{policy.relationship}</p>
                      <h2>Date of Birth</h2>
                      <p>{policy.date_of_birth}</p>
                      <h2>Address</h2>
                      <p>{policy.address}</p>
                      <h2>Gender</h2>
                      <p>{policy.gender}</p>
                      <h2>Tel. No</h2>
                      <p>{policy.tel_no}</p>
                      <h2>Email</h2>
                      <p>{policy.email}</p>
                      <h2>Life Insured</h2>
                      <p>{policy.life_insured}</p>
                      <h2>Age</h2>
                      <p>{policy.age}</p>
                      <h2>Age Admitted</h2>
                      <p>{policy.age_admitted}</p>
                      <h2>Nominee</h2>
                      <p>{policy.nominee}</p>
                      <h2>Executive Name </h2>
                      <p>{policy["Executive Name"]}</p>
                    </div>
                  </div>
                )}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PolicyDetails;
