import React, { useState, useEffect, useMemo } from 'react';
import { Table, Button, Space, Card, Row, Col, Select, message, Input, Checkbox, Tree } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ClockCircleOutlined, SettingOutlined, DashboardOutlined, BarChartOutlined, CalendarOutlined, ScheduleOutlined, FileTextOutlined, DollarOutlined, MinusOutlined, UserOutlined, CheckOutlined, GiftOutlined, ApartmentOutlined, SafetyCertificateOutlined, UserAddOutlined, ReadOutlined, TrophyOutlined, NotificationOutlined, ProfileOutlined, CalculatorOutlined, CheckCircleOutlined, RiseOutlined, WarningOutlined, TeamOutlined, BankOutlined, UnlockOutlined, KeyOutlined } from '@ant-design/icons';
import { useToast } from '../../hooks/useToast';
import { usePages } from '../../hooks/pages/usePages';
import { useAddRoles } from '../../hooks/useAddRole';
import { getIconComponent } from '../../constants/menuItem';

const { Option } = Select;

// Icon mapping function


const AddPermission = () => {
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const { Toast, contextHolder } = useToast();
  const { loading: pagesLoading, allPages, allowedPages, error, updateRolePermission,fetchPagesByRole } = usePages();
  const { roles } = useAddRoles();

  // Transform API data to match our component structure
  const transformedMenuItems = useMemo(() => {
    if (!allPages || !Array.isArray(allPages)) return [];
    
    const transformItems = (items) => {
      return items.map(item => ({
        key: item.key,
        label: item.label,
        icon: getIconComponent(item.icon),
        id: item.id,
        codename: item.codename,
        children: item.children ? transformItems(item.children) : [],
      }));
    };
    
    return transformItems(allPages);
  }, [allPages]);

  // Get all leaf node keys (actual permissions)
  const getAllLeafKeys = useMemo(() => {
    const leafKeys = new Set();
    
    const extractLeafKeys = (items) => {
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          extractLeafKeys(item.children);
        } else {
          leafKeys.add(item.key);
        }
      });
    };
    
    extractLeafKeys(transformedMenuItems);
    return Array.from(leafKeys);
  }, [transformedMenuItems]);

  // Get all keys including parent keys
  const getAllKeys = (items = transformedMenuItems) => {
    let keys = [];
    
    const extractKeys = (menuItems) => {
      menuItems.forEach(item => {
        keys.push(item.key);
        if (item.children && item.children.length > 0) {
          extractKeys(item.children);
        }
      });
    };
    
    extractKeys(items);
    return keys;
  };

  // Get all leaf keys for a specific module
  const getModuleLeafKeys = (module) => {
    const leafKeys = [];
    
    const extractLeafKeys = (items) => {
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          extractLeafKeys(item.children);
        } else {
          leafKeys.push(item.key);
        }
      });
    };
    
    extractLeafKeys([module]);
    return leafKeys;
  };

  // Function to find key by page ID in menu items
  const findKeyByPageId = (pageId, items = transformedMenuItems) => {
    for (let item of items) {
      if (item.id === pageId) {
        return item.key;
      }
      if (item.children && item.children.length > 0) {
        const foundKey = findKeyByPageId(pageId, item.children);
        if (foundKey) return foundKey;
      }
    }
    return null;
  };

  // Convert assigned page IDs to checked keys
  const convertPageIdsToCheckedKeys = (pageIds) => {
    const keys = [];
    pageIds.forEach(pageId => {
      const key = findKeyByPageId(pageId);
      if (key) {
        keys.push(key);
      }
    });
    return keys;
  };

  // Handle role selection
  const handleRoleChange = async (roleId) => {
    setSelectedRoleId(roleId);
    fetchPagesByRole(roleId)
    if (roleId) {
      try {
        // Check if we have allowedPages data for this role
        if (allowedPages && allowedPages.role_id === roleId) {
          const assignedPageIds = allowedPages.assigned_page_ids || [];
          const checkedKeysFromBackend = convertPageIdsToCheckedKeys(assignedPageIds);
          setCheckedKeys(checkedKeysFromBackend);
        } else {
          // If no data found for this role, clear checked keys
          setCheckedKeys([]);
          message.info('No permissions found for this role');
        }
      } catch (error) {
        message.error('Failed to fetch permissions');
        console.error('Error fetching permissions:', error);
      }
    } else {
      setCheckedKeys([]);
    }
  };

  // Effect to update checked keys when allowedPages changes
  useEffect(() => {
    if (selectedRoleId && allowedPages && allowedPages.role_id === selectedRoleId) {
      const assignedPageIds = allowedPages.assigned_page_ids || [];
      const checkedKeysFromBackend = convertPageIdsToCheckedKeys(assignedPageIds);
      setCheckedKeys(checkedKeysFromBackend);
    }
  }, [allowedPages, selectedRoleId]);

  // Check if all leaf nodes in a module are selected
  const isModuleFullySelected = (module) => {
    const moduleLeafKeys = getModuleLeafKeys(module);
    return moduleLeafKeys.length > 0 && moduleLeafKeys.every(key => checkedKeys.includes(key));
  };

  // Check if some leaf nodes in a module are selected
  const isModulePartiallySelected = (module) => {
    const moduleLeafKeys = getModuleLeafKeys(module);
    return moduleLeafKeys.some(key => checkedKeys.includes(key)) && !isModuleFullySelected(module);
  };

  // Handle checkbox change for individual items
  const handleCheckboxChange = (key, checked) => {
    let newCheckedKeys = [...checkedKeys];
    
    if (checked) {
      // Add the key if not already present
      if (!newCheckedKeys.includes(key)) {
        newCheckedKeys.push(key);
      }
    } else {
      // Remove the key
      newCheckedKeys = newCheckedKeys.filter(k => k !== key);
    }
    
    setCheckedKeys(newCheckedKeys);
  };

  // Handle module header checkbox change
  const handleModuleHeaderChange = (module) => {
    const moduleLeafKeys = getModuleLeafKeys(module);
    
    if (isModuleFullySelected(module)) {
      // Remove all module leaf keys
      const newCheckedKeys = checkedKeys.filter(key => !moduleLeafKeys.includes(key));
      setCheckedKeys(newCheckedKeys);
    } else {
      // Add all module leaf keys that aren't already included
      const newCheckedKeys = [...new Set([...checkedKeys, ...moduleLeafKeys])];
      setCheckedKeys(newCheckedKeys);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    setCheckedKeys(getAllLeafKeys);
  };

  // Handle deselect all
  const handleDeselectAll = () => {
    setCheckedKeys([]);
  };

  // Function to find page ID by key
  const findPageIdByKey = (key, items = transformedMenuItems) => {
    for (let item of items) {
      if (item.key === key) {
        return item.id;
      }
      if (item.children && item.children.length > 0) {
        const foundId = findPageIdByKey(key, item.children);
        if (foundId) return foundId;
      }
    }
    return null;
  };

  // Save permissions
  const handleSavePermissions = async () => {
    if (!selectedRoleId) {
      message.warning('Please select a role first');
      return;
    }

    try {
      // Convert checked keys back to page IDs
      const selectedPageIds = checkedKeys.map(key => findPageIdByKey(key)).filter(id => id !== null);
      
      console.log('Saving permissions for role:', selectedRoleId);
      console.log('Selected Page IDs:', selectedPageIds);
      console.log('Selected Keys:', checkedKeys);
      
      // Call API to update permissions
      await updateRolePermission(selectedRoleId, { page_ids: selectedPageIds });
      
      message.success('Permissions updated successfully');
    } catch (error) {
      message.error('Failed to update permissions');
      console.error('Error updating permissions:', error);
    }
  };

  // Convert menu items to tree data format with checkboxes
  const convertMenuToTreeData = (menuItems) => {
    return menuItems.map(item => ({
      key: item.key,
      title: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px' }}>
            {item.icon} {item.label}
          </span>
          {!item.children || item.children.length === 0 ? (
            <Checkbox 
              checked={checkedKeys.includes(item.key)}
              onChange={(e) => handleCheckboxChange(item.key, e.target.checked)}
              size="small"
            />
          ) : (
            <div style={{ opacity: 0.6, fontSize: '10px', color: '#999' }}>
              Folder
            </div>
          )}
        </div>
      ),
      children: item.children ? convertMenuToTreeData(item.children) : [],
    }));
  };

  // Group modules for display (3 cards per row)
  const groupedModules = useMemo(() => {
    const groups = [];
    for (let i = 0; i < transformedMenuItems.length; i += 3) {
      groups.push(transformedMenuItems.slice(i, i + 3));
    }
    return groups;
  }, [transformedMenuItems]);

  // Show loading while fetching pages
  if (pagesLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Card>
          <div style={{ padding: '40px' }}>
            Loading menu items...
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      {contextHolder}
      <Card
        title="Role Permission Management"
        extra={
          <Space>
            <Button onClick={handleSelectAll}>Select All</Button>
            <Button onClick={handleDeselectAll}>Deselect All</Button>
            <Button type="primary" onClick={handleSavePermissions}>
              Save Permissions
            </Button>
          </Space>
        }
      >
        <Row style={{ marginBottom: 16 }} align="middle" justify="space-between">
          <Col>
            <Select 
              placeholder="Select Role" 
              style={{ width: 250 }}
              onChange={handleRoleChange}
              value={selectedRoleId}
              loading={pagesLoading}
            >
              {Array.isArray(roles) && 
                roles.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))
              }
            </Select>
          </Col>
        </Row>

        {selectedRoleId ? (
          <div style={{ marginTop: 16 }}>
            {groupedModules.map((rowModules, rowIndex) => (
              <Row gutter={[16, 16]} key={rowIndex} style={{ marginBottom: 16 }}>
                {rowModules.map((module) => {
                  const isFullySelected = isModuleFullySelected(module);
                  const isPartiallySelected = isModulePartiallySelected(module);
                  
                  return (
                    <Col xs={24} sm={12} md={8} key={module.key}>
                      <Card 
                        size="small"
                        title={
                          <div 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              background: isFullySelected ? '#e6f7ff' : 'transparent',
                              padding: '4px 8px',
                              margin: '-8px -8px 8px -8px',
                              borderRadius: '6px',
                              border: isFullySelected ? '1px solid #1890ff' : 'none'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <Checkbox 
                                checked={isFullySelected}
                                indeterminate={isPartiallySelected}
                                onChange={() => handleModuleHeaderChange(module)}
                                style={{ marginRight: '8px' }}
                              />
                              <span style={{ fontSize: '14px', fontWeight: 'bold', flex: 1 }}>
                                {module.icon} {module.label}
                              </span>
                            </div>
                            <Button 
                              size="small" 
                              type={isFullySelected ? "primary" : "default"}
                              onClick={() => handleModuleHeaderChange(module)}
                              style={{ 
                                fontSize: '10px',
                                fontWeight: 'bold',
                                background: isFullySelected ? '#1890ff' : undefined,
                                borderColor: isFullySelected ? '#1890ff' : undefined
                              }}
                            >
                              {isFullySelected ? 'Selected All' : 'Select All'}
                            </Button>
                          </div>
                        }
                        style={{ 
                          height: '100%',
                          border: '1px solid #d9d9d9',
                          borderTop: isFullySelected ? '2px solid #1890ff' : '1px solid #d9d9d9'
                        }}
                        bodyStyle={{ 
                          padding: '8px', 
                          maxHeight: '300px', 
                          overflow: 'auto' 
                        }}
                      >
                        {module.children && module.children.length > 0 ? (
                          <Tree
                            treeData={convertMenuToTreeData(module.children)}
                            checkedKeys={checkedKeys}
                            checkable={false}
                            defaultExpandAll={false}
                            showLine={true}
                            selectable={false}
                            style={{ background: 'transparent' }}
                          />
                        ) : (
                          <div style={{ 
                            textAlign: 'center', 
                            color: '#999',
                            padding: '20px'
                          }}>
                            No pages available
                          </div>
                        )}
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#999',
            background: '#fafafa',
            borderRadius: 6
          }}>
            Please select a role to manage permissions
          </div>
        )}
      </Card>
    </div>
  );
};

export default AddPermission;