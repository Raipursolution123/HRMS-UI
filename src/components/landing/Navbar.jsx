import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/landing/logo2.jpeg';
import { Color } from 'antd/es/color-picker';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/pricing') return 'pricing';
    if (path === '/support') return 'support';
    //if (path === '/job-requirements') return 'requirements';
    if (path === '/about') return 'about';
    return '';
  };

  const selectedKey = getSelectedKey();

  const menuItems = [
    { key: 'home', label: 'Home' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'support', label: 'Support' },
    { key: 'about', label: 'About Us' },
    //{ key: 'requirements', label: 'Job Requirements' },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === 'home') navigate('/');
    if (key === 'pricing') navigate('/pricing');
    if (key === 'support') navigate('/support');
    //if (key === 'requirements') navigate('/job-requirements');
    // if (key === 'about') navigate('/about');
    setMobileMenuOpen(false);
  };

  return (
    <Header
      className="glass-panel-light"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '72px',
      }}
    >
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="HRMS Logo" style={{ height: '40px' }} />
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderBottom: 'none',
            minWidth: '500px',
            flex: 1,
            background: 'transparent',
            fontSize: '16px',
          }}
          overflowedIndicator={null}
        />
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button type="text" style={{ color: '#1677ff' }} onClick={() => navigate('/login')}>Sign In</Button>
          {/* <Button type="primary">Demo Account</Button> */}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <Button
        className="mobile-menu-btn"
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuOpen(true)}
        style={{ display: 'none' }}
      />

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ borderRight: 'none' }}
        />
        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Button block onClick={() => {
            navigate('/login');
            setMobileMenuOpen(false);
          }}>Sign In</Button>
          {/* <Button type="primary" block>Book a Demo</Button> */}
        </div>
      </Drawer>
    </Header>
  );
};

export default Navbar;
