import React, { useState, useEffect } from 'react';
import { Popover, Badge, List, Button, Typography, Empty, Avatar, Space } from 'antd';
import { BellOutlined, CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const { Text } = Typography;

// Initialize dayjs plugin
dayjs.extend(relativeTime);

const NotificationPopover = ({ userProfile }) => {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Simulate fetching notifications or adding the "Welcome Back" message on login/mount
    const firstName = userProfile?.first_name || 'User';
    const welcomeMsg = {
      id: Date.now(),
      title: 'Welcome Back!',
      description: `Welcome Back ${firstName}`,
      time: new Date(),
      read: false,
      type: 'info'
    };

    setNotifications([welcomeMsg]);
  }, [userProfile]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
    // Optionally mark as read when opened or leave it to manual "Mark all as read"
  };

  const notificationContent = (
    <div className="notification-container" style={{ width: 320 }}>
      <div className="notification-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Typography.Title level={5} style={{ margin: 0 }}>Notifications</Typography.Title>
        {unreadCount > 0 && (
          <Button type="link" onClick={handleMarkAllAsRead} style={{ padding: 0, height: 'auto' }}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="notification-list-wrapper" style={{ maxHeight: 400, overflowY: 'auto' }}>
        {notifications.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                className={`notification-item ${item.read ? 'read' : 'unread'}`}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  backgroundColor: item.read ? 'transparent' : '#f0f7ff',
                  transition: 'background-color 0.3s'
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={item.type === 'info' ? <InfoCircleOutlined /> : <CheckCircleOutlined />}
                      style={{ backgroundColor: item.type === 'info' ? '#1890ff' : '#52c41a' }}
                    />
                  }
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Text strong={!item.read}>{item.title}</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {dayjs(item.time).fromNow()}
                      </Text>
                    </div>
                  }
                  description={
                    <div style={{ marginTop: 4 }}>
                      <Text type="secondary" style={{ fontSize: '13px' }}>{item.description}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No notifications"
            style={{ margin: '32px 0' }}
          />
        )}
      </div>

      <div className="notification-footer" style={{
        padding: '8px 16px',
        borderTop: '1px solid #f0f0f0',
        textAlign: 'center'
      }}>
        <Button type="text" block style={{ color: '#8c8c8c' }}>
          View all notifications
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={notificationContent}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="bottomRight"
      overlayClassName="notification-popover"
      overlayStyle={{ paddingTop: 8 }}
    >
      <Badge count={unreadCount} offset={[-2, 10]} size="small" className="notification-badge">
        <Button
          type="text"
          icon={<BellOutlined style={{ fontSize: '18px', color: '#fff' }} />}
          className="hrms-header-action-btn"
          title="Notifications"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width: 40,
            borderRadius: '50%'
          }}
        />
      </Badge>
    </Popover>
  );
};

export default NotificationPopover;
