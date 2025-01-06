import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSosAlerts } from "../../hooks/useData";

const SosBarChart = () => {
    const [barChartData, setBarChartData] = useState({
        labels: [],
        datasets: [],
    });

    const { sosData, loading, error, fetchAlerts } = useSosAlerts();
    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);
    useEffect(() => {
        if (sosData && sosData.length > 0) {
            const stateWiseData = sosData.reduce((acc, curr) => {
                const state = curr.student_info.state_name;

                if (!acc[state]) {
                    acc[state] = { totalIncidents: 0, totalResponseTime: 0, count: 0 };
                }

                // Increment incident count
                acc[state].totalIncidents += 1;

                // Aggregate response time if available
                const responseTime = curr.evidence_details.duration_minutes;
                if (responseTime) {
                    acc[state].totalResponseTime += responseTime;
                    acc[state].count += 1;
                }

                return acc;
            }, {});

            // Extract data for the chart
            const labels = Object.keys(stateWiseData);
            const totalIncidents = labels.map((state) => stateWiseData[state].totalIncidents);
            const avgResponseTime = labels.map((state) => (stateWiseData[state].count > 0 ? (stateWiseData[state].totalResponseTime / stateWiseData[state].count).toFixed(1) : 0));

            // Update bar chart data
            const chartData = {
                labels,
                datasets: [
                    {
                        label: "Total Incidents",
                        data: totalIncidents,
                        backgroundColor: "#36a2eb",
                    },
                    {
                        label: "Avg Response Time (min)",
                        data: avgResponseTime,
                        backgroundColor: "#4bc0c0",
                    },
                ],
            };

            setBarChartData(chartData);
        }
    }, [sosData]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div>
            <h3>SOS Incidents by State</h3>
            <Bar data={barChartData} />
        </div>
    );
};

export default SosBarChart;
