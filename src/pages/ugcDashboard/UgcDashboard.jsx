import { useEffect, useState } from "react";
import axios from "axios";
import "./UgcDashboard.css";
import { useSosAlerts, useSosHistory } from "../../hooks/useData";
import Table from "../../components/table/Table";
import moment from "moment";

const UgcDashboard = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [colleges, setColleges] = useState([]);
  const [activeSOS, setActiveSOS] = useState([]);
  const [error, setError] = useState(null);
  const [, setActiveSosError] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState();

  const { sosData, fetchAlerts, error: liveSosError } = useSosAlerts();
  const { sosHistoryData, fetchSosHistory } = useSosHistory();

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  useEffect(() => {
    fetchSosHistory();
  }, [fetchSosHistory]);

  console.log("123456", sosData, sosHistoryData);
  const sosHistory = sosHistoryData;
  const columns = [
    "Id",
    "Student",
    "Time",
    "Location",
    "Status",
    "Acknowledged By",
    "Resolved At",
  ];
  const dataWithActions = sosHistory.map((sosHistoryItem, index) => ({
    Id: index + 1, // S.No
    Student: sosHistoryItem.student_info.name, // sosHistoryItem Name
    Time: moment(sosHistoryItem.timestamps.triggered_at).format(
      "hh:mm A, DD-MM-YYYY"
    ),
    Location: sosHistoryItem.location.name,
    Status: sosHistoryItem.resolution_details.resolved
      ? "✅ Resolved"
      : "❌ Pending",
    "Acknowledged By": sosHistoryItem.resolution_details.acknowledged_by.name,
    "Resolved At": moment(sosHistoryItem.timestamps.resolved_at).format(
      "hh:mm A, DD-MM-YYYY"
    ),
  }));

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

  // Fetch active sos when a college is selected

  useEffect(() => {
    if (colleges?.length > 0) {
      console.log("sfgf", selectedCollege);
      const fetchActiveSOS = async () => {
        console.log("s", selectedCollege);
        try {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the Bearer token here
            "Content-Type": "application/json",
          };
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_API_BASE_URL}sos/active-sos/?college=${selectedCollege}`,
            { headers }
          );
          setActiveSOS(response.data.data.sos); // adjust if structure differs
        } catch (err) {
          setActiveSosError("Error fetching active SOS");
        }
      };

      fetchActiveSOS();
    }
  }, [selectedCollege]);

  console.log(selectedCollege);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="input-wrapper">
        {/* State Selector */}
        <select
          className={
            districts?.length > 0 ? "input-select" : "input-select-normal"
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
        {districts?.length > 0 && (
          <select
            className="input-select"
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select a District</option>
            {districts?.map((district) => (
              <option key={district.value} value={district.value}>
                {district.name}
              </option>
            ))}
          </select>
        )}
        {/* collage Selector */}
        {colleges?.length > 0 && (
          <select
            className="input-select"
            onChange={(e) => setSelectedCollege(e.target.value)}
          >
            <option value="">Select a collage</option>
            {colleges?.map((collage) => (
              <option key={collage.value} value={collage.value}>
                {collage.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Output */}
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            // justifyContent: "space-between",
            gap: "5rem",
          }}
        >
          <h3>Total Colleges: {colleges?.length}</h3>
          <h3>Active SOS for College:{activeSOS?.length}</h3>
        </div>

        {/* {error ? (
          <div className="error-wrraper">
            {colleges?.length >= 0 ? (
              "No collages found please select state"
            ) : (
              <p style={{ color: "red" }}>{error}</p>
            )}
          </div>
        ) : (
          <div className="error-wrraper">
            {colleges?.length > 0
              ? " No colleges available."
              : " Please select State."}
            {activeSOS?.length > 0 && <p>No Active SOS for College.</p>}
          </div>
        )} */}
      </div>

      <div className="">
        <h1 className="">SOS History</h1>

        {/* Summary Cards */}
        <div className="cards-section">
          <div className="card">
            {" "}
            <h3>Total Alerts:</h3> <p>{sosHistory?.length}</p>
          </div>
          <div className="card">
            <h3>Resolved: </h3>
            <p>
              {sosHistory?.filter((s) => s.resolution_details.resolved)?.length}
            </p>
          </div>

          <div className="card">
            <h3>Video Errors: </h3>
            <p>
              {
                sosHistory.filter(
                  (s) => s.evidence_details.video.error !== "null"
                )?.length
              }
            </p>
          </div>
        </div>
        <Table columns={columns} data={dataWithActions} />
      </div>
    </div>
  );
};

export default UgcDashboard;
