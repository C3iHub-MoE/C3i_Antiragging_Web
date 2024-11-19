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
import { Layout, Card, Select, Row, Col, Typography, Statistic, Spin, Tooltip, DatePicker } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, Legend, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { PieChart, Pie } from 'recharts';
import { LoadingOutlined } from '@ant-design/icons';
import { blue, green, red, orange, purple } from '@ant-design/colors';
import moment from 'moment';

const { Header, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;
const { RangePicker } = DatePicker;

// Updated mock data with timestamp included
const mockData = {
  "National": {
    "State 1": {
      "District 1": {
        "College 1": {
          dataTrends: [
            { name: '2023-05-01', MTTA: 2.8, MTTR: 13.5 },
            { name: '2023-06-01', MTTA: 2.6, MTTR: 12.8 }
          ],
          pieData: [
            { name: 'Not Reopened', value: 70 },
            { name: 'Reopened', value: 30 }
          ],
          totalStudents: 500,
          dailySOSSendingRate: 25, // New metric
          actionsTaken: 120, // New metric
          totalMembers: 150,
          resolvedSOS: 120
        },
        "College 2": {
          dataTrends: [
            { name: '2023-05-01', MTTA: 3.0, MTTR: 15.5 },
            { name: '2023-06-01', MTTA: 2.7, MTTR: 14.0 }
          ],
          pieData: [
            { name: 'Not Reopened', value: 65 },
            { name: 'Reopened', value: 35 }
          ],
          totalStudents: 700,
          dailySOSSendingRate: 30, // New metric
          actionsTaken: 140, // New metric
          totalMembers: 200,
          resolvedSOS: 140
        }
      }
    }
  }
};

const Dashboard = () => {
  const [national, setNational] = useState('National');
  const [state, setState] = useState('State 1');
  const [district, setDistrict] = useState('District 1');
  const [college, setCollege] = useState('College 1');
  const [data, setData] = useState(mockData['National']['State 1']['District 1']['College 1']);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]); // for timestamp filtering

  // Handle filter change
  const handleNationalChange = (value) => {
    setNational(value);
    updateData(value, state, district, college, dateRange);
  };

  const handleStateChange = (value) => {
    setState(value);
    updateData(national, value, district, college, dateRange);
  };

  const handleDistrictChange = (value) => {
    setDistrict(value);
    updateData(national, state, value, college, dateRange);
  };

  const handleCollegeChange = (value) => {
    setCollege(value);
    updateData(national, state, district, value, dateRange);
  };

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    updateData(national, state, district, college, dates);
  };

  // Update data based on filters and date range
  const updateData = (selectedNational, selectedState, selectedDistrict, selectedCollege, selectedDateRange) => {
    setLoading(true);

    // Filter the data based on the selected date range
    let filteredData = mockData[selectedNational]?.[selectedState]?.[selectedDistrict]?.[selectedCollege];

    // If there's a date range selected, filter the trends based on the timestamp
    if (selectedDateRange && selectedDateRange[0] && selectedDateRange[1]) {
      const startDate = moment(selectedDateRange[0]);
      const endDate = moment(selectedDateRange[1]);

      filteredData = {
        ...filteredData,
        dataTrends: filteredData.dataTrends.filter((entry) => {
          const entryDate = moment(entry.name);
          return entryDate.isBetween(startDate, endDate, 'days', '[]');
        })
      };
    }

    setTimeout(() => {
      setData(filteredData || mockData['National']['State 1']['District 1']['College 1']);
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={national}
                onChange={handleNationalChange}
                placeholder="Select National"
              >
                <Option value="National">National</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={state}
                onChange={handleStateChange}
                placeholder="Select State"
              >
                <Option value="State 1">State 1</Option>
                <Option value="State 2">State 2</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={district}
                onChange={handleDistrictChange}
                placeholder="Select District"
              >
                <Option value="District 1">District 1</Option>
                <Option value="District 2">District 2</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={college}
                onChange={handleCollegeChange}
                placeholder="Select College"
              >
                <Option value="College 1">College 1</Option>
                <Option value="College 2">College 2</Option>
              </Select>
            </Col>
          </Row>

          {/* Date Range Picker */}
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col xs={24} sm={6}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={handleDateRangeChange}
                placeholder={['Start Date', 'End Date']}
                format="YYYY-MM-DD"
              />
            </Col>
          </Row>
        </Card>

        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={6}>
            <Card style={{ background: green[1] }}>
              <Statistic title="Total Students" value={data.totalStudents} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card style={{ background: orange[1] }}>
              <Statistic title="Daily SOS Sending Rate" value={data.dailySOSSendingRate} />
              <Tooltip title="Average number of SOS requests sent daily">
                <span>Rate</span>
              </Tooltip>
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card style={{ background: blue[1] }}>
              <Statistic title="Total Members" value={data.totalMembers} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card style={{ background: purple[1] }}>
              <Statistic title="Actions Taken" value={data.actionsTaken} />
              <Tooltip title="Total actions taken to resolve SOS">
                <span>Actions</span>
              </Tooltip>
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
                    <RechartTooltip />
                    <Legend />
                    <Bar dataKey="MTTA" fill="#8884d8">
                      {data.dataTrends.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.MTTA > 2.7 ? red[2] : green[2]} />
                      ))}
                    </Bar>
                    <Bar dataKey="MTTR" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>
          </Col>

          <Col xs={24} sm={12}>
            <Card title="SOS Status Pie Chart">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
