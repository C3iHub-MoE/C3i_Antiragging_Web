import React from 'react';
import styles from './RegisterComplaint.module.css';

const RegisterComplaint = () => {
  return (
    <div className={styles.registerComplaintContainer}>
      
      <p className={styles.headerText}>Register your complaint here</p>

      <form className={styles.complaintForm}>
        <div className={styles.formGroup}>
          <label>Complaint Category*</label>
          <input type="text" placeholder="Ragging, Torture..." required />
        </div>

        <div className={styles.formGroupRow}>
          <div className={styles.formGroup}>
            <label>Victim's Name*</label>
            <input type="text" placeholder="Victim's Name" required />
          </div>
          <div className={styles.formGroup}>
            <label>Victim's Mobile No.*</label>
            <input type="text" placeholder="Victim's Mobile Number" required />
          </div>
        </div>

        <div className={styles.formGroupRow}>
          <div className={styles.formGroup}>
            <label>Victim's Email*</label>
            <input type="email" placeholder="Victim's Email" required />
          </div>
          <div className={styles.formGroup}>
            <label>Victim's Gender*</label>
            <input type="text" placeholder="Male/Female" required />
          </div>
        </div>

        <div className={styles.formGroupRow}>
          <div className={styles.formGroup}>
            <label>Victim's Caste*</label>
            <input type="text" placeholder="General" required />
          </div>
          <div className={styles.formGroup}>
            <label>State (India)*</label>
            <select required>
              <option value="">Select State</option>
              <option value="state1">State 1</option>
              <option value="state2">State 2</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroupRow}>
          <div className={styles.formGroup}>
            <label>Victim's College Name*</label>
            <input type="text" placeholder="Victim's College Name" required />
          </div>
          <div className={styles.formGroup}>
            <label>College Pin Code*</label>
            <input type="text" placeholder="College Pin Code" required />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Victim's Address*</label>
          <input type="text" placeholder="Address" required />
        </div>

        <div className={styles.formGroup}>
          <label>Ragging Details*</label>
          <textarea placeholder="Ragging Details (Drag from right bottom corner to make it larger)" required></textarea>
        </div>

        <p className={styles.evidenceInfo}>
          If you have any evidence, Kindly mail them to <a href="mailto:helpline@antiragging.in">helpline@antiragging.in</a>
          with the same email ID you are using here and do not forget to mention that you are sending the attachments in ragging details.
        </p>

        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default RegisterComplaint;
