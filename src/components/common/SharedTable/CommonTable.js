import React from 'react';
import { Table, Input, Select, Space, Button, Card, Pagination } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import ConfirmModal from '../SharedModal/ConfirmModal';

const { Search } = Input;
const { Option } = Select;

const CommonTable = ({
  title = "Table",
  data = [],
  columns = [],
  loading = false,
  showSearch = true,
  showEntriesFilter = true,
  showPagination = true,
  onSearch,
  onRefresh,
  onPageChange,
  currentPage = 1,
  pageSize = 10,
  total = 0,
  searchPlaceholder = "Search...",
  extraButtons = null,
  deleteModal,
}) => {
console.log(deleteModal,'deleteModal');
const {isOpen,message,handleDeleteConfirm,handleDeleteCancel} = deleteModal;

  // Default pagination settings
  const paginationConfig = showPagination ? {
    current: currentPage,
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) =>
      `Showing ${range[0]}-${range[1]} of ${total} entries`,
    onChange: onPageChange,
    onShowSizeChange: (current, size) => {
      if (onPageChange) onPageChange(current, size);
    }
  } : false;
console.log(isOpen,'isOpenisOpen',deleteModal);

  return (
    <Card
      title={title}
      style={{ margin: '16px' }}
      extra={
        <Space wrap>
          {showSearch && (
            <Search
              placeholder={searchPlaceholder}
              onSearch={onSearch}
              style={{ width: 250 }}
              allowClear
            />
          )}
          {extraButtons}
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={paginationConfig}
        scroll={{ x: true }}
        size="middle"
      />
      {isOpen && (
        <ConfirmModal
          isOpen
          title={deleteModal.title}
          message={message}
          onOk={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}    </Card>
  );
};

export default CommonTable;