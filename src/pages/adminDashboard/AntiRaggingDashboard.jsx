import React, { useEffect } from "react";
import { Chart1, Chart3, Chart4, GaugeChart } from "../../components/chartsoption/chartOptions";
import { useAuth } from "../../context/AuthContext";
// import "./AntiRaggingDashboard.module.css";
import SosBarChart from "./SosBarChart";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./AntiRaggingDashboard.css";
import { useSosAlerts } from "../../hooks/useData";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const lineChartData = {
        labels: ["2024-12-01", "2024-12-02", "2024-12-03", "2024-12-04", "2024-12-05"],
        datasets: [
            {
                label: "Acknowledgment Time (mins)",
                data: [6.8, 7.2, 6.5, 7.4, 7.0],
                borderColor: "#36a2eb",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            },
            {
                label: "Resolution Time (hours)",
                data: [50, 45, 48, 42, 55],
                borderColor: "#ff6384",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
        ],
    };
    const { sosData, fetchAlerts } = useSosAlerts();

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    console.log("123456", sosData);

    return (
        <div className="analytics-page">
            <div className="cards-section">
                <div className="card">
                    <h4>Active SOS</h4>
                    <p className="value">{sosData.length}</p>
                </div>
                <div className="card">
                    <h4>Total Institutions</h4>
                    <p className="value">1,200</p>
                </div>
                <div className="card">
                    <h4>States Covered</h4>
                    <p className="value">28</p>
                </div>
                <div className="card">
                    <h4>Avg Response Time</h4>
                    <p className="value">7.5 min</p>
                </div>
                <div className="card">
                    <h4>Resolution Rate</h4>
                    <p className="value">95.2%</p>
                </div>
            </div>
            <div className="charts-section">
                <div className="chart-card">
                    <h3>Incident Timeline</h3>
                    <Line data={lineChartData} />
                </div>
                <div className="chart-card">
                    <SosBarChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
