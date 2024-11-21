import React, { useState } from 'react';
import axios from 'axios';
import styles from './InvitationForm.module.css';

const InvitationForm = ({ memberType }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const invitationData = {
      email,
      memberType,
    };

    try {
      await axios.post('/api/user/invite', invitationData);
      setSuccess('Invitation sent successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error sending invitation', error);
      setError('Failed to send invitation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Invite {memberType}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
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
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Sending...' : 'Send Invitation'}
        </button>
      </form>
    </div>
  );
};

export default InvitationForm;
