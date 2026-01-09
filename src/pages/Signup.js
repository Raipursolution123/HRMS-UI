import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Card, Typography, Image, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, BankOutlined, HomeOutlined } from '@ant-design/icons';
import { signup, clearError } from '../store/slices/authSlice';
import logo from '../assets/images/logo2.svg';
import { useToast } from '../hooks/useToast';
import './AuthStyles.css';

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
    <div className="auth-container landing-bg">

      {contextHolder}

      <Card className="auth-card" bordered={false} style={{ width: '100%', maxWidth: 520 }}>
        <div className="auth-header">
          <Image
            src={logo}
            preview={false}
            className="auth-logo"
            style={{ marginBottom: 0 }}
          />
          <Title level={3} className="auth-title">Create Account</Title>
          <Text className="auth-subtitle">Get started with your free account</Text>
        </div>

        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="middle"
        >
          <Row gutter={12}> 
            <Col span={12}>
              <Form.Item
                name="first_name"
                label={<span className="auth-label">First Name</span>}
                rules={[{ required: true, message: 'Please input your first name!' }]}
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="John" className="auth-input" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="last_name"
                label={<span className="auth-label">Last Name</span>}
                rules={[{ required: true, message: 'Please input your last name!' }]}
                style={{ marginBottom: 10 }}
              >
                <Input placeholder="Doe" className="auth-input" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="company_name"
                label={<span className="auth-label">Company Name</span>}
                style={{ marginBottom: 10 }}
              >
                <Input
                  prefix={<BankOutlined />}
                  placeholder="Company"
                  className="auth-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label={<span className="auth-label">Work Email</span>}
                style={{ marginBottom: 10 }}
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="name@company.com"
                  className="auth-input"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="password"
                label={<span className="auth-label">Password</span>}
                style={{ marginBottom: 10 }}
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  className="auth-input"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirm_password"
                label={<span className="auth-label">Confirm Password</span>}
                style={{ marginBottom: 10 }}
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
                  placeholder="Confirm"
                  className="auth-input"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0, marginTop: 5 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="auth-submit-btn"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <Text>Already have an account? </Text>
          <Button
            type="link"
            onClick={() => navigate('/login')}
            className="auth-link"
          >
            Log In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
