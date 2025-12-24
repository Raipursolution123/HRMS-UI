import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Card,
  Typography,
  message,
  Row,
  Col,
  Space
} from 'antd';
import {
  PlusOutlined,
  SendOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  MessageOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import '../styles/design-system.css';
import '../styles/table-pages.css';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const SupportUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mock API call
      console.log('Support Query Submitted:', {
        ...values,
        attachment: fileList[0]?.originFileObj
      });

      // Simulating a delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      message.success('Your support query has been sent successfully! Our team will get back to you soon.');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error('Failed to send query. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false; // Prevent auto-upload
    },
    fileList,
    maxCount: 1,
  };

  return (
    <div className="table-page-container" style={{ padding: '24px', minHeight: 'calc(100vh - 64px)', background: '#f0f2f5' }}>
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={14} xl={12}>
          <Card
            className="table-page-card"
            style={{
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}
          >
            <div style={{
              padding: '32px',
              background: 'linear-gradient(135deg, #6f53e1 0%, #8e75ff 100%)',
              color: 'white',
              marginBottom: '24px'
            }}>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                <QuestionCircleOutlined style={{ marginRight: '12px' }} />
                Support Centre
              </Title>
              <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginTop: '8px', fontSize: '16px' }}>
                Have a question or facing an issue? Send us your query and we'll help you out.
              </Paragraph>
            </div>

            <div style={{ padding: '0 32px 32px 32px' }}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark="optional"
              >
                <Form.Item
                  label={<span style={{ fontWeight: 600 }}>Problem Title</span>}
                  name="title"
                  rules={[{ required: true, message: 'Please enter a problem title' }]}
                >
                  <Input
                    placeholder="Enter a brief title for your problem"
                    prefix={<FileTextOutlined style={{ color: '#bfbfbf' }} />}
                    size="large"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  label={<span style={{ fontWeight: 600 }}>Problem Description</span>}
                  name="description"
                  rules={[{ required: true, message: 'Please describe the problem in detail' }]}
                >
                  <TextArea
                    rows={6}
                    placeholder="Provide a detailed description of the issue..."
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  label={<span style={{ fontWeight: 600 }}>Problem Query</span>}
                  name="query"
                  rules={[{ required: true, message: 'Please enter your specific query' }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="What specific help do you need?"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <Space>
                      <span style={{ fontWeight: 600 }}>Attachment</span>
                      <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                        (Optional: Screenshots, Photos)
                      </Typography.Text>
                    </Space>
                  }
                  name="attachment"
                >
                  <Upload.Dragger {...uploadProps} style={{ borderRadius: '8px', padding: '16px' }}>
                    <p className="ant-upload-drag-icon">
                      <PlusOutlined style={{ color: '#6f53e1' }} />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single image upload.</p>
                  </Upload.Dragger>
                </Form.Item>

                <Form.Item style={{ marginTop: '32px', marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<SendOutlined />}
                    size="large"
                    block
                    className="gradient-primary"
                    style={{
                      height: '50px',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: 600,
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(111, 83, 225, 0.3)'
                    }}
                  >
                    Send Query
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SupportUser;