
// // import React, { useState } from 'react';
// // import { Layout, Card, Select, Row, Col, Typography, Statistic, Spin, Tooltip, DatePicker } from 'antd';
// // import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartTooltip, Legend, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
// // import { PieChart, Pie } from 'recharts';
// // import { LoadingOutlined } from '@ant-design/icons';
// // import { blue, green, red, orange, purple } from '@ant-design/colors';
// // import dayjs from 'dayjs'; // Use dayjs instead of moment

// // const { Header, Content } = Layout;
// // const { Option } = Select;
// // const { Title } = Typography;
// // const { RangePicker } = DatePicker;

// // // Updated mock data with timestamp included
// // const mockData = {
// //   "National": {
// //     "State 1": {
// //       "District 1": {
// //         "College 1": {
// //           dataTrends: [
// //             { name: '2023-05-01', MTTA: 2.8, MTTR: 13.5 },
// //             { name: '2023-06-01', MTTA: 2.6, MTTR: 12.8 }
// //           ],
// //           pieData: [
// //             { name: 'Not Reopened', value: 70 },
// //             { name: 'Reopened', value: 30 }
// //           ],
// //           totalStudents: 500,
// //           dailySOSSendingRate: 25, // New metric
// //           actionsTaken: 120, // New metric
// //           totalMembers: 150,
// //           resolvedSOS: 120
// //         },
// //         "College 2": {
// //           dataTrends: [
// //             { name: '2023-05-01', MTTA: 3.0, MTTR: 15.5 },
// //             { name: '2023-06-01', MTTA: 2.7, MTTR: 14.0 }
// //           ],
// //           pieData: [
// //             { name: 'Not Reopened', value: 65 },
// //             { name: 'Reopened', value: 35 }
// //           ],
// //           totalStudents: 700,
// //           dailySOSSendingRate: 30, // New metric
// //           actionsTaken: 140, // New metric
// //           totalMembers: 200,
// //           resolvedSOS: 140
// //         }
// //       }
// //     }
// //   }
// // };

// // const Dashboard = () => {
// //   const [national, setNational] = useState('National');
// //   const [state, setState] = useState('State 1');
// //   const [district, setDistrict] = useState('District 1');
// //   const [college, setCollege] = useState('College 1');
// //   const [data, setData] = useState(mockData['National']['State 1']['District 1']['College 1']);
// //   const [loading, setLoading] = useState(false);
// //   const [dateRange, setDateRange] = useState([null, null]); // for timestamp filtering

// //   // Handle filter change
// //   const handleNationalChange = (value) => {
// //     setNational(value);
// //     updateData(value, state, district, college, dateRange);
// //   };

// //   const handleStateChange = (value) => {
// //     setState(value);
// //     updateData(national, value, district, college, dateRange);
// //   };

// //   const handleDistrictChange = (value) => {
// //     setDistrict(value);
// //     updateData(national, state, value, college, dateRange);
// //   };

// //   const handleCollegeChange = (value) => {
// //     setCollege(value);
// //     updateData(national, state, district, value, dateRange);
// //   };

// //   // Handle date range change
// //   const handleDateRangeChange = (dates) => {
// //     setDateRange(dates);
// //     updateData(national, state, district, college, dates);
// //   };

// //   // Update data based on filters and date range
// //   const updateData = (selectedNational, selectedState, selectedDistrict, selectedCollege, selectedDateRange) => {
// //     setLoading(true);

// //     // Filter the data based on the selected date range
// //     let filteredData = mockData[selectedNational]?.[selectedState]?.[selectedDistrict]?.[selectedCollege];

// //     // If there's a date range selected, filter the trends based on the timestamp
// //     if (selectedDateRange && selectedDateRange[0] && selectedDateRange[1]) {
// //       const startDate = dayjs(selectedDateRange[0]);
// //       const endDate = dayjs(selectedDateRange[1]);

// //       filteredData = {
// //         ...filteredData,
// //         dataTrends: filteredData.dataTrends.filter((entry) => {
// //           const entryDate = dayjs(entry.name); // Use dayjs for date comparison
// //           return entryDate.isBetween(startDate, endDate, 'day', '[]'); // Updated syntax to match dayjs
// //         })
// //       };
// //     }

// //     setTimeout(() => {
// //       setData(filteredData || mockData['National']['State 1']['District 1']['College 1']);
// //       setLoading(false);
// //     }, 1000);
// //   };

// //   return (
// //     <Layout>
// //       <Content style={{ padding: '20px' }}>
// //         <Card>
// //           <Row gutter={[16, 16]}>
// //             <Col xs={24} sm={6}>
// //               <Select
// //                 style={{ width: '100%' }}
// //                 value={national}
// //                 onChange={handleNationalChange}
// //                 placeholder="Select National"
// //               >
// //                 <Option value="National">National</Option>
// //               </Select>
// //             </Col>
// //             <Col xs={24} sm={6}>
// //               <Select
// //                 style={{ width: '100%' }}
// //                 value={state}
// //                 onChange={handleStateChange}
// //                 placeholder="Select State"
// //               >
// //                 <Option value="State 1">State 1</Option>
// //                 <Option value="State 2">State 2</Option>
// //               </Select>
// //             </Col>
// //             <Col xs={24} sm={6}>
// //               <Select
// //                 style={{ width: '100%' }}
// //                 value={district}
// //                 onChange={handleDistrictChange}
// //                 placeholder="Select District"
// //               >
// //                 <Option value="District 1">District 1</Option>
// //                 <Option value="District 2">District 2</Option>
// //               </Select>
// //             </Col>
// //             <Col xs={24} sm={6}>
// //               <Select
// //                 style={{ width: '100%' }}
// //                 value={college}
// //                 onChange={handleCollegeChange}
// //                 placeholder="Select College"
// //               >
// //                 <Option value="College 1">College 1</Option>
// //                 <Option value="College 2">College 2</Option>
// //               </Select>
// //             </Col>
// //           </Row>

// //           {/* Date Range Picker */}
// //           <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
// //             <Col xs={24} sm={6}>
// //               <RangePicker
// //                 style={{ width: '100%' }}
// //                 onChange={handleDateRangeChange}
// //                 placeholder={['Start Date', 'End Date']}
// //                 format="YYYY-MM-DD"
// //               />
// //             </Col>
// //           </Row>
// //         </Card>

// //         <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
// //           <Col xs={24} sm={6}>
// //             <Card style={{ background: green[1] }}>
// //               <Statistic title="Total Students" value={data.totalStudents} />
// //             </Card>
// //           </Col>
// //           <Col xs={24} sm={6}>
// //             <Card style={{ background: orange[1] }}>
// //               <Statistic title="Daily SOS Sending Rate" value={data.dailySOSSendingRate} />
// //               <Tooltip title="Average number of SOS requests sent daily">
// //                 <span>Rate</span>
// //               </Tooltip>
// //             </Card>
// //           </Col>
// //           <Col xs={24} sm={6}>
// //             <Card style={{ background: blue[1] }}>
// //               <Statistic title="Total Members" value={data.totalMembers} />
// //             </Card>
// //           </Col>
// //           <Col xs={24} sm={6}>
// //             <Card style={{ background: purple[1] }}>
// //               <Statistic title="Actions Taken" value={data.actionsTaken} />
// //               <Tooltip title="Total actions taken to resolve SOS">
// //                 <span>Actions</span>
// //               </Tooltip>
// //             </Card>
// //           </Col>
// //         </Row>

// //         <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
// //           <Col xs={24} sm={12}>
// //             <Card title="Editable MTTA and MTTR Bar Chart">
// //               {loading ? (
// //                 <Spin indicator={<LoadingOutlined spin />} />
// //               ) : (
// //                 <ResponsiveContainer width="100%" height={300}>
// //                   <BarChart data={data.dataTrends}>
// //                     <CartesianGrid strokeDasharray="3 3" />
// //                     <XAxis dataKey="name" />
// //                     <YAxis />
// //                     <RechartTooltip />
// //                     <Legend />
// //                     <Bar dataKey="MTTA" fill="#8884d8">
// //                       {data.dataTrends.map((entry, index) => (
// //                         <Cell key={`cell-${index}`} fill={entry.MTTA > 2.7 ? red[2] : green[2]} />
// //                       ))}
// //                     </Bar>
// //                     <Bar dataKey="MTTR" fill="#82ca9d" />
// //                   </BarChart>
// //                 </ResponsiveContainer>
// //               )}
// //             </Card>
// //           </Col>

// //           <Col xs={24} sm={12}>
// //             <Card title="SOS Status Pie Chart">
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <PieChart>
// //                   <Pie
// //                     data={data.pieData}
// //                     dataKey="value"
// //                     nameKey="name"
// //                     outerRadius={120}
// //                     fill="#8884d8"
// //                   />
// //                 </PieChart>
// //               </ResponsiveContainer>
// //             </Card>
// //           </Col>
// //         </Row>
// //       </Content>
// //     </Layout>
// //   );
// // };

// // export default Dashboard;



// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
// import { PieChart, Pie } from 'recharts';
// import { Spin, DatePicker, Select } from 'antd'; // Ant Design components for a modern UI
// import { blue, green, red, orange, purple } from '@ant-design/colors';
// import dayjs from 'dayjs';
// import styles from './AntiRaggingDashboard.module.css';

// const { RangePicker } = DatePicker;
// const { Option } = Select;

// const mockData = {
//   "National": {
//     "State 1": {
//       "District 1": {
//         "College 1": {
//           dataTrends: [
//             { name: '2023-05-01', MTTA: 2.8, MTTR: 13.5 },
//             { name: '2023-06-01', MTTA: 2.6, MTTR: 12.8 }
//           ],
//           pieData: [
//             { name: 'Not Reopened', value: 70 },
//             { name: 'Reopened', value: 30 }
//           ],
//           totalStudents: 500,
//           dailySOSSendingRate: 25, // New metric
//           actionsTaken: 120, // New metric
//           totalMembers: 150,
//           resolvedSOS: 120
//         },
//         "College 2": {
//           dataTrends: [
//             { name: '2023-05-01', MTTA: 3.0, MTTR: 15.5 },
//             { name: '2023-06-01', MTTA: 2.7, MTTR: 14.0 }
//           ],
//           pieData: [
//             { name: 'Not Reopened', value: 65 },
//             { name: 'Reopened', value: 35 }
//           ],
//           totalStudents: 700,
//           dailySOSSendingRate: 30, // New metric
//           actionsTaken: 140, // New metric
//           totalMembers: 200,
//           resolvedSOS: 140
//         }
//       }
//     }
//   }
// };

// const Dashboard = () => {
//   const [national, setNational] = useState('National');
//   const [state, setState] = useState('State 1');
//   const [district, setDistrict] = useState('District 1');
//   const [college, setCollege] = useState('College 1');
//   const [data, setData] = useState(mockData['National']['State 1']['District 1']['College 1']);
//   const [loading, setLoading] = useState(false);

//   const updateData = (selectedNational, selectedState, selectedDistrict, selectedCollege, dateRange) => {
//     setLoading(true);
//     setTimeout(() => {
//       let filteredData = mockData[selectedNational]?.[selectedState]?.[selectedDistrict]?.[selectedCollege];
//       if (dateRange && dateRange[0] && dateRange[1]) {
//         const startDate = dayjs(dateRange[0]);
//         const endDate = dayjs(dateRange[1]);
//         filteredData = {
//           ...filteredData,
//           dataTrends: filteredData.dataTrends.filter((entry) =>
//             dayjs(entry.name).isBetween(startDate, endDate, 'day', '[]')
//           )
//         };
//       }
//       setData(filteredData);
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className={styles.dashboard}>
//       <div className={styles.filters}>
//         <Select
//           className={styles.filterSelect}
//           value={national}
//           onChange={(value) => {
//             setNational(value);
//             updateData(value, state, district, college, null);
//           }}
//         >
//           <Option value="National">National</Option>
//         </Select>
//         <Select
//           className={styles.filterSelect}
//           value={state}
//           onChange={(value) => {
//             setState(value);
//             updateData(national, value, district, college, null);
//           }}
//         >
//           <Option value="State 1">State 1</Option>
//           <Option value="State 2">State 2</Option>
//         </Select>
//         <Select
//           className={styles.filterSelect}
//           value={district}
//           onChange={(value) => {
//             setDistrict(value);
//             updateData(national, state, value, college, null);
//           }}
//         >
//           <Option value="District 1">District 1</Option>
//           <Option value="District 2">District 2</Option>
//         </Select>
//         <Select
//           className={styles.filterSelect}
//           value={college}
//           onChange={(value) => {
//             setCollege(value);
//             updateData(national, state, district, value, null);
//           }}
//         >
//           <Option value="College 1">College 1</Option>
//           <Option value="College 2">College 2</Option>
//         </Select>
//         <RangePicker
//           className={styles.filterDateInput}
//           onChange={(dates) => updateData(national, state, district, college, dates)}
//         />
//       </div>

//       <div className={styles.statistics}>
//         <div className={`${styles.statCard} ${styles.greenGradient}`}>
//           <h3>Total Students</h3>
//           <p>{data.totalStudents}</p>
//         </div>
//         <div className={`${styles.statCard} ${styles.orangeGradient}`}>
//           <h3>Daily SOS Sending Rate</h3>
//           <p>{data.dailySOSSendingRate}</p>
//         </div>
//         <div className={`${styles.statCard} ${styles.blueGradient}`}>
//           <h3>Total Members</h3>
//           <p>{data.totalMembers}</p>
//         </div>
//         <div className={`${styles.statCard} ${styles.purpleGradient}`}>
//           <h3>Actions Taken</h3>
//           <p>{data.actionsTaken}</p>
//         </div>
//       </div>

//       <div className={styles.charts}>
//   {/* Bar Chart Section */}
//   <div className={`${styles.chartCard} ${styles.barChart}`}>
//     {loading ? (
//       <div className={styles.loading}>
//         <Spin size="large" />
//       </div>
//     ) : (
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data.dataTrends}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
//           <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#555" }} />
//           <YAxis tick={{ fontSize: 12, fill: "#555" }} />
//           <Tooltip contentStyle={{ backgroundColor: "#f5f5f5", border: "1px solid #ddd" }} />
//           <Legend />
//           <Bar dataKey="MTTA" fill={blue[6]} barSize={20} radius={[5, 5, 0, 0]} />
//           <Bar dataKey="MTTR" fill={red[6]} barSize={20} radius={[5, 5, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     )}
//   </div>

//   {/* Doughnut Chart Section */}
//   <div className={`${styles.chartCard} ${styles.doughnutChart}`}>
//     {loading ? (
//       <div className={styles.loading}>
//         <Spin size="large" />
//       </div>
//     ) : (
//       <ResponsiveContainer width="100%" height={350}>
//         <PieChart>
//           <Pie
//             data={data.pieData}
//             dataKey="value"
//             nameKey="name"
//             innerRadius={70}
//             outerRadius={100}
//             paddingAngle={5}
//             fill="#8884d8"
//           >
//             {data.pieData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={index === 0 ? red[5] : green[5]}
//                 stroke="#fff"
//                 strokeWidth={2}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     )}
//     <div className={styles.doughnutDetails}>
//       <h4>Ack vs Not Ack</h4>
//       <p>Total Cases: 100%</p>
//       <p><span style={{ color: red[6] }}>Ack:</span> {data.pieData[1].value}%</p>
//       <p><span style={{ color: green[6] }}>Not Ack:</span> {data.pieData[0].value}%</p>
//     </div>
//   </div>
// </div>

//     </div>
//   );
// };

// export default Dashboard;




import React from "react";
import { Chart1, Chart3, Chart4, GaugeChart } from "../../components/chartsoption/chartOptions";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Chart1 />
      <GaugeChart />
      <Chart3 />
      <Chart4 />

    </div>
  );
};

export default Dashboard;
