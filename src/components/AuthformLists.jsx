import React, { useEffect, useState } from "react";
import instance from "../axios/axios_instance";
import { FaSearch } from "react-icons/fa"; 

const AuthformList = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await instance.get("/authform");
        setRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((request) =>
    request.patientId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-teal-600">
        Authorization Lists
      </h2>

      <div className="relative w-full max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by Patient Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pr-12 border border-gray-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
        />
        <button className="absolute right-0 top-0 mt-2 mr-2 p-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition duration-200">
          <FaSearch />
        </button>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">
          No authorization requests found.
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredRequests.map((request) => (
            <li
              key={request._id}
              className="bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-xl font-bold text-teal-600">
                {request.patientId?.name || "N/A"}
              </h3>
              <div className="text-gray-700 mt-2 space-y-1">
                <p>
                  <strong>Treatment:</strong> {request.treatment || "N/A"}
                </p>
                <p>
                  <strong>Doctor Notes:</strong> {request.doctorNotes || "N/A"}
                </p>
                <p>
                  <strong>Insurance Plan:</strong> {request.insurancePlan || "N/A"}
                </p>
                <p>
                  <strong>Date of Service:</strong>{" "}
                  {new Date(request.dateOfService).toLocaleDateString() || "N/A"}
                </p>
                <p>
                  <strong>Diagnosis Code:</strong> {request.diagnosisCode || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {request.status || "N/A"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuthformList;
