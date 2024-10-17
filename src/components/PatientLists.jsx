import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axios_instance"; 
import { FaSearch } from "react-icons/fa"; 

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await instance.get("/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientClick = (patientId) => {
    navigate(`/patients/${patientId}`); 
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl italic text-center font-semibold mb-4 text-teal-600">
        Patients List
      </h2>
      <div className="mb-4 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search Patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pr-12 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
          />
          <button className="absolute right-0 top-0 mt-2 mr-2 p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition duration-200">
            <FaSearch />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium border-b">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium border-b">Age</th>
              <th className="px-6 py-3 text-left text-sm font-medium border-b">Condition</th>
              <th className="px-6 py-3 text-left text-sm font-medium border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              filteredPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="hover:bg-gray-100 transition duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {patient.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {patient.condition}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handlePatientClick(patient._id)}
                      className="py-1 px-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
