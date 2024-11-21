import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const AnalyticsPage = () => {
  const [metrics, setMetrics] = useState({
    totalComplaints: 0,
    resolvedComplaints: 0,
    sosTriggers: 0,
    totalStudents: 0,
  });

  const [complaintsData, setComplaintsData] = useState({});
  const [sosTriggersData, setSosTriggersData] = useState({});
  const [resolutionData, setResolutionData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch data from your API and set state
    // Dummy data for demonstration
    setMetrics({
      totalComplaints: 120,
      resolvedComplaints: 80,
      sosTriggers: 25,
      totalStudents: 1000,
    });

    setComplaintsData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [
        {
          label: 'Complaints Over Time',
          data: [30, 20, 25, 45],
          backgroundColor: 'rgba(114, 99, 240, 0.5)',
        },
      ],
    });

    setSosTriggersData({
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'SOS Triggers',
          data: [5, 8, 3, 9],
          borderColor: '#7367f0',
          backgroundColor: 'rgba(114, 99, 240, 0.2)',
        },
      ],
    });

    setResolutionData({
      labels: ['Resolved', 'Unresolved'],
      datasets: [
        {
          data: [80, 40],
          backgroundColor: ['#4caf50', '#f44336'],
        },
      ],
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Anti-Ragging Portal Analytics</h2>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Card title="Total Complaints" bordered={false}>
            {metrics.totalComplaints}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Resolved Complaints" bordered={false}>
            {metrics.resolvedComplaints}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="SOS Triggers" bordered={false}>
            {metrics.sosTriggers}
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Students" bordered={false}>
            {metrics.totalStudents}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Complaints Over Time" bordered={false}>
            <Bar data={complaintsData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="SOS Triggers Over Time" bordered={false}>
            <Line data={sosTriggersData} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card title="Resolution Status" bordered={false}>
            <Pie data={resolutionData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsPage;
