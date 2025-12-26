import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Image, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, BankOutlined, HomeOutlined } from '@ant-design/icons';
import { signup, clearError } from '../store/slices/authSlice';
import logo from '../assets/images/logo2.svg';
import { useToast } from '../hooks/useToast';

const { Title, Text } = Typography;

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { Toast, contextHolder } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values) => {
    try {
      const { confirm_password, ...payload } = values; // Exclude confirm_password
      const result = await dispatch(signup(payload)).unwrap();
      Toast.success("Registration Successful! Please login.");
      navigate('/login');
    } catch (error) {
      Toast.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh', // Changed to minHeight for better scrolling on small screens
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6e9ff',
        padding: '20px'
      }}
    >
      <Button
        type="text"
        icon={<HomeOutlined />}
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          fontWeight: 600,
          color: '#333'
        }}
      >
        Back to Home
      </Button>
      {contextHolder}
      <Card
        style={{
          width: '100%',
          maxWidth: 480, // Slightly wider for signup form
          padding: '20px 20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          borderRadius: '6px',
          backgroundColor: '#f7f7f7',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Image
            width={220}
            preview={false}
            src={logo}
            style={{ marginBottom: 10 }}
          />
          <Title level={3} style={{ color: '#333', marginBottom: 5 }}>
            Create Account
          </Title>
          <Text type="secondary">Get started with your free account</Text>
        </div>

        <Form form={form} name="signup" onFinish={onFinish} autoComplete="off" layout="vertical" size="large">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="first_name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="company_name"
          >
            <Input
              prefix={<BankOutlined />}
              placeholder="Company Name (Optional)"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email Address"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                backgroundColor: '#6f53e1',
                borderColor: '#6f53e1',
                fontWeight: 600,
              }}
            >
              Sign Up
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text>Already have an account? </Text>
            <Link to="/login" style={{ color: '#6f53e1', fontWeight: 600 }}>Log In</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
