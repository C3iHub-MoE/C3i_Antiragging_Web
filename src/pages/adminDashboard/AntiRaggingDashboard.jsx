import React, { useState } from 'react';
import {
  Layout,
  Card,
  Select,
  Row,
  Col,
  Typography,
  Statistic,
  Spin,
  Tooltip,
  DatePicker,
} from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartTooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { PieChart, Pie } from 'recharts';
import { LoadingOutlined } from '@ant-design/icons';
import { blue, red, green, purple } from '@ant-design/colors';
import dayjs from 'dayjs';

const { Header, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data
const mockData = {
  National: {
    'State 1': {
      'District 1': {
        'College 1': {
          dataTrends: [
            { name: '2023-05-01', MTTA: 2.8, MTTR: 13.5 },
            { name: '2023-06-01', MTTA: 2.6, MTTR: 12.8 },
          ],
          pieData: [
            { name: 'Not Reopened', value: 60 },
            { name: 'Reopened', value: 40 },
          ],
          totalStudents: 500,
          dailySOSSendingRate: 20,
          actionsTaken: 100,
          totalMembers: 150,
        },
        'College 2': {
          dataTrends: [
            { name: '2023-05-01', MTTA: 3.0, MTTR: 15.5 },
            { name: '2023-06-01', MTTA: 2.7, MTTR: 14.0 },
          ],
          pieData: [
            { name: 'Not Reopened', value: 55 },
            { name: 'Reopened', value: 45 },
          ],
          totalStudents: 700,
          dailySOSSendingRate: 30,
          actionsTaken: 200,
          totalMembers: 250,
        },
      },
    },
  },
};

const Dashboard = () => {
  const [national, setNational] = useState('National');
  const [state, setState] = useState('State 1');
  const [district, setDistrict] = useState('District 1');
  const [college, setCollege] = useState('College 1');
  const [data, setData] = useState(mockData['National']['State 1']['District 1']['College 1']);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    updateData(national, state, district, college, dates);
  };

  const updateData = (selectedNational, selectedState, selectedDistrict, selectedCollege, selectedDateRange) => {
    setLoading(true);

    // Filter data
    let filteredData =
      mockData[selectedNational]?.[selectedState]?.[selectedDistrict]?.[selectedCollege];

    if (selectedDateRange?.[0] && selectedDateRange?.[1]) {
      const startDate = dayjs(selectedDateRange[0]);
      const endDate = dayjs(selectedDateRange[1]);

      filteredData = {
        ...filteredData,
        dataTrends: filteredData?.dataTrends?.filter((entry) => {
          const entryDate = dayjs(entry.name);
          return entryDate.isBetween(startDate, endDate, 'day', '[]');
        }),
      };
    }

    // Update state after filtering
    setTimeout(() => {
      setData(filteredData || mockData['National']['State 1']['District 1']['College 1']);
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <Content style={{ padding: '30px', background: '#f0f2f5' }}>
        <Card className="filters-card">
          {/* Filters */}
          <Row gutter={[16, 16]} align="middle" justify="start" className="filter-row">
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={national}
                onChange={(value) => {
                  setNational(value);
                  updateData(value, state, district, college, dateRange);
                }}
              >
                <Option value="National">National</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={state}
                onChange={(value) => {
                  setState(value);
                  updateData(national, value, district, college, dateRange);
                }}
              >
                <Option value="State 1">State 1</Option>
                <Option value="State 2">State 2</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={district}
                onChange={(value) => {
                  setDistrict(value);
                  updateData(national, state, value, college, dateRange);
                }}
              >
                <Option value="District 1">District 1</Option>
                <Option value="District 2">District 2</Option>
              </Select>
            </Col>
            <Col xs={24} sm={6}>
              <Select
                style={{ width: '100%' }}
                value={college}
                onChange={(value) => {
                  setCollege(value);
                  updateData(national, state, district, value, dateRange);
                }}
              >
                <Option value="College 1">College 1</Option>
                <Option value="College 2">College 2</Option>
              </Select>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col xs={24} sm={6}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={handleDateRangeChange}
                format="YYYY-MM-DD"
              />
            </Col>
          </Row>
        </Card>

        {/* Statistics */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Total Students" value={data.totalStudents || 0} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Daily SOS Sending Rate" value={data.dailySOSSendingRate || 0} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Total Members" value={data.totalMembers || 0} />
            </Card>
          </Col>
          <Col xs={24} sm={6}>
            <Card>
              <Statistic title="Actions Taken" value={data.actionsTaken || 0} />
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12}>
            <Card>
              {loading ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.dataTrends || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartTooltip />
                    <Legend />
                    <Bar dataKey="MTTA" fill="#8884d8" />
                    <Bar dataKey="MTTR" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.pieData || []}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    fill="#8884d8"
                  >
                    {data.pieData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={[blue[4], red[4]][index]} />
                    ))}
                  </Pie>
                  <RechartTooltip />
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
