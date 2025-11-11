import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const { Option } = Select;

const TrainingTypeModal = ({
  isModalOpen,
  setIsModalOpen,
  onSubmit,
  editingTrainingType,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTrainingType) {
      form.setFieldsValue({
        training_type_name: editingTrainingType.training_type_name,
        status: editingTrainingType.status,
      });
    } else {
      form.resetFields();
    }
  }, [editingTrainingType, form]);

  const handleFinish = (values) => {
    onSubmit(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={editingTrainingType ? "Edit Training Type" : "Add Training Type"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Training Type Name"
          name="training_type_name"
          rules={[{ required: true, message: "Please enter training type name!" }]}
        >
          <Input placeholder="Enter training type name" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Inactive">INACTIVE</Option>
          </Select>
        </Form.Item>

        <div style={{ textAlign: "right" }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TrainingTypeModal;