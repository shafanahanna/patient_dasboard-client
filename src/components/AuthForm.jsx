import React, { useState, useEffect } from "react";
import instance from "../axios/axios_instance";

const AuthForm = () => {
  const [patientId, setPatientId] = useState("");
  const [treatment, setTreatment] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");
  const [insurancePlan, setInsurancePlan] = useState("");
  const [dateOfService, setDateOfService] = useState("");
  const [diagnosisCode, setDiagnosisCode] = useState("");
  const [status, setStatus] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await instance.get("/patients");
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchTreatment = async () => {
      if (patientId) {
        try {
          const response = await instance.get(`/patients/${patientId}`); 
          setTreatment(response.data.treatment); 
        } catch (error) {
          console.error(error);
        }
      } else {
        setTreatment("");
      }
    };

    fetchTreatment();
  }, [patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/authform", {
        patientId,
        treatment,
        doctorNotes,
        insurancePlan,
        dateOfService,
        diagnosisCode,
        status,
      });
      console.log(response.data);
      // Reset form fields
      setPatientId("");
      setTreatment("");
      setDoctorNotes("");
      setInsurancePlan("");
      setDateOfService("");
      setDiagnosisCode("");
      setStatus("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-3">Prior Authorization Form</h2>

      <div className="mb-3">
        <label className="block mb-1" htmlFor="patientId">
          Select Patient:
        </label>
        <select
          id="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="treatment">
          Treatment:
        </label>
        <input
          id="treatment"
          type="text"
          placeholder="Treatment"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="doctorNotes">
          Doctor Notes:
        </label>
        <textarea
          id="doctorNotes"
          placeholder="Doctor Notes"
          value={doctorNotes}
          onChange={(e) => setDoctorNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="insurancePlan">
          Insurance Plan:
        </label>
        <input
          id="insurancePlan"
          type="text"
          placeholder="Insurance Plan"
          value={insurancePlan}
          onChange={(e) => setInsurancePlan(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="dateOfService">
          Date of Service:
        </label>
        <input
          id="dateOfService"
          type="date"
          value={dateOfService}
          onChange={(e) => setDateOfService(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="diagnosisCode">
          Diagnosis Code:
        </label>
        <input
          id="diagnosisCode"
          type="text"
          placeholder="Diagnosis Code"
          value={diagnosisCode}
          onChange={(e) => setDiagnosisCode(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1" htmlFor="status">
          Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition duration-200"
      >
        ADD
      </button>
    </form>
  );
};

export default AuthForm;
