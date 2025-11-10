import React from 'react';
import { Card, Descriptions, Table, Divider, Tag, Avatar, Row, Col } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';

const Profile = () => {
  // Sample data
  const profileData = {
    name: 'sujit waqh',
    email: '',
    address: '',
    phone: '0',
    dateOfJoining: '04/11/2025',
    dateOfBirth: '04/11/2025',
    gender: 'Male',
    religion: ''
  };

  // Educational Qualification Data
  const educationColumns = [
    {
      title: 'Institute',
      dataIndex: 'institute',
      key: 'institute',
      render: (text) => text || '--',
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
      render: (text) => text || '--',
    },
    {
      title: 'Board / University',
      dataIndex: 'boardUniversity',
      key: 'boardUniversity',
      render: (text) => text || '--',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      render: (text) => text || '--',
    },
    {
      title: 'GPA / CGPA',
      dataIndex: 'gpa',
      key: 'gpa',
      render: (text) => text || '--',
    },
    {
      title: 'Passing Year',
      dataIndex: 'passingYear',
      key: 'passingYear',
      render: (text) => text || '--',
    },
  ];

  const educationData = [
    {
      key: '1',
      institute: '--',
      degree: '--',
      boardUniversity: '--',
      result: '--',
      gpa: '--',
      passingYear: '--'
    }
  ];

  // Professional Experience Data
  const experienceColumns = [
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
      render: (text) => text || '--',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      render: (text) => text || '--',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => text || '--',
    },
    {
      title: 'Skill',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills) => (
        skills && skills.length > 0 ? (
          <div>
            {skills.map((skill, index) => (
              <Tag key={index} color="blue" style={{ margin: '2px' }}>
                {skill}
              </Tag>
            ))}
          </div>
        ) : '--'
      ),
    },
    {
      title: 'Responsibility',
      dataIndex: 'responsibility',
      key: 'responsibility',
      render: (text) => text || '--',
    },
  ];

  const experienceData = [
    {
      key: '1',
      organization: '--',
      designation: '--',
      duration: '--',
      skills: [],
      responsibility: '--'
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Profile Header */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col>
            <Avatar 
              size={80} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#1890ff' }}
            />
          </Col>
          <Col flex={1}>
            <h2 style={{ margin: 0, marginBottom: '8px' }}>{profileData.name}</h2>
            <div style={{ color: '#666' }}>
              <div>
                <MailOutlined style={{ marginRight: '8px' }} />
                Email: {profileData.email || '--'}
              </div>
              <div>
                <EnvironmentOutlined style={{ marginRight: '8px' }} />
                Address: {profileData.address || '--'}
              </div>
              <div>
                <PhoneOutlined style={{ marginRight: '8px' }} />
                Phone: {profileData.phone || '--'}
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Educational Qualification Section */}
      <Card 
        title="EDUCATIONAL QUALIFICATION" 
        style={{ marginBottom: '24px' }}
      >
        <Table 
          columns={educationColumns} 
          dataSource={educationData}
          pagination={false}
          bordered
          size="middle"
        />
      </Card>

      <Divider />

      {/* Professional Experience Section */}
      <Card 
        title="PROFESSIONAL EXPERIENCE" 
        style={{ marginBottom: '24px' }}
      >
        <Table 
          columns={experienceColumns} 
          dataSource={experienceData}
          pagination={false}
          bordered
          size="middle"
        />
      </Card>

      <Divider />

      {/* Personal Information Section */}
      <Card title="PERSONAL INFORMATION">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Name">
            {profileData.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {profileData.email || '--'}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {profileData.address || '--'}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {profileData.phone || '--'}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Joining">
            <CalendarOutlined style={{ marginRight: '8px' }} />
            {profileData.dateOfJoining}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            <CalendarOutlined style={{ marginRight: '8px' }} />
            {profileData.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {profileData.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Religion">
            {profileData.religion || '--'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;