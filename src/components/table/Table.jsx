import React, { memo } from "react";
import styles from "./Table.module.css";

const Table = ({ columns, data }) => {
    return (
        <div className={styles.tableWrapper}>
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
                                <td key={col}>
                                    {col === "PROJECT" ? (
                                        <div className={styles["icon-cell"]}>
                                            <img src={row.icon} alt="" />
                                            {row[col]}
                                        </div>
                                    ) : col === "STATUS" ? (
                                        <span className={`${styles.statusBadge} ${styles[`status-${row[col].toLowerCase()}`]}`}>{row[col]}</span>
                                    ) : col === "USERS" ? (
                                        <div className={styles["avatar-group"]}>
                                            {row[col].map((avatar, i) => (
                                                <img key={i} src={avatar} alt="avatar" className={styles.avatar} />
                                            ))}
                                        </div>
                                    ) : row[col] !== null ? (
                                        row[col]
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(Table);
