import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaHeartbeat,
  FaPills,
  FaFlask,
  FaStethoscope,
} from "react-icons/fa"; 
import instance from "../axios/axios_instance";

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await instance.get(`/patients/${patientId}`);
        console.log("Patient details response:", response.data);
        setPatient(response.data);
      } catch (error) {
        setError("Error fetching patient details");
        console.error("Error:", error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (error) return <p className="text-red-600 text-center mt-4">{error}</p>;
  if (!patient)
    return <p className="text-gray-500 text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10 bg-teal-500 rounded-lg shadow-2xl">
      <h2 className="text-3xl sm:text-4xl italic font-bold mb-10 text-center text-white">
        Patient Details
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-xl text-teal-700 flex items-center">
            <FaUser className="mr-2 text-teal-500" />
            <span className="font-semibold">Name:</span> {patient.name}
          </p>
          <p className="text-xl text-teal-700 flex items-center">
            <FaCalendarAlt className="mr-2 text-teal-500" />
            <span className="font-semibold">Age:</span> {patient.age}
          </p>
          <p className="text-xl md:col-span-2 text-teal-700 flex items-center">
            <FaStethoscope className="mr-2 text-teal-500" />
            <span className="font-semibold">Condition:</span>{" "}
            {patient.condition}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-teal-700 flex items-center">
          <FaPills className="mr-3 text-teal-500" /> Medications
        </h3>
        <ul className="space-y-4">
          {patient.medications.map((medication, index) => (
            <li
              key={index}
              className="bg-teal-100 text-teal-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <span>{medication.name}</span>
              <span className="text-teal-600">
                {new Date(medication.prescribedDate).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-teal-700 flex items-center">
          <FaFlask className="mr-3 text-teal-500" /> Lab Results
        </h3>
        <ul className="space-y-4">
          {patient.labResults.map((result, index) => (
            <li
              key={index}
              className="bg-teal-100 text-teal-800 p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <span>{result.description}</span>
              <span className="text-teal-600">
                {new Date(result.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetails;
