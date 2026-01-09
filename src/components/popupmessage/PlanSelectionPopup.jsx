import React, { useState } from 'react';
import { Modal, Row, Col, Button, Tag, Typography, Spin, Alert } from 'antd';
import { CheckCircleFilled, ArrowRightOutlined, CrownOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { usePlans } from '../../hooks/usePlans';

const { Title, Text } = Typography;

const PlanSelectionPopup = ({ open, onClose, onSelectPlan }) => {
  const { plans, loading, error } = usePlans();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const isTouch =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const getPlanColor = (name) => ({
    Free: '#52c41a',
    Basic: '#1677ff',
    Premium: '#722ed1',
    Enterprise: '#fa8c16',
  }[name] || '#1677ff');

  const handleMove = (e) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRotate({
      x: ((y / rect.height) - 0.5) * -10,
      y: ((x / rect.width) - 0.5) * 10,
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1300}
      centered
      destroyOnClose
      maskStyle={{
        backdropFilter: 'blur(16px)',
        background:
          'radial-gradient(circle at top, rgba(114,46,209,0.25), rgba(22,119,255,0.25), rgba(0,0,0,0.6))',
      }}
      bodyStyle={{ padding: 0 }}
    >

      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'relative',
          padding: '56px',
          borderRadius: '28px',
          background: 'linear-gradient(120deg, #f6f9ff, #eef1ff, #fdfbff)',
          backgroundSize: '300% 300%',
          overflow: 'hidden',
        }}
      >

        <motion.div
          animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-120px',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(22,119,255,0.35), transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '-140px',
            right: '-140px',
            width: 360,
            height: 360,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(114,46,209,0.35), transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '30%',
            right: '20%',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(250,140,22,0.25), transparent 70%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
          }}
        />


        <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
          Choose Your{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #1677ff, #722ed1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Perfect Plan
          </span>
        </Title>

        {loading ? (
          <Spin size="large" style={{ display: 'block', margin: '80px auto' }} />
        ) : error ? (
          <Alert type="error" message={error} />
        ) : (
          <Row gutter={[32, 32]} justify="center">
            {plans.map((plan) => (
              <Col xs={24} sm={12} lg={6} key={plan.id}>
                <motion.div
                  onMouseMove={handleMove}
                  onMouseLeave={() => setRotate({ x: 0, y: 0 })}
                  animate={{
                    rotateX: rotate.x,
                    rotateY: rotate.y,
                    y: [0, -6, 0],
                  }}
                  transition={{
                    rotateX: { type: 'spring', stiffness: 150, damping: 18 },
                    rotateY: { type: 'spring', stiffness: 150, damping: 18 },
                    y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 40px 100px rgba(0,0,0,0.18)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    height: '100%',
                    padding: 28,
                    borderRadius: 22,
                    background:
                      'linear-gradient(145deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))',
                    backdropFilter: 'blur(18px)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
                    transformStyle: 'preserve-3d',
                    position: 'relative',
                  }}
                >
                  {plan.plan_name === 'Premium' && (
                    <Tag
                      icon={<CrownOutlined />}
                      color={getPlanColor(plan.plan_name)}
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: 18,
                        fontWeight: 600,
                      }}
                    >
                      MOST POPULAR
                    </Tag>
                  )}

                  <div style={{ textAlign: 'center', marginBottom: 18 }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        margin: '0 auto 14px',
                        borderRadius: 14,
                        background: `linear-gradient(135deg, ${getPlanColor(
                          plan.plan_name
                        )}30, ${getPlanColor(plan.plan_name)}60)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 26,
                      }}
                    >
                      {plan.plan_name === 'Free' && '🎁'}
                      {plan.plan_name === 'Basic' && '🚀'}
                      {plan.plan_name === 'Premium' && '⭐'}
                      {plan.plan_name === 'Enterprise' && '👑'}
                    </div>

                    <Title level={4}>{plan.plan_name}</Title>
                    <Text type="secondary">{plan.description}</Text>
                  </div>

                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontWeight: 700,
                        color: getPlanColor(plan.plan_name),
                      }}
                    >
                      ₹{Number(plan.price).toLocaleString()}
                    </Text>
                    <Text type="secondary">
                      {' '}
                      /{plan.billing_cycle === 'YEARLY' ? 'yr' : 'mo'}
                    </Text>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    {[...Array(2)].map((_, i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', gap: 8, marginBottom: 8 }}
                      >
                        <CheckCircleFilled
                          style={{ color: getPlanColor(plan.plan_name) }}
                        />
                        <Text>Premium Feature Included</Text>
                      </div>
                    ))}
                  </div>

                  <Button
                    block
                    type={plan.popular ? 'primary' : 'default'}
                    icon={<ArrowRightOutlined />}
                    style={{
                      height: 44,
                      fontWeight: 600,
                      borderRadius: 10,
                      background: plan.popular
                        ? getPlanColor(plan.plan_name)
                        : undefined,
                      borderColor: plan.popular
                        ? getPlanColor(plan.plan_name)
                        : undefined,
                    }}
                    onClick={() => onSelectPlan(plan)}
                  >
                    {Number(plan.price) === 0 ? 'Start Free' : 'Select Plan'}
                  </Button>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </motion.div>
    </Modal>
  );
};

export default PlanSelectionPopup;