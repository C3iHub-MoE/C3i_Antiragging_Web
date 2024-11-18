// import React, { useState } from 'react';
// import { Layout, Card, Select, DatePicker, Row, Col } from 'antd';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
// // import 'antd/dist/antd.css';
// import 'antd/dist/reset.css'; // For recent Ant Design versions (v5 and above)

// const { Header, Content } = Layout;
// const { Option } = Select;

// // Mock data
// const dataTrends = [
//   { name: 'May 2023', MTTA: 2.8, MTTR: 13.5 },
//   { name: 'Jun 2023', MTTA: 2.6, MTTR: 12.8 },
//   // Add more data as needed
// ];
// const pieData = [
//   { name: 'Not Reopened', value: 75 },
//   { name: 'Reopened', value: 25 },
// ];

// const Dashboard = () => {
//   const [institute, setInstitute] = useState('All');
//   const [state, setState] = useState('All');

//   return (
//     <Layout>
//         {/* <Header style={{ background: '#001529', color: 'white', textAlign: 'center' }}>
//           <h1>Anti-Ragging Management Dashboard</h1>
//         </Header> */}
//       <Content style={{ padding: '20px' }}>
//         <Card>
//           <Row gutter={[16, 16]}>
//             <Col span={8}>
//               <Select
//                 style={{ width: '100%' }}
//                 value={institute}
//                 onChange={setInstitute}
//                 placeholder="Select Institute"
//               >
//                 <Option value="All">All</Option>
//                 <Option value="Institute 1">Institute 1</Option>
//                 {/* Add more institutes */}
//               </Select>
//             </Col>
//             <Col span={8}>
//               <Select
//                 style={{ width: '100%' }}
//                 value={state}
//                 onChange={setState}
//                 placeholder="Select State"
//               >
//                 <Option value="All">All</Option>
//                 <Option value="State 1">State 1</Option>
//                 {/* Add more states */}
//               </Select>
//             </Col>
//             <Col span={8}>
//               <DatePicker.RangePicker style={{ width: '100%' }} />
//             </Col>
//           </Row>
//         </Card>
        
//         <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
//           <Col span={6}>
//             <Card title="Total Students">
//               <h2>500</h2>
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card title="Pending Complaints">
//               <h2>30</h2>
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card title="Total Members">
//               <h2>150</h2>
//             </Card>
//           </Col>
//           <Col span={6}>
//             <Card title="Resolved Complaints">
//               <h2>120</h2>
//             </Card>
//           </Col>
//         </Row>

//         <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
//           <Col span={12}>
//             <Card title="MTTA and MTTR Trends">
//               <LineChart width={500} height={300} data={dataTrends}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="MTTA" stroke="#8884d8" />
//                 <Line type="monotone" dataKey="MTTR" stroke="#82ca9d" />
//               </LineChart>
//             </Card>
//           </Col>
//           <Col span={12}>
//             <Card title="Complaints Reopen Rate">
//               <PieChart width={400} height={300}>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#82ca9d"
//                 >
//                   <Cell key="Not Reopened" fill="#8884d8" />
//                   <Cell key="Reopened" fill="#ffc658" />
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </Card>
//           </Col>
//         </Row>
//       </Content>
//     </Layout>
//   );
// };

// export default Dashboard;



import React, { useState } from 'react';
import { Layout, Card, Select, DatePicker, Row, Col, Typography, Statistic, Spin, InputNumber } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // For Ant Design v5+
import { PieChart, Pie, Cell } from 'recharts';

const { Header, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

// Mock data for different filters
const mockData = {
  "Institute 1": {
    "State 1": {
      "District 1": {
        dataTrends: [
          { name: 'May 2023', MTTA: 2.8, MTTR: 13.5 },
          { name: 'Jun 2023', MTTA: 2.6, MTTR: 12.8 },
        ],
        pieData: [
          { name: 'Not Reopened', value: 70 },
          { name: 'Reopened', value: 30 },
        ],
        totalStudents: 500,
        pendingComplaints: 30,
        totalMembers: 150,
        resolvedComplaints: 120,
      },
    },
  },
  "Institute 2": {
    "State 1": {
      "District 1": {
        dataTrends: [
          { name: 'May 2023', MTTA: 3.0, MTTR: 15.5 },
          { name: 'Jun 2023', MTTA: 2.7, MTTR: 14.0 },
        ],
        pieData: [
          { name: 'Not Reopened', value: 65 },
          { name: 'Reopened', value: 35 },
        ],
        totalStudents: 700,
        pendingComplaints: 50,
        totalMembers: 200,
        resolvedComplaints: 140,
      }
    },
  },
  "All": {
    "All": {
      "All": {
        dataTrends: [
          { name: 'May 2023', MTTA: 2.8, MTTR: 13.5 },
          { name: 'Jun 2023', MTTA: 2.7, MTTR: 13.0 },
        ],
        pieData: [
          { name: 'Not Reopened', value: 75 },
          { name: 'Reopened', value: 25 },
        ],
        totalStudents: 1000,
        pendingComplaints: 70,
        totalMembers: 300,
        resolvedComplaints: 250,
      },
    },
  }
};

const Dashboard = () => {
  const [institute, setInstitute] = useState('All');
  const [state, setState] = useState('All');
  const [district, setDistrict] = useState('All');
  const [data, setData] = useState(mockData['All']['All']['All']);
  const [loading, setLoading] = useState(false);

  // Handle filter change
  const handleInstituteChange = (value) => {
    setInstitute(value);
    updateData(value, state, district);
  };

  const handleStateChange = (value) => {
    setState(value);
    updateData(institute, value, district);
  };

  const handleDistrictChange = (value) => {
    setDistrict(value);
    updateData(institute, state, value);
  };

  const handleDateRangeChange = (dates) => {
    // Optional: Handle date range change logic
  };

  // Update the data for the charts based on the selected filters
  const updateData = (selectedInstitute, selectedState, selectedDistrict) => {
    setLoading(true);
    setTimeout(() => {
      setData(mockData[selectedInstitute]?.[selectedState]?.[selectedDistrict] || mockData['All']['All']['All']);
      setLoading(false);
    }, 1000);
  };

  // Handle bar value changes
  const handleBarChange = (value, index, key) => {
    const updatedData = [...data.dataTrends];
    updatedData[index][key] = value;
    setData(prevData => ({ ...prevData, dataTrends: updatedData }));
  };

  return (
    <Layout>
      {/* <Header style={{ background: 'white', color: 'white' }}>
        <Title level={2} style={{ color: 'black', textAlign: 'center' }}>
          Anti-Ragging Management Dashboard
        </Title>
      </Header> */}
      <Content style={{ padding: '20px' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Select
                style={{ width: '100%' }}
                value={institute}
                onChange={handleInstituteChange}
                placeholder="Select Institute"
              >
                <Option value="All">All Institute</Option>
                <Option value="Institute 1">Institute 1</Option>
                <Option value="Institute 2">Institute 2</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <Select
                style={{ width: '100%' }}
                value={state}
                onChange={handleStateChange}
                placeholder="Select State"
              >
                <Option value="All">All State</Option>
                <Option value="State 1">State 1</Option>
                <Option value="State 1">State 2</Option>

              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <Select
                style={{ width: '100%' }}
                value={district}
                onChange={handleDistrictChange}
                placeholder="Select District"
              >
                <Option value="All">All District</Option>
                <Option value="District 1">District 1</Option>
                <Option value="District 2">District 2</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Total Students" value={data.totalStudents} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Pending Complaints" value={data.pendingComplaints} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Total Members" value={data.totalMembers} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Resolved Complaints" value={data.resolvedComplaints} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12}>
            <Card title="Editable MTTA and MTTR Bar Chart">
              {loading ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.dataTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="MTTA" fill="#8884d8">
                      {data.dataTrends.map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                      ))}
                    </Bar>
                    <Bar dataKey="MTTR" fill="#82ca9d">
                      {data.dataTrends.map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card title="Complaints Reopen Rate">
              {loading ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                <PieChart width={400} height={300}>
                  <Pie
                    data={data.pieData}
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
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
