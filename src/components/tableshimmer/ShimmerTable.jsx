import React from "react";
import styles from "./ShimmerTable.module.css"; // Import the CSS module for styling

const ShimmerTable = () => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.customTable}>
                <thead>
                    <tr>
                        <th className={styles.shimmerCell}></th>
                        <th className={styles.shimmerCell}></th>
                        <th className={styles.shimmerCell}></th>
                        <th className={styles.shimmerCell}></th>
                        <th className={styles.shimmerCell}></th>
                        <th className={styles.shimmerCell}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                    </tr>
                    <tr>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                    </tr>
                    <tr>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                    </tr>
                    <tr>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                    </tr>
                    <tr>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                    </tr>
                    <tr>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                        <td className={styles.shimmerCell}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ShimmerTable;
