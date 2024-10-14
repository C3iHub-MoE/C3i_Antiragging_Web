// src/pages/MemberForm.js

import React, { useState, useEffect } from 'react';
import styles from './MembersForm.module.css'; // Import the styles

const MemberForm = ({ onSubmit, member, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    memberType: '',
  });

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        memberType: '',
      });
    }
  }, [member]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>{member ? 'Update Member' : 'Create New Member'}</h2>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Phone:
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <label>
        Member Type:
        <select name="memberType" value={formData.memberType} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          {/* Add more types as needed */}
        </select>
      </label>
      <div className={styles.formActions}>
        <button type="submit">{member ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default MemberForm;
