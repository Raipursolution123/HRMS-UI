import React, { useState, useEffect, useMemo } from 'react';
import { Button, Space, Card, Row, Col, Select, message, Checkbox, Tree } from 'antd';
import { useToast } from '../../hooks/useToast';
import { usePages } from '../../hooks/pages/usePages';
import { useAddRoles } from '../../hooks/useAddRole';
import { getIconComponent } from '../../constants/menuItem';

const { Option } = Select;

const AddPermission = () => {
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const { Toast, contextHolder } = useToast();
  const { loading: pagesLoading, allPages, allowedPages, updateRolePermission, fetchPagesByRole } = usePages();
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

  // Get ALL pages with IDs (including both parent pages and leaf pages)
  const getAllPageKeys = useMemo(() => {
    const pageKeys = new Set();

    const extractPageKeys = (items) => {
      items.forEach(item => {
        // Add this page if it has an ID (could be parent or leaf)
        if (item.id) {
          pageKeys.add(item.key);
        }
        // Recursively process children if they exist
        if (item.children && item.children.length > 0) {
          extractPageKeys(item.children);
        }
      });
    };

    extractPageKeys(transformedMenuItems);
    return Array.from(pageKeys);
  }, [transformedMenuItems]);

  // Get ALL page keys for a specific module (including parent pages and leaf pages)
  const getModulePageKeys = (module) => {
    const pageKeys = [];

    const extractPageKeys = (items) => {
      items.forEach(item => {
        // Add this page if it has an ID
        if (item.id) {
          pageKeys.push(item.key);
        }
        // Recursively process children
        if (item.children && item.children.length > 0) {
          extractPageKeys(item.children);
        }
      });
    };

    extractPageKeys([module]);
    return pageKeys;
  };

  // Function to find key by page ID
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

  // Function to find page ID by key
  const findPageIdByKey = (key, items = transformedMenuItems) => {
    for (let item of items) {
      if (item.key === key && item.id) {
        return item.id;
      }
      if (item.children && item.children.length > 0) {
        const foundId = findPageIdByKey(key, item.children);
        if (foundId) return foundId;
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
    if (roleId) {
      try {
        await fetchPagesByRole(roleId);
      } catch (error) {
        message.error('Failed to fetch role permissions');
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

  // Check if all pages in a module are selected
  const isModuleFullySelected = (module) => {
    const modulePageKeys = getModulePageKeys(module);
    return modulePageKeys.length > 0 && modulePageKeys.every(key => checkedKeys.includes(key));
  };

  // Check if some pages in a module are selected
  const isModulePartiallySelected = (module) => {
    const modulePageKeys = getModulePageKeys(module);
    return modulePageKeys.some(key => checkedKeys.includes(key)) && !isModuleFullySelected(module);
  };

  // Handle checkbox change for individual items
  const handleCheckboxChange = (key, checked) => {
    let newCheckedKeys = [...checkedKeys];

    if (checked) {
      if (!newCheckedKeys.includes(key)) {
        newCheckedKeys.push(key);
      }
    } else {
      newCheckedKeys = newCheckedKeys.filter(k => k !== key);
    }

    setCheckedKeys(newCheckedKeys);
  };

  // Handle module header checkbox change
  const handleModuleHeaderChange = (module) => {
    const modulePageKeys = getModulePageKeys(module);

    if (isModuleFullySelected(module)) {
      // Remove all module page keys
      const newCheckedKeys = checkedKeys.filter(key => !modulePageKeys.includes(key));
      setCheckedKeys(newCheckedKeys);
    } else {
      // Add all module page keys that aren't already included
      const newCheckedKeys = [...new Set([...checkedKeys, ...modulePageKeys])];
      setCheckedKeys(newCheckedKeys);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    const allPageKeys = getAllPageKeys;

    console.log('Selecting all keys:', {
      pageKeys: allPageKeys,
      totalCount: allPageKeys.length
    });

    setCheckedKeys(allPageKeys);
  };

  // Handle deselect all
  const handleDeselectAll = () => {
    setCheckedKeys([]);
  };

  // Save permissions
  const handleSavePermissions = async () => {
    if (!selectedRoleId) {
      message.warning('Please select a role first');
      return;
    }

    try {
      // Enhanced logging for debugging
      //console.log('=== SAVE PERMISSIONS DEBUG ===');
      //console.log('Total checked keys:', checkedKeys.length);
      //console.log('Checked keys:', checkedKeys);

      // Convert checked keys back to page IDs with detailed logging
      const keyToIdMap = [];
      checkedKeys.forEach(key => {
        const pageId = findPageIdByKey(key);
        keyToIdMap.push({ key, pageId });
      });

      console.log('Key to ID mapping:', keyToIdMap);

      // Extract page IDs and remove nulls/undefined
      const pageIdsWithDuplicates = keyToIdMap
        .map(item => item.pageId)
        .filter(id => id !== null && id !== undefined)
        .map(id => Number(id));

     // console.log('Page IDs before deduplication:', pageIdsWithDuplicates);
     // console.log('Count before deduplication:', pageIdsWithDuplicates.length);

      // ✅ CRITICAL FIX: Deduplicate using Set
      const selectedPageIds = [...new Set(pageIdsWithDuplicates)].sort((a, b) => a - b);

     // console.log('Page IDs after deduplication:', selectedPageIds);
     // console.log('Count after deduplication:', selectedPageIds.length);

      // Find duplicates for debugging
      const duplicates = pageIdsWithDuplicates.filter((item, index) =>
        pageIdsWithDuplicates.indexOf(item) !== index
      );
      if (duplicates.length > 0) {
       // console.warn('Duplicate page IDs found:', [...new Set(duplicates)]);
      }

      // Find which keys mapped to null/undefined
      const nullMappings = keyToIdMap.filter(item => item.pageId === null || item.pageId === undefined);
      if (nullMappings.length > 0) {
       // console.warn('Keys that did not map to page IDs:', nullMappings);
      }

      //console.log('Saving permissions for role:', selectedRoleId);
      //console.log('=== END DEBUG ===');

      if (selectedPageIds.length === 0) {
        message.warning('Please select at least one permission');
        return;
      }

      // Final payload validation
      //console.log('Final Payload to Send:', { page_ids: selectedPageIds });

      // Call API to update permissions
      await updateRolePermission(selectedRoleId, { page_ids: selectedPageIds }, Toast);

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

  return (
    <div className="table-page-container">
      {contextHolder}
      <Card
        className="table-page-card"
        title="Role Permission Management"
        extra={
          <Space>
            <Button disabled={!selectedRoleId} onClick={handleSelectAll}>Select All</Button>
            <Button disabled={!selectedRoleId} onClick={handleDeselectAll}>Deselect All</Button>
            <Button
              disabled={!selectedRoleId}
              loading={pagesLoading}
              type="primary"
              onClick={handleSavePermissions}
            >
              Save Permissions
            </Button>
          </Space>
        }
      >
        <Row className="table-page-filters" align="middle" justify="space-between">
          <Col>
            <Select
              placeholder="Select Role"
              className="table-page-select"
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