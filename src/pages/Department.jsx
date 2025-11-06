import React, { useState } from 'react';
import { Table, Button, Space, Card, Row, Col, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import SharedModal from '../components/common/SharedModal/SharedModal';
import { useDepartments } from '../hooks/useDepartments';
const { Option } = Select;

const Department = () => {
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
     const { departments, loading, error, refetch } = useDepartments();

     console.log(departments, loading, error, refetch);
     


  const departmentData = [
    {
      key: 1,
      sl: 1,
      name: 'Human Resource',
    },
    {
      key: 2,
      sl: 2,
      name: 'Engineering',
    },
    {
      key: 3,
      sl: 3,
      name: 'Data',
    },
    {
      key: 4,
      sl: 4,
      name: 'Networking',
    },
    {
      key: 5,
      sl: 5,
      name: 'Management',
    },
    {
      key: 6,
      sl: 6,
      name: 'field',
    },
    {
      key: 7,
      sl: 7,
      name: 'architect',
    },
    {
      key: 8,
      sl: 8,
      name: 'Human Resources',
    },
    {
      key: 9,
      sl: 9,
      name: 'cxvvxc',
    },
    {
      key: 10,
      sl: 10,
      name: '45454',
    },
  ];

  const columns = [
    {
      title: 'S/L',
      dataIndex: 'sl',
      key: 'sl',
      width: 80,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log('Edit:', record);
  };

  const handleDelete = (record) => {
    console.log('Delete:', record);
  };

  const handleAddNew = () => {
    setIsModalOpen(true)
  };

  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: 74, 
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => 
      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
    pageSizeOptions: ['10', '20', '50', '100'],
    onChange: (page, size) => {
      setCurrentPage(page);
      setPageSize(size);
    },
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card 
        title="Department List" 
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddNew}
          >
            Add New Department
          </Button>
        }
      >
        <Row style={{ marginBottom: 16 }} align="middle">
          <Col>
            <span style={{ marginRight: 8 }}>Show</span>
            <Select
              value={pageSize}
              onChange={(value) => setPageSize(value)}
              style={{ width: 80, marginRight: 8 }}
            >
              <Option value={10}>10</Option>
              <Option value={20}>20</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
            <span>entries</span>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={departmentData}
          pagination={pagination}
          size="middle"
          bordered
          scroll={{ x: 400 }}
        />
      </Card>
      {isModalOpen && <SharedModal {...{isModalOpen,setIsModalOpen}} title=" Add Department"/>}
    </div>
  );
};

export default Department;