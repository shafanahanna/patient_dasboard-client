import React, { useState } from "react";
import instance from "../axios/axios_instance";
import ClipLoader from "react-spinners/ClipLoader"; 

const AddPatient = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [medications, setMedications] = useState([
    { name: "", prescribedDate: "" },
  ]);
  const [labResults, setLabResults] = useState([{ description: "", date: "" }]);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await instance.post("/patients", {
        name,
        age,
        condition,
        medications,
        labResults,
      });
      console.log(response.data);
      
      setName("");
      setAge("");
      setCondition("");
      setMedications([{ name: "", prescribedDate: "" }]);
      setLabResults([{ description: "", date: "" }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: "", prescribedDate: "" }]);
  };

  const handleAddLabResult = () => {
    setLabResults([...labResults, { description: "", date: "" }]);
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
  };

  const handleLabResultChange = (index, field, value) => {
    const updatedLabResults = [...labResults];
    updatedLabResults[index][field] = value;
    setLabResults(updatedLabResults);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-teal-600">
          Add Patient
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-3 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="mb-3 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <input
          type="text"
          placeholder="Condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="mb-3 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
        />
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-teal-600">
            Medications
          </h3>
          {medications.map((medication, index) => (
            <div key={index} className="mb-3 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Medication Name"
                value={medication.name}
                onChange={(e) =>
                  handleMedicationChange(index, "name", e.target.value)
                }
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 flex-1"
              />
              <input
                type="date"
                value={medication.prescribedDate}
                onChange={(e) =>
                  handleMedicationChange(
                    index,
                    "prescribedDate",
                    e.target.value
                  )
                }
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 flex-1"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMedication}
            className="text-teal-600 hover:underline"
          >
            Add Medication
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2 text-teal-600">
            Lab Results
          </h3>
          {labResults.map((result, index) => (
            <div key={index} className="mb-3 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Lab Result Description"
                value={result.description}
                onChange={(e) =>
                  handleLabResultChange(index, "description", e.target.value)
                }
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 flex-1"
              />
              <input
                type="date"
                value={result.date}
                onChange={(e) =>
                  handleLabResultChange(index, "date", e.target.value)
                }
                required
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 flex-1"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddLabResult}
            className="text-teal-600 hover:underline"
          >
            Add Lab Result
          </button>
        </div>
        <button
          type="submit"
          disabled={loading} 
          className="w-full py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200 relative"
        >
          {loading ? (
            <ClipLoader size={20} color="#ffffff" loading={loading} /> 
          ) : (
            "Add Patient"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddPatient;
