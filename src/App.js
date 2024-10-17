import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PatientList from "./components/PatientLists";
import AddPatient from "./components/AddPatients";
import AuthForm from "./components/AuthForm";
import AdminLogin from "./components/AdminLogin";
import AuthorizationRequestList from "./components/AuthformLists";
import PatientDetails from "./components/PatientDetails";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false); 

  return (
    <Routes>
      <Route path="/" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
      <Route path="/dashboard" element={<Dashboard setIsAdmin={setIsAdmin} />}>
        {" "}
        <Route index element={<PatientList />} />
        <Route path="patients" element={<PatientList />} />

        <Route path="add-patient" element={<AddPatient />} />
        <Route path="authform" element={<AuthForm />} />
        <Route path="authform-list" element={<AuthorizationRequestList />} />

      </Route>
      <Route path="/patients/:patientId" element={<PatientDetails />} />

    </Routes>
  );
};

export default App;
