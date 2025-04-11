import { useEffect, useState } from "react";
import axios from "axios";
import "./UgcDashboard.css";

const UgcDashboard = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [colleges, setColleges] = useState([]);
  const [error, setError] = useState(null);

  // Fetch States
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_BASE_URL}states/`
        );
        setStates(response.data.data.states);
      } catch (err) {
        setError("Error fetching states");
      }
    };
    fetchStates();
  }, []);

  // Fetch Districts when a state is selected
  useEffect(() => {
    if (selectedState) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_API_BASE_URL}states/${selectedState}/districts/`
          );
          setDistricts(response.data.data.districts); // adjust if structure is different
        } catch (err) {
          setError("Error fetching districts");
        }
      };
      fetchDistricts();
    }
  }, [selectedState]);

  // Fetch Colleges when a district is selected
  useEffect(() => {
    if (selectedDistrict) {
      const fetchColleges = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_API_BASE_URL}districts/${selectedDistrict}/colleges/`
          );
          setColleges(response.data.data.colleges); // adjust if structure is different
        } catch (err) {
          setError("Error fetching colleges");
        }
      };
      fetchColleges();
    }
  }, [selectedDistrict]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="input-wrapper">
        {/* State Selector */}
        <select
          className={
            districts.length > 0 ? "input-select" : "input-select-normal"
          }
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select a State</option>
          {states.map((state) => (
            <option key={state.value} value={state.value}>
              {state.name}
            </option>
          ))}
        </select>

        {/* District Selector */}
        {districts.length > 0 && (
          <select
            className="input-select"
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select a District</option>
            {districts.map((district) => (
              <option key={district.value} value={district.value}>
                {district.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Output */}
      <div>
        <h3>Total Colleges: {colleges.length}</h3>
        {error || colleges.length >= 0 ? (
          <div className="error-wrraper">
            {colleges.length >= 0 ? (
              "No collages found please select state"
            ) : (
              <p style={{ color: "red" }}>{error}</p>
            )}
          </div>
        ) : (
          <div className="collages-wrapper">
            {colleges.map((college, index) => (
              <p className="" skey={index}>
                {college.name}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
    </div>
  );
};

export default UgcDashboard;
