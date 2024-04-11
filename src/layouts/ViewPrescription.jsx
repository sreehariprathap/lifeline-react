import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { db } from "../firebase";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "start",
  },
  divider: {
    borderBottom: "2px solid #333333",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    fontSize: 16,
  },
  division: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    flexDirection: "row",
    fontSize: 14,
  },
  label: {
    fontWeight: "bold",
  },
  info: {
    marginBottom: 10,
  },
  signature: {
    marginTop: 50,
    textAlign: "right",
  },
  diagnosis: {
    fontSize: 16,
    marginBottom: 10,
  },
});

// Function to calculate age from date of birth
const calculateAge = (dob) => {
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dobDate.getDate())
  ) {
    age--;
  }
  return age;
};

const ViewPrescription = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const prescriptionDoc = doc(db, "prescriptions", id);
        const prescriptionSnapshot = await getDoc(prescriptionDoc);

        if (!prescriptionSnapshot.exists()) {
          console.error("Prescription document not found with ID:", id);
          return;
        }

        const prescriptionData = prescriptionSnapshot.data();
        console.log(JSON.stringify(prescriptionData));
        setPrescription(prescriptionData);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [id]);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.container}>
          <View>
            {/* Top Bar */}
            <View style={styles.header}>
              <Text>www.lifeline.com</Text>
              <Text>Phone: 5485770621</Text>
            </View>
            {/* Title Section */}
            <View style={styles.section}>
              <Text style={styles.title}>LifeLine</Text>
              <View style={styles.divider}></View>
            </View>

            {/* Patient and Doctor Info */}
            <View style={styles.division}>
              {/* Patient Info Section */}
              <View style={styles.section}>
                <Text style={styles.label}>Patient Info:</Text>
                <View style={styles.info}>
                  <Text>
                    Name: {prescription?.appointment?.user?.firstName}{" "}
                    {prescription?.appointment?.user?.lastName}
                  </Text>
                  <Text>Email: {prescription?.appointment?.user?.email}</Text>
                  {prescription?.appointment?.user?.phone && (
                    <Text>Phone: {prescription?.appointment?.user?.phone}</Text>
                  )}
                  <Text>
                    Age: {calculateAge(prescription?.appointment?.user?.dob)}
                  </Text>
                  <Text>Height: {prescription?.appointment?.user?.height}</Text>
                  <Text>Weight: {prescription?.appointment?.user?.weight}</Text>
                </View>
              </View>

              {/* Doctor's Info Section */}
              <View style={styles.section}>
                <Text style={styles.label}>Doctor's Info:</Text>
                <View style={styles.info}>
                  <Text>
                    Name: {prescription?.appointment?.doctor?.firstName}{" "}
                    {prescription?.appointment?.doctor?.lastName}
                  </Text>
                  <Text>
                    Specialization:{" "}
                    {prescription?.appointment?.doctor?.specialization}
                  </Text>
                  <Text>Email: {prescription?.appointment?.doctor?.email}</Text>
                  <Text>
                    Office Location:{" "}
                    {prescription?.appointment?.doctor?.officeLocation}
                  </Text>
                </View>
              </View>
            </View>

            {/* Diagnosis Section */}
            <View style={styles.section}>
              <Text style={[styles.label, styles.diagnosis]}>Diagnosis:</Text>
              <View style={styles.info}>
                <Text>Name: {prescription?.diagnosis}</Text>
                <Text>
                  Description: {prescription?.detailedDiagnosisReport}
                </Text>
                <Text>
                  Special Precautions: {prescription?.specialPrecautions}
                </Text>
                <Text>Allergies: {prescription?.allergies}</Text>
              </View>
            </View>

            {/* Medicine Section */}
            <View style={styles.section}>
              <Text style={[styles.label, styles.diagnosis]}>Medicine:</Text>
              <View style={styles.info}>
                {prescription?.medicines?.map((medicine, index) => (
                  <Text key={index}>
                    {medicine.name} - {medicine.dosage} -{" "}
                    {medicine.instructions}
                  </Text>
                ))}
              </View>
            </View>

            {/* Medicine Refills */}
            <View style={styles.section}>
              <Text>
                Medicine Refills:{" "}
                {prescription?.medicineRefills
                  ? prescription?.medicineRefills
                  : 0}
              </Text>
            </View>
          </View>

          {/* Signature */}
          <View style={styles.signature}>
            <Text>
              Signed by Dr. {prescription?.appointment?.doctor?.firstName}{" "}
              {prescription?.appointment?.doctor?.lastName}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ViewPrescription;
