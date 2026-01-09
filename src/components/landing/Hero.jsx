import React, { useState } from 'react';
import { Typography, Button, Row, Col, Space, Carousel, Form, Input, Select, message } from 'antd';
import {
  ArrowRightOutlined,
  PlayCircleOutlined,
  TeamOutlined,
  PieChartOutlined,
  DollarCircleOutlined,
  UserAddOutlined,
  CalendarOutlined,
  StarOutlined,
  SafetyCertificateOutlined,
  SolutionOutlined,
  LeftOutlined,
  RightOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/slices/authSlice';
import { useToast } from '../../hooks/useToast';
import heroIllustration from '../../assets/landing/hero-illustration.png';
import slide1 from '../../assets/landing/slide1.png';
import slide2 from '../../assets/landing/slide2.png';
import slide3 from '../../assets/landing/slide3.png';
import slide4 from '../../assets/landing/slide4.png';

const { Title, Paragraph, Text } = Typography;

const slides = [slide1, slide2, slide3, slide4];

/*const CustomArrow = ({ className, style, onClick, direction }) => (
  <div
    className={className}
    style={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      zIndex: 2,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      [direction === 'next' ? 'right' : 'left']: '20px',
      color: '#1e293b'
    }}
    onClick={onClick}
  >
    {direction === 'next' ? <RightOutlined /> : <LeftOutlined />}
  </div>
);*/

const Hero = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const { Toast, contextHolder } = useToast();

  const onFinish = async (values) => {
    try {
      const { confirm_password, ...payload } = values;
      await dispatch(signup(payload)).unwrap();
      setFormSubmitted(true);
      Toast.success('Registration successful!');
    } catch (error) {
      Toast.error(error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div id="hero-section" style={{
      padding: '0',
      overflow: 'hidden'
    }}>
      {contextHolder}


      <div style={{ marginBottom: '80px', animation: 'fadeInUp 1s ease', position: 'relative' }}>
        <Carousel
          autoplay
          autoplaySpeed={4000}
          arrows={true}
          dots={{ className: "custom-dots" }}
          slidesToShow={1}
          infinite
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <div style={{
                overflow: 'hidden',
                boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
              }}>
                <img
                  src={slide}
                  alt={`Feature ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={11} style={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {!formSubmitted ? (
                <div className="glass-panel-light" style={{
                  padding: '32px',
                  borderRadius: '24px',
                  textAlign: 'left',
                  maxWidth: '500px',
                  margin: '0 auto'
                }}>
                  <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <Title level={2} style={{ margin: 0, color: '#1e293b' }}>
                      Register <span className="gradient-text">Yourself</span>
                    </Title>
                    <Paragraph style={{ color: '#e91111ff' }}>
                      If you are new here please register yourself fast!
                    </Paragraph>
                  </div>

                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
                  >
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item
                          name="first_name"
                          rules={[{ required: true, message: 'First name is required' }]}
                        >
                          <Input placeholder="First Name" prefix={<UserAddOutlined style={{ color: '#94a3b8' }} />} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="last_name"
                          rules={[{ required: true, message: 'Last name is required' }]}
                        >
                          <Input placeholder="Last Name" prefix={<UserAddOutlined style={{ color: '#94a3b8' }} />} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name="phone"
                      rules={[
                        { required: true, message: 'Please enter your phone number' },
                        { pattern: /^[0-9+\-\s()]*$/, message: 'Please enter a valid phone number' },
                        { min: 10, message: 'Phone number must be at least 10 digits' }
                      ]}
                    >
                      <Input placeholder="Phone Number" prefix={<span style={{ color: '#94a3b8' }}>📞</span>} />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter your work email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input placeholder="Work Email" prefix={<span style={{ color: '#94a3b8' }}>✉️</span>} />
                    </Form.Item>



                    <Form.Item
                      name="company_name"
                      rules={[{ required: true, message: 'Company name is required' }]}
                    >
                      <Input placeholder="Company Name" prefix={<TeamOutlined style={{ color: '#94a3b8' }} />} />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      style={{ marginBottom: 10 }}
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                        className="auth-input"
                      />
                    </Form.Item>

                    <Form.Item
                      name="confirm_password"
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




                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        loading={loading}
                        style={{
                          height: '48px',
                          borderRadius: '12px',
                          fontWeight: 600,
                          fontSize: '16px',
                          background: 'linear-gradient(45deg, #1677ff, #4096ff)',
                          border: 'none',
                          boxShadow: '0 4px 14px 0 rgba(22, 119, 255, 0.39)'
                        }}
                      >
                        Register Now
                      </Button>
                    </Form.Item>
                  </Form>

                </div>
              ) : (
                <div className="glass-panel-light" style={{
                  padding: '48px 32px',
                  borderRadius: '24px',
                  textAlign: 'center',
                  maxWidth: '500px',
                  margin: '0 auto',
                  animation: 'fadeIn 0.5s ease'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#f6ffed',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                    border: '1px solid #b7eb8f'
                  }}>
                    <SafetyCertificateOutlined style={{ fontSize: '40px', color: '#52c41a' }} />
                  </div>
                  <Title level={2} style={{ color: '#1e293b', marginBottom: '16px' }}>
                    Thank You!
                  </Title>
                  <Paragraph style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px' }}>
                    Your registration has been completed successfully.You can now sign in to the app using your valid credentials from the signin page.Once logged in, you can explore all IntelliHR features for up to 5 employees at no cost.
                  </Paragraph>
                  <Button
                    type="default"
                    onClick={() => {
                      setFormSubmitted(false);
                      form.resetFields();
                    }}
                    style={{ borderRadius: '30px' }}
                  >
                    Register Another Company
                  </Button>
                </div>
              )}
            </Space>
          </Col>
          <Col xs={24} md={13}>
            <div className="hero-image-container" style={{
              position: 'relative',
              animation: 'fadeInRight 1s ease 0.5s both',
              border: 'none',
              background: 'transparent',
              boxShadow: 'none'
            }}>
              <div style={{
                position: 'absolute',
                top: '20%',
                right: '-10%',
                width: '300px',
                height: '300px',
                background: 'rgba(22, 119, 255, 0.15)',
                filter: 'blur(80px)',
                borderRadius: '50%',
                zIndex: 0
              }} />
              <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-5%',
                width: '250px',
                height: '250px',
                background: 'rgba(114, 46, 209, 0.1)',
                filter: 'blur(60px)',
                borderRadius: '50%',
                zIndex: 0
              }} />

              <div style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '24px',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
              }}>
                <img
                  src={heroIllustration}
                  alt="IntelliHR Illustration"
                  style={{
                    width: '100%',
                    borderRadius: '16px',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Hero;
