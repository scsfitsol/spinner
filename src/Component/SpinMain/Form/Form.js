import React from "react";
import { Input, Form, Button, Row, Col, Checkbox } from "antd";
import logo from "./LogoForm.png"; // Import your logo image

const App = () => {
  const handleFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#2E33C3",
          textAlign: "start",
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            padding: "0",
            marginLeft: "80px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
      </div>

      {/* Main Section */}
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          marginTop: "20px",
        }}
      >
        <Form
          name="basic_form"
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please input your first name!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[
              { required: true, message: "Please input your company name!" },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Business Email"
                name="businessEmail"
                rules={[
                  {
                    required: true,
                    message: "Please input your business email!",
                  },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="Business Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number!",
                  },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input.TextArea placeholder="Description" rows={4} />
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Please accept the terms and conditions"),
              },
            ]}
          >
            <Checkbox style={{ lineHeight: "normal" }}>
              <p>
                I agree to receive other communications from Fitsol Supply Chain
                Solutions.
              </p>
            </Checkbox>
            In order to provide you the content requested, we need to store and
            process your personal data. If you consent to us storing your
            personal data for this purpose, please tick the checkbox below.
          </Form.Item>

          <Form.Item
            name="privacyPolicy"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Please accept the privacy policy"),
              },
            ]}
          >
            <Checkbox>
              I agree to allow Fitsol Supply Chain Solutions to store and
              process my personal data.
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", backgroundColor: "#2E33C3" }}
            >
              Save and proceed to spin
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
