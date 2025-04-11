import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./InviteMemberForm.module.css";
import axios from "axios";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

const InviteMemberForm = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [, setLoadingSec] = useState(false);
  const [inviteDetails, setInviteDetails] = useState([]);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  // const role = searchParams.get("role");
  // const college = searchParams.get("college");
  // const inviteBy = searchParams.get("inviteBy");
  // const email = searchParams.get("email");
  const token = searchParams.get("token");
  const exactToken = token?.replace(/ /g, "+");
  // const key = searchParams.get("key");
  // console.log(role, college, inviteBy);

  const validateMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);

  const getInvitationDetails = useCallback(async () => {
    setLoadingSec(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}invite/get-invitation-details/`,
        {
          token: exactToken,
        }
      );
      console.log("res", res);
      setInviteDetails(res?.data?.data);
    } catch (error) {
      console.log("ertyuio", error);
    } finally {
      setLoadingSec(false);
    }
  }, [exactToken]);

  useEffect(() => {
    getInvitationDetails();
  }, [getInvitationDetails]);

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
      email: inviteDetails?.email,
      role: inviteDetails?.role,
      college: inviteDetails?.college_id,
      password: password,
      confirm_password: confirmPassword,
      invited_by_email: inviteDetails?.invited_by,
    };
    // const headers = {
    //   Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the Bearer token here
    //   "Content-Type": "application/json",
    // };

    try {
      await axios.post(
        "http://172.29.27.115:8001/api/register/member/",
        formData
        // {
        //   headers,
        // }
      );
      setSuccess("Registeration successfully!");
      setName("");
      setUserName("");
      setMobile("+91");
      navigate("/");
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
      <h2 className={styles.title}>Invitation Member</h2>
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
            defaultValue={inviteDetails?.role?.replace(/_/g, " ")}
            disabled
            className={styles.input}
            // required
          />
        </div>
        <div className={styles.inputGroup}>
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
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Invite By:
          </label>
          <input
            type="text"
            id="inviteBy"
            defaultValue={inviteDetails?.invited_by}
            disabled
            className={styles.input}
            // required
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InviteMemberForm;
