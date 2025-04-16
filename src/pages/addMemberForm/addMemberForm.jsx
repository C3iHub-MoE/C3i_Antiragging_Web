import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../invitationMemberForm/InviteMemberForm.module.css";
import axios from "axios";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

const AddMemberForm = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("squad_member");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCollege, setSelectedCollege] = useState();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [, setLoadingSec] = useState(false);
  const [inviteDetails, setInviteDetails] = useState([]);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const validateMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);

  console.log("se", selectedCollege);

  //   const getInvitationDetails = useCallback(async () => {
  //     setLoadingSec(true);
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_BACKEND_API_BASE_URL}invite/get-invitation-details/`,
  //         {
  //           token: exactToken,
  //         }
  //       );
  //       console.log("res", res);
  //       setInviteDetails(res?.data?.data);
  //     } catch (error) {
  //       console.log("ertyuio", error);
  //     } finally {
  //       setLoadingSec(false);
  //     }
  //   }, [exactToken]);

  //   useEffect(() => {
  //     getInvitationDetails();
  //   }, [getInvitationDetails]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMobileNumber(mobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }
    if (mobile === 10) {
      setError("Please enter 10 digit mobile number.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = {
      username: userName,
      mobile_number: mobile,
      name: name,
      email: email,
      role: role,
      college: selectedCollege,
      password: password,
      confirm_password: confirmPassword,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the Bearer token here
      "Content-Type": "application/json",
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}register-first-squad-member/`,
        formData,
        {
          headers,
        }
      );
      setSuccess("Registeration successfully!");
      setName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setMobile("+91");
      navigate("/member_page");
    } catch (error) {
      console.error("Error in Register", error);
      setError(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  console.log(validateMobileNumber(mobile));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add Member</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="mobile" className={styles.label}>
            Mobile:
          </label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={styles.input}
            maxLength="13"
            pattern="/^(?:\+91[-\s]?)?[0-9]{10}$/"
            required
            placeholder="+91XXXXXXXXXX"
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <div className={styles.passwordInputGroup}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordInput}
              placeholder="Enter password"
              required
            />
            <span
              className={styles.hideAndShow}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiSolidHide /> : <BiSolidShow />}
            </span>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Confirm Password</label>
          <div className={styles.passwordInputGroup}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.passwordInput}
              placeholder="Confirm new password"
              required
            />
            <span
              className={styles.hideAndShow}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <BiSolidHide /> : <BiSolidShow />}
            </span>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Role:
          </label>
          <input
            type="text"
            id="role"
            defaultValue={role?.replace(/_/g, " ")}
            disabled
            className={styles.input}
            // required
          />
        </div>
        {/* <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            College:
          </label>
          <input
            type="text"
            id="college"
            defaultValue={inviteDetails?.college_name}
            disabled
            className={styles.input}
            // required
          />
        </div> */}

        {/* State Selector */}
        <select
          className={styles.formSelectInput}
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
        {/* {districts.length > 0 && ( */}
        <select
          disabled={districts.length > 0 ? false : true}
          className={styles.formSelectInput}
          onChange={(e) => setSelectedDistrict(e.target.value)}
        >
          <option value="">Select a District</option>
          {districts.map((district) => (
            <option key={district.value} value={district.value}>
              {district.name}
            </option>
          ))}
        </select>
        {/* )} */}
        {/* collage Selector */}
        {/* {colleges.length > 0 && ( */}
        <select
          disabled={colleges.length > 0 ? false : true}
          className={styles.formSelectInput}
          onChange={(e) => setSelectedCollege(e.target.value)}
        >
          <option value="">Select a collage</option>
          {colleges.map((collage) => (
            <option key={collage.value} value={collage.value}>
              {collage.name}
            </option>
          ))}
        </select>
        {/* )} */}
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;
