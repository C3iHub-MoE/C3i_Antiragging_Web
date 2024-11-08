import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './InviteForm.module.css';

const InviteForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('+91');
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // Timer for OTP resend
  const [resendDisabled, setResendDisabled] = useState(false);

  // Get token from URL
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  // Fetch data using token
  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/verify-token?token=${token}`);
          const { email, name } = response.data;
          setEmail(email);
          setName(name);
          setLoading(false);
        } catch (err) {
          setError('Invalid or expired token');
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [token]);

  // Fetch colleges data
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('/api/colleges');
        setColleges(response.data);
      } catch (err) {
        setError('Error fetching colleges');
      }
    };
    fetchColleges();
  }, []);

  // Filter colleges based on search term
  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle initial form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      name,
      gender,
      mobile,
      college: selectedCollege,
    };

    try {
      await axios.post('/api/send-otp', formData); // Sends OTP
      setOtpSent(true); // Move to OTP entry screen
      setResendDisabled(true); // Disable resend OTP button
      startTimer(); // Start the OTP timer
    } catch (error) {
      setError('Error sending OTP');
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/verify-otp', { email, otp }); // Verify OTP
      await axios.post('/api/user/register', { email, name, gender, mobile, college: selectedCollege }); // Register user
      alert('Invitation accepted and registered successfully!');
    } catch (error) {
      setError('Invalid OTP');
    }
  };

  // Timer for OTP resend
  const startTimer = () => {
    let countdown = timer;
    const interval = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        setTimer(countdown);
      } else {
        clearInterval(interval);
        setResendDisabled(false); // Re-enable resend OTP button after 2 minutes
      }
    }, 1000);
  };

  // Handle OTP resend
  const handleResendOtp = async () => {
    setTimer(120); // Reset timer to 2 minutes
    setResendDisabled(true); // Disable resend button during the timer
    await handleSubmit(); // Send OTP again
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Accept Invitation</h2>
      {(
        !otpSent ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Name:</label>
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
              <label htmlFor="gender" className={styles.label}>Gender:</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={styles.input}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mobile" className={styles.label}>Mobile:</label>
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
              <label htmlFor="college" className={styles.label}>College:</label>
              <input
                type="text"
                placeholder="Search college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.input}
              />
              <select
                id="college"
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className={styles.input}
                required
              >
                <option value="">Select College</option>
                {filteredColleges.map((college) => (
                  <option key={college.id} value={college.id}>
                    {college.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={styles.button}>
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.inputGroup}>
              <label htmlFor="otp" className={styles.label}>Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={styles.input}
                maxLength="6"
                required
              />
            </div>

            <button type="submit" className={styles.button}>
              Submit OTP
            </button>

            <div className={styles.timer}>
              {timer > 0 ? (
                <p>Resend OTP in {Math.floor(timer / 60)}:{timer % 60}</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className={styles.button}
                  disabled={resendDisabled}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        )
      )}
    </div>
  );
};

export default InviteForm;
