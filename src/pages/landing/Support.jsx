import React from 'react';
import { Typography, Button, Card } from 'antd';
import { MailOutlined, FormOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Support = () => {
  return (
    <div style={{ minHeight: '100vh' }}> {/* Removed custom background */}
      {/* Header */}
      <div style={{ padding: 'clamp(60px, 10vw, 100px) 24px clamp(40px, 6vw, 60px)', textAlign: 'center' }}>
        <Title level={1} style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '16px' }}>
          We're Here to <span className="gradient-text">Help</span>
        </Title>
        <Paragraph style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
          Have a question or need assistance? Reach out to us via email or submit your query through our form.
        </Paragraph>
      </div>

      {/* Contact Section */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Email Card */}
        <Card
          className="glass-panel-light"
          style={{
            borderRadius: '24px',
            border: 'none',
            marginBottom: '48px',
            textAlign: 'center',
          }}
          bodyStyle={{ padding: 'clamp(40px, 6vw, 60px)' }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <MailOutlined style={{ fontSize: '40px', color: 'white' }} />
          </div>
          <Title level={2} style={{ marginBottom: '16px', fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
            Email Us
          </Title>
          <Paragraph style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: '#64748b', marginBottom: '24px' }}>
            Send us an email and we'll get back to you within 24 hours.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<MailOutlined />}
            href="mailto:raipursolution069@gmail.com"
            style={{
              height: '56px',
              padding: '0 40px',
              fontSize: 'clamp(16px, 2vw, 18px)',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #1677ff 0%, #722ed1 100%)',
              border: 'none',
            }}
          >
            raipursolution069@gmail.com
          </Button>
        </Card>

        
      </div>
    </div>
  );
};

export default Support;
