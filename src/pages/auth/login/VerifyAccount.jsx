// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { AccountSendOtp, AccountVerifyOtp, AccountResendOtp } from '../../../api/user';
// import styles from './VerifyAccount.module.css';

// const VerifyAccount = () => {
//   const [otp, setOtp] = useState('');
//   const [timer, setTimer] = useState(120);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { mobileNumber } = location.state;

//   const handleSendOtp = async () => {
//     try {
//       await AccountSendOtp({ mobile_number: mobileNumber });
//       setTimer(120);
//       setError('');
//     } catch (err) {
//       setError('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       await AccountVerifyOtp({ mobile_number: mobileNumber, otp });
//       navigate('/'); // Navigate to dashboard on success
//     } catch (err) {
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       await AccountResendOtp({ mobile_number: mobileNumber });
//       setTimer(120);
//       setError('');
//     } catch (err) {
//       setError('Failed to resend OTP. Please try again.');
//     }
//   };

//   return (
//     <div className={styles.otpContainer}>
//       <h2 className={styles.title}>Verify OTP</h2>
//       <form onSubmit={handleVerifyOtp} className={styles.form}>
//         <div className={styles.inputGroup}>
//           <label className={styles.label}>OTP</label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             className={styles.input}
//             placeholder="Enter OTP"
//             required
//           />
//         </div>
//         <button type="submit" className={styles.verifyButton}>
//           Verify OTP
//         </button>
//         <p className={styles.timer}>Resend OTP in: {timer}s</p>
//         {timer === 0 && (
//           <button type="button" onClick={handleResendOtp} className={styles.resendButton}>
//             Resend OTP
//           </button>
//         )}
//         {error && <p className={styles.error}>{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default VerifyAccount;



import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AccountSendOtp, AccountVerifyOtp, AccountResendOtp } from '../../../api/user';
import styles from './VerifyAccount.module.css';

const VerifyAccount = () => {
  const [otpSms, setOtpSms] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { mobileNumber, email, username, deviceId, trxId } = location.state;

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleSendOtp = async () => {
    try {
      const payload = {
        username,
        device_id: deviceId,
        purpose: 'OTP for account confirmation',
        mobile_number: mobileNumber,
        email,
      };
      await AccountSendOtp(payload);
      setTimer(120);
      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        trx_id: trxId,
        otp_sms: otpSms,
        otp_email: otpEmail,
        email,
        mobile_number: mobileNumber,
      };
      await AccountVerifyOtp(payload);
      navigate('/'); // Navigate to dashboard on success
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const payload = { trx_id: trxId };
      await AccountResendOtp(payload);
      setTimer(120);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className={styles.otpContainer}>
      <h2 className={styles.title}>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>OTP (SMS)</label>
          <input
            type="text"
            value={otpSms}
            onChange={(e) => setOtpSms(e.target.value)}
            className={styles.input}
            placeholder="Enter SMS OTP"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>OTP (Email)</label>
          <input
            type="text"
            value={otpEmail}
            onChange={(e) => setOtpEmail(e.target.value)}
            className={styles.input}
            placeholder="Enter Email OTP"
            required
          />
        </div>
        <button type="submit" className={styles.verifyButton}>
          Verify OTP
        </button>
        <p className={styles.timer}>Resend OTP in: {timer}s</p>
        {timer === 0 && (
          <button type="button" onClick={handleResendOtp} className={styles.resendButton}>
            Resend OTP
          </button>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default VerifyAccount;
