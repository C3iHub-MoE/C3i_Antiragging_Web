// import React, { useState, useEffect } from 'react';
// import styles from './ResetPassword.module.css';
// import { getDeviceId } from '../../../utils/deviceUtils';
// import { sendOtp, verifyOtp, resendOtp } from '../../../api/user';

// const ResetPassword = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [trxId, setTrxId] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [timer, setTimer] = useState(120);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const deviceId = getDeviceId();

//   useEffect(() => {
//     let interval;
//     if (isOtpSent && timer > 0) {
//       interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//     } else if (timer === 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [timer, isOtpSent]);

//   const validateMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     if (!validateMobileNumber(mobileNumber)) {
//       setError('Please enter a valid mobile number.');
//       return;
//     }
//     try {
//       const response = await sendOtp({ mobile_number: mobileNumber, device_id: deviceId });
//       setIsOtpSent(true);
//       setTimer(120);
//       setTrxId(response.trxId);
//       setError('');
//     } catch (err) {
//       setError('Failed to send OTP. Please try again.');
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     if (otp.length !== 6 || isNaN(otp)) {
//       setError('Please enter a valid 6-digit OTP.');
//       return;
//     }
//     try {
//       await verifyOtp({ mobile_number: mobileNumber, otp, trxId, device_id: deviceId });
//       setIsOtpVerified(true);
//       setError('');
//     } catch (err) {
//       setError('Invalid OTP. Please try again.');
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       setError('');
//       setTimer(120);
//       await resendOtp({ mobile_number: mobileNumber, device_id: deviceId, trxId });
//     } catch (err) {
//       setError('Failed to resend OTP. Please try again.');
//     }
//   };

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }
//     try {
//       await verifyOtp({ mobile_number: mobileNumber, trxId, device_id: deviceId, newPassword });
//       setSuccessMessage('Password reset successfully!');
//       setError('');
//     } catch (err) {
//       setError('Failed to reset password. Please try again.');
//     }
//   };

//   return (
//     <div className={styles.resetContainer}>
//       <div className={styles.logo}>
//         <img src="/path/to/logo.png" alt="Logo" className={styles.logoImage} />
//       </div>
//       <div className={styles.resetBox}>
//         <h2 className={styles.title}>Reset Password</h2>
//         {successMessage ? (
//           <p className={styles.success}>{successMessage}</p>
//         ) : !isOtpSent ? (
//           <form onSubmit={handleSendOtp} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <label className={styles.label}>Mobile Number</label>
//               <input
//                 type="text"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 className={styles.input}
//                 placeholder="Enter your mobile number"
//                 required
//               />
//             </div>
//             <button type="submit" className={styles.resetButton}>
//               Send OTP
//             </button>
//             {error && <p className={styles.error}>{error}</p>}
//           </form>
//         ) : !isOtpVerified ? (
//           <form onSubmit={handleVerifyOtp} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <label className={styles.label}>Enter OTP</label>
//               <input
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 className={styles.input}
//                 placeholder="Enter OTP"
//                 required
//               />
//             </div>
//             <button type="submit" className={styles.resetButton}>
//               Verify OTP
//             </button>
//             <p className={styles.timer}>
//               Resend OTP in: {timer}s
//             </p>
//             {timer === 0 && (
//               <button
//                 type="button"
//                 onClick={handleResendOtp}
//                 className={styles.resendButton}
//               >
//                 Resend OTP
//               </button>
//             )}
//             {error && <p className={styles.error}>{error}</p>}
//           </form>
//         ) : (
//           <form onSubmit={handlePasswordReset} className={styles.form}>
//             <div className={styles.inputGroup}>
//               <label className={styles.label}>New Password</label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className={styles.input}
//                 placeholder="Enter new password"
//                 required
//               />
//             </div>
//             <div className={styles.inputGroup}>
//               <label className={styles.label}>Confirm Password</label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className={styles.input}
//                 placeholder="Confirm new password"
//                 required
//               />
//             </div>
//             <button type="submit" className={styles.resetButton}>
//               Reset Password
//             </button>
//             {error && <p className={styles.error}>{error}</p>}
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.css';
import { getDeviceId } from '../../../utils/deviceUtils';
import { sendOtp, verifyOtp, resendOtp } from '../../../api/user';
import UGCLOGO from "./ugc_logo.png"

const ResetPassword = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [trxId, setTrxId] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const deviceId = getDeviceId();

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  const validateMobileNumber = (number) => /^[6-9]\d{9}$/.test(number);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateMobileNumber(mobileNumber)) {
      setError('Please enter a valid mobile number.');
      return;
    }
    try {
      const response = await sendOtp({ mobile_number: mobileNumber, device_id: deviceId });
      console.log(response)
      setIsOtpSent(true);
      setTimer(120);
      setTrxId(response.trx_id); // Make sure trxId is set

      setError('');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6 || isNaN(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await verifyOtp({
        phone_number: mobileNumber,
        otp,
        trxId, // Ensure trxId is included in the verification request
        deviceId,
        newPassword, // Send the new password here along with OTP
      });
      setIsOtpVerified(true);
      setSuccessMessage('Password reset successfully!');
      navigate("/login")
      setError('');
    } catch (err) {
      setError('Invalid OTP or failed to reset password. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (!trxId) {
      setError('Unable to resend OTP without a valid transaction ID.');
      return;
    }
    try {
      setError('');
      setTimer(120);
      await resendOtp({ mobile_number: mobileNumber, device_id: deviceId, trxId }); // Include trxId when resending OTP
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className={styles.resetContainer}>

      <div className={styles.resetBox}>
        <div className={styles.logo}>
          <img src={UGCLOGO} alt="Logo" className={styles.logoImage} />
        </div>
        <h2 className={styles.title}>✨ Reset Your Password With Ease</h2>

        {successMessage ? (
          <p className={styles.success}>{successMessage}</p>
        ) : !isOtpSent ? (
          <form onSubmit={handleSendOtp} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className={styles.input}
                placeholder="Enter your mobile number"
                required
              />
            </div>
            <button type="submit" className={styles.resetButton}>
              Send OTP
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        ) : !isOtpVerified ? (
          <form onSubmit={handleVerifyOtp} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={styles.input}
                placeholder="Enter OTP"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder="Confirm new password"
                required
              />
            </div>
            <button type="submit" className={styles.resetButton}>
              Verify OTP and Reset Password
            </button>
            <p className={styles.timer}>
              Resend OTP in: {timer}s
            </p>
            {timer === 0 && (
              <button
                type="button"
                onClick={handleResendOtp}
                className={styles.resendButton}
              >
                Resend OTP
              </button>
            )}
            {error && <p className={styles.error}>{error}</p>}
          </form>
        ) : (
          <div className={styles.success}>
            <p>Password has been successfully reset!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
