import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Table, 
  Tag, 
  Typography, 
  Divider,
  Avatar,
  List,
  Badge,
  Statistic
} from 'antd';
import { 
  UserOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  LogoutOutlined,
  BellOutlined,
  TeamOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setCheckInTime(null);
    setIsCheckedIn(false);
  };

  const formatTime = (date) => {
    if (!date) return '--:--';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Stats data
  const statsData = [
    {
      title: 'TOTAL EMPLOYEE',
      value: 82,
      icon: <TeamOutlined />,
      color: '#1890ff'
    },
    {
      title: 'DEPARTMENT',
      value: 74,
      icon: <UserOutlined />,
      color: '#52c41a'
    },
    {
      title: 'PRESENT',
      value: 82,
      icon: <CheckCircleOutlined />,
      color: '#52c41a'
    },
    {
      title: 'ABSENT',
      value: 0,
      icon: <ClockCircleOutlined />,
      color: '#ff4d4f'
    }
  ];

  // Table columns for attendance
  const attendanceColumns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: () => <Avatar size="small" icon={<UserOutlined />} />,
      width: 60,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'In Time',
      dataIndex: 'inTime',
      key: 'inTime',
    },
    {
      title: 'Out Time',
      dataIndex: 'outTime',
      key: 'outTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Late' ? 'red' : status === 'Present' ? 'green' : 'default'}>
          {status}
        </Tag>
      ),
    },
  ];

  // Sample attendance data
  const attendanceData = [
    {
      key: '1',
      name: 'John Doe',
      inTime: '09:00 AM',
      outTime: '06:00 PM',
      status: 'Present'
    },
    {
      key: '2',
      name: 'Jane Smith',
      inTime: '09:15 AM',
      outTime: '06:00 PM',
      status: 'Late'
    },
    {
      key: '3',
      name: 'Mike Johnson',
      inTime: '08:45 AM',
      outTime: '05:45 PM',
      status: 'Present'
    },
  ];

  // Notice board data
  const noticeData = [
    {
      title: 'Meeting',
      date: '12 Mar 2025',
      publishedBy: 'Admin',
      description: 'Dissertations',
    },
    {
      title: 'Holiday Notice',
      date: '10 Mar 2025',
      publishedBy: 'HR',
      description: 'Office will remain closed on 15th March',
    },
    {
      title: 'Team Lunch',
      date: '08 Mar 2025',
      publishedBy: 'Manager',
      description: 'Team lunch this Friday at 1:00 PM',
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>Dashboard</Title>
      
      {/* Stats Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        {statsData.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card 
              style={{ 
                borderLeft: `4px solid ${stat.color}`,
                borderRadius: '8px'
              }}
              bodyStyle={{ padding: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary" style={{ fontSize: '12px', fontWeight: '500' }}>
                    {stat.title}
                  </Text>
                  <Title 
                    level={2} 
                    style={{ 
                      margin: '8px 0 0 0', 
                      color: stat.color,
                      fontSize: '28px'
                    }}
                  >
                    {stat.value}
                  </Title>
                </div>
                <div 
                  style={{
                    fontSize: '32px',
                    color: stat.color,
                    opacity: 0.8
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* Attendance Table */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            {/* Check In/Out Card */}
            <Col span={24}>
              <Card>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <Title level={4} style={{ marginBottom: '8px', color: '#1890ff' }}>
                    HEY ADMIN PLEASE CHECK IN/OUT YOUR ATTENDANCE
                  </Title>
                  <Text type="secondary" style={{ display: 'block', marginBottom: '16px' }}>
                    Your IP is 49.3/24.192
                  </Text>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                    {!isCheckedIn ? (
                      <Button 
                        type="primary" 
                        icon={<CheckCircleOutlined />} 
                        size="large"
                        onClick={handleCheckIn}
                        style={{ minWidth: '120px' }}
                      >
                        Check In
                      </Button>
                    ) : (
                      <Button 
                        danger
                        icon={<LogoutOutlined />} 
                        size="large"
                        onClick={handleCheckOut}
                        style={{ minWidth: '120px' }}
                      >
                        Check Out
                      </Button>
                    )}
                    {isCheckedIn && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircleOutlined style={{ color: '#52c41a' }} />
                        <Text strong>Checked In: {formatTime(checkInTime)}</Text>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Col>

            {/* Attendance Table */}
            <Col span={24}>
              <Card 
                title={
                  <span style={{ fontWeight: '600' }}>
                    <ClockCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                    Today Attendance
                  </span>
                }
                style={{ borderRadius: '8px' }}
              >
                <Table 
                  columns={attendanceColumns}
                  dataSource={attendanceData}
                  pagination={false}
                  scroll={{ x: 500 }}
                  size="middle"
                />
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right Sidebar */}
        <Col xs={24} lg={8}>
          <Row gutter={[0, 16]}>
            {/* Department Section */}
            <Col span={24}>
              <Card 
                title={
                  <span style={{ fontWeight: '600' }}>
                    <TeamOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                    DEPARTMENT
                  </span>
                }
                style={{ borderRadius: '8px' }}
              >
                <div style={{ textAlign: 'center', padding: '30px 20px' }}>
                  <div 
                    style={{
                      fontSize: '48px',
                      fontWeight: 'bold',
                      color: '#52c41a',
                      marginBottom: '8px'
                    }}
                  >
                    PRESENT
                  </div>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    Department status overview
                  </Text>
                </div>
              </Card>
            </Col>

            {/* Notice Board */}
            <Col span={24}>
              <Card 
                title={
                  <span style={{ fontWeight: '600' }}>
                    <BellOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                    NOTICE BOARD
                  </span>
                }
                style={{ borderRadius: '8px' }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={noticeData}
                  renderItem={item => (
                    <List.Item
                      style={{
                        borderLeft: '3px solid #1890ff',
                        paddingLeft: '12px',
                        marginBottom: '12px',
                        backgroundColor: '#fafafa',
                        borderRadius: '4px',
                        padding: '12px'
                      }}
                    >
                      <List.Item.Meta
                        title={
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text strong>{item.title}</Text>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {item.date}
                            </Text>
                          </div>
                        }
                        description={
                          <div>
                            <div style={{ marginBottom: '4px' }}>
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                Published By: {item.publishedBy}
                              </Text>
                            </div>
                            <Text style={{ fontSize: '13px' }}>
                              {item.description}
                            </Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                  locale={{ emptyText: 'No notices available' }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;