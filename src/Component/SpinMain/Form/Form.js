import React, { useRef, useState } from "react";
import {
  Input,
  Form,
  Button,
  Row,
  Col,
  Checkbox,
  AutoComplete,
  Select,
} from "antd";
import logo from "../LogoForm.png"; // Import your logo image
import axios from "axios";
import fitsol_logo from '../fitsol_logo.svg';
// import fitsollogo from '../../../../public/'

import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../constant";

const { Option } = Select;

const FormSection = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);

  const fetchCompanies = async (query) => {
    if (query) {
      try {
        const response = await axios.get(
          `https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`
        );
        const companies = response.data.map((company) => ({
          value: company.name,
          label: (
            <div style={{ display: "flex" }}>
              <img
                src={company.logo}
                alt={company.name}
                style={{ width: 15, height: 15, marginRight: 10, marginTop: 5 }}
              />
              {company.name}
            </div>
          ),
        }));
        setOptions(companies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    } else {
      setOptions([]);
    }
  };

  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const formData = { ...values, privacyPolicy: true };

      await formRef.current.validateFields();
      const res = await axios.post(`${baseUrl}/spinnerFormData`, formData);
      console.log(res);
      formRef.current.resetFields();
      localStorage.setItem("email", values.businessEmail);
      localStorage.setItem("id", res?.data?.spinnerFormData?.id);
      navigate("/spin");
    } catch (err) {
      const msg = err?.response?.data?.message;
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  // List of possible designations
  const designations = [
    "CEO",
    "CTO",
    "CBO",
    "CFO",
    "COO",
    "Software Engineer",
    "Project Manager",
    "Product Manager",
    "Sales Manager",
    "Marketing Specialist",
    "HR Manager",
    "Finance Manager",
    "Operations Manager",
    "Consultant",
    "Analyst",
    "Others",
  ];

  return (
    <div style={{ padding: "10px" }}>
      {/* Header Section */}
      <div
        style={{
          background: "linear-gradient(98deg, #02583D 0.42%, #059669 112.05%)",
          // backgroundColor: "#2E33C3",
          textAlign: "start",
          padding: "5px",
          borderRadius: "8px",
        }}
      >
        <img
        src={fitsol_logo}
          // src={logo}
          alt="Logo"
          style={{
            padding: "0",
            marginLeft: "80px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
      </div>

      <div className="p-4 mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Welcome to the TechSparks 2024!
        </h1>
        <p className="text-lg pt-2 text-gray-700">
          Please provide your details:
        </p>
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
          ref={formRef}
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
            <AutoComplete
              options={options}
              onSearch={fetchCompanies}
              placeholder="Company Name"
              filterOption={(inputValue, option) =>
                option.value.toLowerCase().includes(inputValue.toLowerCase())
              }
            >
              <Input />
            </AutoComplete>
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
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: "Please select your designation!" },
            ]}
          >
            <Select placeholder="Select Designation">
              {designations.map((designation) => (
                <Option key={designation} value={designation}>
                  {designation}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            style={{ display: "flex", alignItems: "flex-start" }}
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Please accept the terms and conditions"),
              },
            ]}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <Checkbox style={{ marginTop: 4, marginRight: 6 }} />
              <div style={{ marginTop: "4px" }}>
                <span>
                  I agree to receive communications from Fitsol Supply Chain
                  Solutions Private Limited and consent to the storage and
                  processing of my data.
                </span>
              </div>
            </div>
          </Form.Item>

          {/* <Form.Item
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
          </Form.Item> */}

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%", 
                background: "linear-gradient(98deg, #02583D 0.42%, #059669 112.05%)",
                // backgroundColor: "#2E33C3" 
              
              }}
              loading={loading}
            >
              Save and proceed
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormSection;
