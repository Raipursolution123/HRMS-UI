import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Card,
  Select,
  InputNumber,
  Form,
} from "antd";
import { useLateConfiguration } from "../../../hooks/payroll/useLateConfiguration";
import { useToast } from "../../../hooks/useToast";

const { Option } = Select;

const LateConfiguration = () => {
  const { Toast,contextHolder } = useToast();

  const {
    rules,
    loading,
    createRule,
    updateRule,
    fetchRules,
  } = useLateConfiguration();

  const [form] = Form.useForm();
  const [currentRuleId, setCurrentRuleId] = useState(null);

  // Load the first rule into the form when rules are fetched
  useEffect(() => {
    if (rules && rules.length > 0) {
      const firstRule = rules[0];
      setCurrentRuleId(firstRule.id);
      form.setFieldsValue({
        late_days_threshold: firstRule.late_days_threshold,
        deduction_days: firstRule.deduction_days,
        status: firstRule.status,
      });
    } else {
      setCurrentRuleId(null);
      form.resetFields();
    }
  }, [rules, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      if (currentRuleId) {
        await updateRule(currentRuleId, values);
        Toast.success("Succesfully Updated")
      } else {
        await createRule(values);
        Toast.success("Succesfully Created")
      }
      await fetchRules();
    } catch (error) {
      console.error("Update failed:", error);
      Toast.error("Failed to Update")
    }
  };

  // We only show one row. 
  const dataSource = [{ key: '1' }];

  const columns = [
    {
      title: "S/L",
      align: "center",
      width: 70,
      render: () => 1,
    },
    {
      title: "For Days",
      align: "center",
      render: () => (
        <Form.Item
          name="late_days_threshold"
          style={{ margin: 0 }}
          rules={[{ required: true, message: "Required" }]}
        >
          <InputNumber min={1} max={31} style={{ width: "100%" }} placeholder="e.g. 3" />
        </Form.Item>
      ),
    },
    {
      title: "Day of Salary Deduction",
      align: "center",
      render: () => (
        <Form.Item
          name="deduction_days"
          style={{ margin: 0 }}
          rules={[{ required: true, message: "Required" }]}
        >
          <InputNumber min={0} max={31} step={0.5} style={{ width: "100%" }} placeholder="e.g. 1" />
        </Form.Item>
      ),
    },
    {
      title: "Status",
      align: "center",
      render: () => (
        <Form.Item name="status" style={{ margin: 0 }} initialValue="Active">
          <Select style={{ width: "100%" }}>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "Update",
      align: "center",
      width: 120,
      render: () => (
        <Button
          type="primary"
          style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
          onClick={handleUpdate}
          loading={loading}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <div className="table-page-container">
      {contextHolder}

      <Card
        className="table-page-card"
        title="Rules of Salary Deduction"
      >
        <Form form={form} component={false}>
          <div className="table-page-table">
            <Table
              columns={columns}
              loading={loading}
              dataSource={dataSource}
              rowKey="key"
              bordered
              pagination={false}
            />
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LateConfiguration;