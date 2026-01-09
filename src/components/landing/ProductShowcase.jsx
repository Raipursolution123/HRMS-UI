import React, { useState } from 'react';
import { Typography, Tabs, Row, Col, Button } from 'antd';
import { CheckCircleFilled, ArrowRightOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './ProductShowcase.css';

import employeeListImg from '../../assets/landing/employee-list.png';
import attendanceImg from '../../assets/landing/attendance.png';
import payrollImg from '../../assets/landing/payroll.png';

const { Title, Paragraph } = Typography;

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const items = [
    {
      key: '1',
      label: 'Employee Management',
      title: 'Complete Employee Database',
      description:
        'Keep all your employee data in one secure place. From personal details to documents, manage everything with ease.',
      features: [
        'Digital Employee Profiles',
        'Document Storage',
        'Role Management',
        'Department Organization'
      ],
      image: employeeListImg,
      color: '#1677ff'
    },
    {
      key: '2',
      label: 'Smart Payroll',
      title: 'Run Payroll in Minutes',
      description:
        'Automate your entire payroll process. Calculate taxes, deductions, and bonuses automatically without errors.',
      features: [
        'Automated Tax Calculations',
        'Direct Deposit',
        'Payslip Generation',
        'Bonus Management'
      ],
      image: payrollImg,
      color: '#722ed1'
    },
    {
      key: '3',
      label: 'Attendance',
      title: 'Track Time Effortlessly',
      description:
        'Monitor attendance, leaves, and overtime in real-time. Integrate seamlessly with biometric devices.',
      features: [
        'Real-time Tracking',
        'Leave Management',
        'Overtime Calculation',
        'Shift Scheduling'
      ],
      image: attendanceImg,
      color: '#52c41a'
    }
  ];

  const currentItem = items.find(item => item.key === activeTab);

  const handleMouseMove = e => {
    if (isTouchDevice) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  return (
    <div id="product-showcase" style={{ padding: 'clamp(48px, 8vw, 100px) 24px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Title level={2}>
            Powerful features for <span className="gradient-text">Growing Teams</span>
          </Title>
          <Paragraph style={{ maxWidth: 600, margin: '0 auto', color: '#64748b' }}>
            Switch between tabs to see how our platform handles your most critical HR tasks.
          </Paragraph>
        </div>

        <Tabs
          centered
          size="large"
          type="card"
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items.map(i => ({ key: i.key, label: i.label }))}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ marginTop: 48 }}
          >
            <motion.div
              className="card-3d-wrapper"
              style={{ perspective: 1200 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setRotate({ x: 0, y: 0 })}
              animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
                y: [0, -6, 0]
              }}
              transition={{
                rotateX: { type: 'spring', stiffness: 150, damping: 18 },
                rotateY: { type: 'spring', stiffness: 150, damping: 18 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} md={9}>
                  <Title level={3}>{currentItem.title}</Title>
                  <Paragraph style={{ color: '#64748b', lineHeight: 1.8 }}>
                    {currentItem.description}
                  </Paragraph>

                  {currentItem.features.map(f => (
                    <div key={f} className="feature-row">
                      <CheckCircleFilled style={{ color: currentItem.color }} />
                      {f}
                    </div>
                  ))}

                  <Button
                    type="primary"
                    size="large"
                    icon={<ArrowRightOutlined />}
                    style={{ background: currentItem.color, marginTop: 24 }}
                    block
                    onClick={() => navigate('/pricing')}
                  >
                    Explore {currentItem.label}
                  </Button>
                </Col>

                <Col xs={24} md={15}>
                  <motion.img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="showcase-image"
                    animate={{
                      x: rotate.y * 1.5,
                      y: rotate.x * -1.5
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  />
                </Col>
              </Row>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductShowcase;
