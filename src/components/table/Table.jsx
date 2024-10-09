import React from 'react';
import styles from './Table.module.css'; // Import the CSS module

const Table = ({ columns, data }) => {
  return (
    <table className={styles.customTable}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col}>{row[col] !== null ? row[col] : 'N/A'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
