
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, message, Typography, Image } from 'antd';
import { UserOutlined, LockOutlined, HomeOutlined } from '@ant-design/icons';
import { login, clearError, logout } from '../store/slices/authSlice';
import { authAPI } from '../services/authServices';
import logo from '../assets/images/logo2.svg';
import { useToast } from '../hooks/useToast';
import './AuthStyles.css';
const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { Toast, contextHolder } = useToast();


  const location = useLocation();
  const logoutTriggered = new URLSearchParams(location.search).get('logout') === 'true';

  useEffect(() => {
    if (logoutTriggered) {
      dispatch(logout());
      // Optional: Clean up URL after logout
      navigate('/login', { replace: true });
    }
  }, [logoutTriggered, dispatch, navigate]);

  useEffect(() => {
    // Navigation is now handled in onFinish after role check
  }, [isAuthenticated, navigate]);

  // useEffect(() => {
  //   if (error) {
  //     message.error(error);
  //     dispatch(clearError());
  //   }
  // }, [error, dispatch]);

  const onFinish = async (values) => {
    try {
      const result = await dispatch(login(values)).unwrap();

      // Fetch user profile to check role
      try {
        const { data: profile } = await authAPI.getProfile();

        // Check if role is Super Admin
        //console.log("Fetched Profile:", profile);
        //console.log("Role Name RAW:", profile?.role?.name);

        const roleName = profile?.role?.name?.trim();
        //console.log("Role Name TRIMMED:", roleName);

        if (roleName === "Super Admin") {
          //console.log("MATCH! Redirecting to Super Admin Portal...");
          message.success("Login Successful. Redirecting to Super Admin Portal...");
          // Redirect to Super Admin UI on port 3001 with tokens
          // Fix: Tokens are likely at the root of result based on authSlice
          const access = result.access || result.tokens?.access;
          const refresh = result.refresh || result.tokens?.refresh;

          //console.log("Tokens found:", { access, refresh });

          if (access && refresh) {
            // Determine Super Admin UI URL based on current hostname (runtime check)
            const isProduction = window.location.hostname === 'hrms.raipursolutions.com' ||
              window.location.hostname.includes('raipursolutions.com');
            const superAdminUrl = process.env.REACT_APP_SUPER_ADMIN_UI_URL ||
              (isProduction
                ? 'https://hrmssuperadmin.raipursolutions.com'
                : 'http://localhost:3001');

            // Redirect to Super Admin UI with authentication tokens
            window.location.href = `${superAdminUrl}?access=${access}&refresh=${refresh}`;
            return;
          } else {
            //console.error("Tokens missing in login response:", result);
            message.error("Failed to retrieve authentication tokens.");
            // Fallback or halt? If super admin, we probably shouldn't go to /app if it fails.
            // But to avoid dead end, maybe just let it fail naturally or stay on page.
            return;
          }
        } else {
          console.log("NO MATCH. Redirecting to /app...");
          Toast.success("Login Successfully");
          setTimeout(() => {
            navigate('/app');
          }, 300);
        }
      } catch (profileError) {
        console.error("Failed to fetch profile:", profileError);
        // Fallback to default app if profile fetch fails
        navigate('/app');
      }

    } catch (error) {
      console.log("Login Dispatch Error:", error);
      Toast.error(error)
    }

  };
  return (
    <div className="auth-container landing-bg">

      <Button
        type="text"
        icon={<HomeOutlined />}
        onClick={() => navigate('/')}
        className="auth-back-btn"
      >
        Back to Home
      </Button>

      {contextHolder}

      <Card className="auth-card" bordered={false} style={{ width: '100%', maxWidth: 420 }}>
        <div className="auth-header">
          <Image
            src={logo}
            preview={false}
            className="auth-logo"
          />
          <Title level={3} className="auth-title">Welcome Back</Title>
          <Text className="auth-subtitle">Log in to your HRMS dashboard</Text>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            label={<span className="auth-label">Registered Email</span>}
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="name@example.com"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="auth-label">Password</span>}
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••••"
              className="auth-input"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="auth-submit-btn"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-footer">
          <Text>Don't have an account? </Text>
          <Button
            type="link"
            onClick={() => navigate('/signup')}
            className="auth-link"
          >
            Create Account
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
