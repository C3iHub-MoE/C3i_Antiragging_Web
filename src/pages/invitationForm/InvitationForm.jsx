import React, { useState } from "react";
import axios from "axios";
import styles from "./InvitationForm.module.css";

const InvitationForm = ({ memberType }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const invitationData = {
      email,
      memberType,
    };
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the Bearer token here
      "Content-Type": "application/json",
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}invite/`,
        invitationData,
        {
          headers,
        }
      );
      setSuccess("Invitation sent successfully!");
      setEmail("");
    } catch (error) {
      console.error("Error sending invitation", error);
      setError("Failed to send invitation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Invite a new Member {memberType}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send Invitation"}
        </button>
      </form>
    </div>
  );
};

export default InvitationForm;
