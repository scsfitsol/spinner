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
  DatePicker,
  Space,
} from "antd";
import logo from "../LogoForm.png"; // Import your logo image
import axios from "axios";
import fitsol_logo from "../fitsol_logo.svg";
import parivartan from "../parivartan.png";
import { CloseCircleOutlined } from "@ant-design/icons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import fitsollogo from '../../../../public/'

import { useNavigate } from "react-router-dom";
import { baseUrl, designations, travelModeOptions } from "../../../constant";
import FormTemplate from "./FormTemplate";
import TravelDetailsForm from "./TravelForm";
import HotelForm from "./HotelForm";

const { Option } = Select;

const FormSection = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [travelDetails, setTravelDetails] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [form] = Form.useForm();

  const vehicleOptions = [...new Set(travelModeOptions)].map((vehicle) => ({
    label: vehicle,
    value: vehicle,
  }));

  const handleSearch = (searchText) => {
    const filteredDesignations = designations.filter((designation) =>
      designation.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(
      filteredDesignations.map((designation) => ({
        value: designation,
      }))
    );
  };

  const handleTravelDetailsChange = (changedValues) => {
    console.log("changedvalues", changedValues);
    setTravelDetails((prevDetails) => ({
        ...prevDetails,
        ...changedValues, // Update travel details state
    }));
};

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
      const formData = {
        ...values,
        travelDetails,
        privacyPolicy: true,
      };
      console.log("formdata", formData);
      const res = await axios.post(`${baseUrl}/spinnerFormData`, formData);
      console.log(res);
      formRef.current.resetFields();
      localStorage.setItem("email", values.businessEmail);
      localStorage.setItem("id", res?.data?.spinnerFormData?.id);
      navigate("/emission");
    } catch (err) {
      const msg = err?.response?.data?.message;
      alert(msg);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ padding: "10px", background: "#FAFAFA" }}>
      {/* Header Section */}

      <div
        style={{
          background: "linear-gradient(98deg, #02583D 0.42%, #059669 112.05%)",
          textAlign: "start",
          padding: "15px 20px",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            flexWrap: "wrap", // Makes it responsive
          }}
        >
          {/* Fitsol Logo */}
          <img
            src={fitsol_logo}
            alt="Fitsol Logo"
            style={{
              height: "40px", // Reduced height for better balance
              margin: "10px 20px",
            }}
          />

          {/* Parivartan Logo */}
          <img
            src={parivartan}
            alt="Parivartan Logo"
            style={{
              height: "55px", // Same size as others for consistency
              margin: "10px 20px",
            }}
          />

          {/* Longstraw Carbon Logo */}
          <img
            src={
              "https://cdn.dorik.com/66dde635c037830012824e19/images/longstrawcarbonhighresolutionlogotransparent-jqdxx.png"
            }
            alt="Longstraw Carbon Logo"
            style={{
              height: "40px", // Same size as others for consistency
              margin: "10px 20px",
            }}
          />
        </div>
      </div>

      <div className="p-4 mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Welcome to the Parivarthan 2.0!
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
          background: "#FAFAFA",
          marginTop: "20px",
        }}
      >
        <Form
          // ref={formRef}
          form={form}
          name="basic_form"
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
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
            <Col xs={24} md={12}>
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
            <AutoComplete
              placeholder="Select Designation"
              onSearch={handleSearch} // Function to filter options
              options={designations.map((designation) => ({
                value: designation, // This will be displayed in the dropdown
              }))}
            />
          </Form.Item>
          <TravelDetailsForm 
          onChange={handleTravelDetailsChange}
          />
          <Row>
            <Col span={24}>
              <Form.Item 
              label="Enter your hotel name"
              name="hotelName"
              >
                <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_MAP_KEY}
                  apiOptions={{
                    types: ["(cities)"],
                    componentRestrictions: { country: "IN" },
                  }}
                  selectProps={{
                    placeholder: "Select hotel",
                    onChange: (item) => {
                      // setSelectedHotel(value);
                      console.log("value", item);
                      form.setFieldsValue({ hotelName: item?.value?.description }); 
                    },
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
            <Form.Item
            name="checkInDate"
            label="check-in date"
            >
              <Input 
              type="date"
              format = "DD-MM-YYYY"
              />
            </Form.Item>
            </Col>
          </Row>
          <HotelForm
          // onChange={handleHotelDetailsChange}
          />
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

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                background:
                  "linear-gradient(98deg, #02583D 0.42%, #059669 112.05%)",
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
