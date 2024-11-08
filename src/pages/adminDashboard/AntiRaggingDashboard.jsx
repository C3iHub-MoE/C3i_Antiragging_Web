import React, { useState } from 'react';
import { Layout, Card, Select, DatePicker, Row, Col } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
// import 'antd/dist/antd.css';
import 'antd/dist/reset.css'; // For recent Ant Design versions (v5 and above)

const { Header, Content } = Layout;
const { Option } = Select;

// Mock data
const dataTrends = [
  { name: 'May 2023', MTTA: 2.8, MTTR: 13.5 },
  { name: 'Jun 2023', MTTA: 2.6, MTTR: 12.8 },
  // Add more data as needed
];
const pieData = [
  { name: 'Not Reopened', value: 75 },
  { name: 'Reopened', value: 25 },
];

const Dashboard = () => {
  const [institute, setInstitute] = useState('All');
  const [state, setState] = useState('All');

  return (
    <Layout>
        {/* <Header style={{ background: '#001529', color: 'white', textAlign: 'center' }}>
          <h1>Anti-Ragging Management Dashboard</h1>
        </Header> */}
      <Content style={{ padding: '20px' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={institute}
                onChange={setInstitute}
                placeholder="Select Institute"
              >
                <Option value="All">All</Option>
                <Option value="Institute 1">Institute 1</Option>
                {/* Add more institutes */}
              </Select>
            </Col>
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                value={state}
                onChange={setState}
                placeholder="Select State"
              >
                <Option value="All">All</Option>
                <Option value="State 1">State 1</Option>
                {/* Add more states */}
              </Select>
            </Col>
            <Col span={8}>
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Col>
          </Row>
        </Card>
        
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={6}>
            <Card title="Total Students">
              <h2>500</h2>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Pending Complaints">
              <h2>30</h2>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Total Members">
              <h2>150</h2>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Resolved Complaints">
              <h2>120</h2>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={12}>
            <Card title="MTTA and MTTR Trends">
              <LineChart width={500} height={300} data={dataTrends}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="MTTA" stroke="#8884d8" />
                <Line type="monotone" dataKey="MTTR" stroke="#82ca9d" />
              </LineChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Complaints Reopen Rate">
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                >
                  <Cell key="Not Reopened" fill="#8884d8" />
                  <Cell key="Reopened" fill="#ffc658" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
