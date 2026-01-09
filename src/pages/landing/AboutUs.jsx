import React from 'react';
import { Typography, Row, Col, Card, Button, Avatar, Timeline, Tag } from 'antd';
import {
  RocketOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  GlobalOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
  BulbOutlined,
  HeartOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

const AboutUs = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const features = [
    {
      title: 'Seamless Efficiency',
      description: 'Automate tedious HR tasks like payroll, attendance, and leave management, allowing you to focus on strategy.',
      icon: <RocketOutlined />,
      color: '#1677ff'
    },
    {
      title: 'Data Security',
      description: 'Enterprise-grade security ensures your employee data is safe, compliant, and protected at all times.',
      icon: <SafetyCertificateOutlined />,
      color: '#52c41a'
    },
    {
      title: 'Employee Centric',
      description: 'Empower your workforce with self-service portals, transparency, and tools that boost engagement.',
      icon: <TeamOutlined />,
      color: '#722ed1'
    },
    {
      title: 'Scalable Growth',
      description: 'Whether you are a startup or an enterprise, IntelliHR grows with you, adapting to your changing needs.',
      icon: <GlobalOutlined />,
      color: '#fa8c16'
    }
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textAlign: 'center',
          padding: 'clamp(80px, 15vw, 120px) 24px 60px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <Tag color="#722ed1" style={{ marginBottom: '16px', padding: '6px 16px', borderRadius: '20px', fontSize: '14px' }}>
          By Raipur Solutions
        </Tag>
        <Title level={1} style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '24px', lineHeight: 1.2 }}>
          Redefining the Future of <br />
          <span className="gradient-text">Workforce Management</span>
        </Title>
        <Paragraph style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#64748b', maxWidth: '800px', margin: '0 auto 40px' }}>
          IntelliHR isn't just a tool; it's a strategic partner designed to transform how businesses manage their most valuable asset—their people.
        </Paragraph>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            type="primary"
            size="large"
            style={{
              height: '56px',
              padding: '0 40px',
              fontSize: '18px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)'
            }}
            onClick={() => navigate('/signup')}
          >
            Get Started
          </Button>
          <Button
            size="large"
            style={{
              height: '56px',
              padding: '0 40px',
              fontSize: '18px',
              borderRadius: '28px',
            }}
            onClick={() => window.scrollTo({ top: document.getElementById('story').offsetTop - 100, behavior: 'smooth' })}
          >
            Our Story
          </Button>
        </div>
      </motion.div>



      <div style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card
            className="glass-panel-light"
            bodyStyle={{ padding: '40px' }}
            style={{ borderRadius: '32px', border: 'none' }}
          >
            <Row gutter={[48, 48]} justify="center">
              <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
                <Title level={2} style={{ margin: 0, color: '#1677ff', fontSize: '3rem' }}>99%</Title>
                <Text style={{ fontSize: '16px', color: '#64748b' }}>Customer Satisfaction</Text>
              </Col>
              <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
                <Title level={2} style={{ margin: 0, color: '#722ed1', fontSize: '3rem' }}>24/7</Title>
                <Text style={{ fontSize: '16px', color: '#64748b' }}>Expert Support</Text>
              </Col>
              <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
                <Title level={2} style={{ margin: 0, color: '#fa8c16', fontSize: '3rem' }}>50+</Title>
                <Text style={{ fontSize: '16px', color: '#64748b' }}>Features Integrated</Text>
              </Col>
            </Row>
          </Card>
        </motion.div>
      </div>

      <div id="story" style={{ padding: '80px 24px', background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(22,119,255,0.05) 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Row gutter={[64, 64]} align="middle">
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Tag color="blue" style={{ marginBottom: '16px' }}>OUR MISSION</Tag>
                <Title level={2} style={{ fontSize: '2.5rem', marginBottom: '24px' }}>
                  Innovating for a <br />Better Tomorrow
                </Title>
                <Paragraph style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.8 }}>
                  At <strong>Raipur Solutions</strong>, we believe that technology should empower people, not complicate their lives. IntelliHR was born from a simple idea: to create a Human Resource Management System that is actually human-centric.
                </Paragraph>
                <Paragraph style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: 1.8, marginBottom: '32px' }}>
                  We noticed that businesses were struggling with fragmented tools, spreadsheets, and clunky legacy software. Our mission became clear—build a unified, intuitive, and beautiful platform that handles the complexities of HR so that leaders can focus on building great cultures.
                </Paragraph>

                <div style={{ display: 'flex', gap: '24px', marginTop: '40px' }}>
                  <div>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px', background: '#e6f7ff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', color: '#1677ff', fontSize: '24px'
                    }}>
                      <BulbOutlined />
                    </div>
                    <Title level={5}>Innovation First</Title>
                    <Text type="secondary">Always ahead of the curve.</Text>
                  </div>
                  <div>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px', background: '#fff0f6',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', color: '#eb2f96', fontSize: '24px'
                    }}>
                      <HeartOutlined />
                    </div>
                    <Title level={5}>People Focused</Title>
                    <Text type="secondary">Designed with empathy.</Text>
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col xs={24} lg={12}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  background: 'white', padding: '40px', borderRadius: '32px',
                  boxShadow: '0 20px 80px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2
                }}>
                  <Title level={3} style={{ marginBottom: '32px' }}>Why Raipur Solutions?</Title>
                  <Timeline
                    items={[
                      {
                        color: 'blue',
                        children: (
                          <div style={{ paddingBottom: '24px' }}>
                            <Title level={5} style={{ margin: 0 }}>Expertise in Software</Title>
                            <Text type="secondary">Years of experience in building scalable enterprise solutions.</Text>
                          </div>
                        ),
                      },
                      {
                        color: 'purple',
                        children: (
                          <div style={{ paddingBottom: '24px' }}>
                            <Title level={5} style={{ margin: 0 }}>Commitment to Quality</Title>
                            <Text type="secondary">We don't just ship code; we deliver excellence and reliability.</Text>
                          </div>
                        ),
                      },
                      {
                        color: 'green',
                        children: (
                          <div style={{ paddingBottom: '24px' }}>
                            <Title level={5} style={{ margin: 0 }}>Customer Partnership</Title>
                            <Text type="secondary">We view our clients as partners, not just users.</Text>
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>

                <div style={{
                  position: 'absolute', top: -40, right: -40, width: '200px', height: '200px',
                  background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)', opacity: 0.1, borderRadius: '50%', zIndex: 1
                }} />
                <div style={{
                  position: 'absolute', bottom: -40, left: -40, width: '150px', height: '150px',
                  background: '#fa8c16', opacity: 0.1, borderRadius: '50%', zIndex: 1
                }} />
              </motion.div>
            </Col>
          </Row>
        </div>
      </div>

      <div style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ fontSize: '2.5rem' }}>Why Choose <span style={{ color: '#1677ff' }}>IntelliHR?</span></Title>
            <Paragraph style={{ fontSize: '1.2rem', color: '#64748b' }}>
              Designed to solve the real problems of modern businesses.
            </Paragraph>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row gutter={[32, 32]}>
              {features.map((feature, index) => (
                <Col xs={24} md={12} lg={6} key={index}>
                  <motion.div variants={itemVariants}>
                    <Card
                      hoverable
                      className="glass-panel-light"
                      style={{ height: '100%', borderRadius: '24px', border: 'none', transition: 'all 0.3s' }}
                      bodyStyle={{ padding: '32px' }}
                    >
                      <div style={{
                        width: '60px', height: '60px', borderRadius: '16px',
                        background: `${feature.color}15`, color: feature.color, fontSize: '28px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
                      }}>
                        {feature.icon}
                      </div>
                      <Title level={4} style={{ marginBottom: '16px' }}>{feature.title}</Title>
                      <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                        {feature.description}
                      </Paragraph>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>
      </div>


      <div style={{ padding: '0 24px 80px' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)',
          borderRadius: '32px', padding: 'clamp(40px, 8vw, 80px)', textAlign: 'center',
          color: 'white', position: 'relative', overflow: 'hidden'
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <Title level={2} style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '24px' }}>
              Ready to Transform Your Workplace?
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 40px' }}>
              Join thousands of forward-thinking companies who trust IntelliHR to manage their people better.
            </Paragraph>
            <Button
              size="large"
              style={{
                height: '56px', padding: '0 48px', fontSize: '18px', borderRadius: '28px', color: '#1677ff', fontWeight: 600
              }}
              onClick={() => navigate('/pricing')}
            >
              See Pricing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
