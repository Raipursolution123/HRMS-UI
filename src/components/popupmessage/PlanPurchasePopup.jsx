import React, { useState, useEffect } from 'react';
import { Modal, Button, Typography, Space, Divider, Tag, message } from 'antd';
import { CheckCircleFilled, CrownOutlined } from '@ant-design/icons';
import { usePlans } from '../../hooks/usePlans';
import { useSelector } from 'react-redux';
import API from '../../services/api';

const { Title, Text, Paragraph } = Typography;

const PlanPurchasePopup = ({ planId, onClose, onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const { plans, loading } = usePlans();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processing, setProcessing] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (planId && plans.length > 0) {
      const plan = plans.find(p => p.id.toString() === planId.toString());
      if (plan) {
        if (plan.plan_name === 'Free') {
          // Handle free plan subscription
          handleFreePlanSubscription(plan);
          return;
        }
        setSelectedPlan(plan);
        setVisible(true);
      }
    }
  }, [planId, plans]);

  const handleFreePlanSubscription = async (plan) => {
    try {
      setProcessing(true);
      const response = await API.post('/api/subscribe/', {
        plan_id: plan.id
      });
      message.success('Free plan activated successfully!');
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      message.error(error.response?.data?.error || 'Failed to activate free plan');
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
    localStorage.removeItem('selected_plan_id');
    onClose();
  };

  const handlePay = async () => {
    if (!selectedPlan) return;

    try {
      setProcessing(true);

      // Step 1: Create Razorpay order
      const orderResponse = await API.post('/api/subscribe/create-order/', {
        plan_id: selectedPlan.id
      });

      const { order_id, amount, currency, key } = orderResponse.data;

      // Get user profile data for prefill
      const profile = user?.profile?.profile || {};
      const userName = profile.first_name && profile.last_name 
        ? `${profile.first_name} ${profile.last_name}` 
        : user?.email || 'Customer';
      const userEmail = user?.email || '';
      const userPhone = profile.phone || '';

      // Step 2: Initialize Razorpay Checkout
      const options = {
        key: key, // Razorpay Key ID from backend
        amount: amount, // Amount in paise
        currency: currency,
        name: 'HRMS Platform',
        description: `Subscription for ${selectedPlan.plan_name} Plan`,
        order_id: order_id,
        handler: async function (response) {
          // Step 3: Verify payment on backend
          try {
            const verifyResponse = await API.post('/api/subscribe/verify-payment/', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan_id: selectedPlan.id
            });

            message.success('Payment successful! Plan activated.');
            setVisible(false);
            onSuccess && onSuccess();
            onClose();
          } catch (error) {
            message.error(error.response?.data?.error || 'Payment verification failed');
            console.error('Payment verification error:', error);
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone
        },
        theme: {
          color: '#6f53e1'
        },
        modal: {
          ondismiss: function() {
            setProcessing(false);
            message.info('Payment cancelled');
          }
        }
      };

      // Check if Razorpay is loaded
      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        message.error('Payment gateway not loaded. Please refresh the page.');
        setProcessing(false);
      }
      
    } catch (error) {
      setProcessing(false);
      const errorMsg = error.response?.data?.error || 'Failed to initialize payment';
      message.error(errorMsg);
      console.error('Payment initialization error:', error);
    }
  };

  if (!selectedPlan) return null;

  return (
    <Modal
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={400}
      centered
      destroyOnClose
      maskStyle={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
      bodyStyle={{ padding: '32px' }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #6f53e120 0%, #6f53e140 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '40px',
          }}
        >
          {selectedPlan.plan_name === 'Free' && '🎁'}
          {selectedPlan.plan_name === 'Basic' && '🚀'}
          {selectedPlan.plan_name === 'Premium' && '⭐'}
          {selectedPlan.plan_name === 'Enterprise' && '👑'}
        </div>

        <Tag color="#722ed1" icon={<CrownOutlined />} style={{ marginBottom: '16px' }}>
          Selected Plan
        </Tag>

        <Title level={2} style={{ margin: 0 }}>
          {selectedPlan.plan_name}
        </Title>
        <Paragraph type="secondary" style={{ fontSize: '16px', marginBottom: '24px' }}>
          {selectedPlan.description}
        </Paragraph>

        <div style={{ backgroundColor: '#f8f9ff', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: '#1677ff' }}>
              ₹{parseFloat(selectedPlan.price).toLocaleString()}
            </span>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              /{selectedPlan.billing_cycle === 'YEARLY' ? 'year' : 'month'}
            </Text>
          </div>
          <Divider style={{ margin: '16px 0' }} />
          <div style={{ textAlign: 'left' }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircleFilled style={{ color: '#52c41a', marginTop: '4px' }} />
                <Text>{selectedPlan.is_unlimited_employees ? 'Unlimited employees' : `Up to ${selectedPlan.max_employees} employees`}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <CheckCircleFilled style={{ color: '#52c41a', marginTop: '4px' }} />
                <Text>{selectedPlan.features_count} Premium Features</Text>
              </div>
            </Space>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={handlePay}
          style={{
            height: '54px',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 600,
            background: '#6f53e1',
            borderColor: '#6f53e1',
            boxShadow: '0 4px 14px 0 rgba(111, 83, 225, 0.39)',
          }}
          loading={processing || loading}
        >
          {processing ? 'Processing...' : 'Pay & Activate Now'}
        </Button>
        <Button
          type="link"
          onClick={handleClose}
          style={{ marginTop: '12px', color: '#64748b' }}
        >
          I'll do it later
        </Button>
      </div>
    </Modal>
  );
};

export default PlanPurchasePopup;
