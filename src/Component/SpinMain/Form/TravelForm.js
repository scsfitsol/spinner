import React, { useState } from "react";
import { Row, Col, Button, Form, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import FormTemplate from "./FormTemplate";
import { travelModeOptions } from "../../../constant";
import AsyncSelect from "react-select/async";
import Services from "../../../Services";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const TravelDetailsForm = (props) => {
  const vehicleOptions = [...new Set(travelModeOptions)].map((vehicle) => ({
    label: vehicle,
    value: vehicle,
  }));

  const [airports, setAirports] = useState([]);
  const [form] = Form.useForm();

  // Fetch airports only once when needed
  const fetchAirports = async () => {
    try {
      const response = await Services.get(`/getAirportList`);
      const options = response.data.data.map((airport) => ({
        label: airport.name,
        value: airport.IATA_code,
      }));
      setAirports(options);
    } catch (error) {
      console.error("Error fetching airport list:", error);
    }
  };

  // Load airport options asynchronously
  const loadOptions = (inputValue, callback) => {
    const filteredOptions = airports.filter((airport) =>
      airport.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };

  // Handle form value changes and pass them to the parent component
  const handleValuesChange = (changedValues) => {
    const travelDetails = form.getFieldValue("travelDetails") || [];
    console.log("traveldetails", travelDetails);
    const updatedTravelDetails = travelDetails.map((detail, index) => ({
      ...detail,
      ...changedValues.travelDetails?.[index],
    }));
    props.onChange({ updatedTravelDetails });
  };

  return (
    <Form
      form={form}
      name="travel_details_form"
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        Add travel details
      </Typography.Title>
      <Form.List name="travelDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
              <div
                key={key}
                style={{
                  position: "relative",
                  marginBottom: 16,
                  border: "1px solid #e0e0e0",
                  padding: "16px",
                  borderRadius: "4px",
                }}
              >
                <CloseOutlined
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontSize: "15px",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                  onClick={() => remove(name)}
                />

                <Row gutter={16}>
                  {/* Date of travel */}
                  <FormTemplate
                    span={24}
                    label="Date of travel"
                    name={[name, "dateOfTravel"]}
                    required={true}
                    message="Please select your travel date!"
                    placeholder="Select your date of travel"
                    type="date"
                  />
                  {/* Mode of travel */}
                  <FormTemplate
                    span={24}
                    label="Mode of travel"
                    name={[name, "modeOfTravel"]}
                    required={true}
                    message="Please select your travel mode!"
                    placeholder="Select your mode of travel"
                    type="select"
                    options={vehicleOptions}
                    onChange={(value) => {
                      form.setFieldsValue({
                        [`travelDetails[${index}].modeOfTravel`]: value,
                      });
                      if (value === "Aircraft" && airports.length === 0) {
                        fetchAirports();
                      }
                    }}
                  />

                  {/* Conditional rendering based on selected mode */}
                  <Form.Item shouldUpdate={(prevValues, currentValues) =>
                    prevValues.travelDetails?.[index]?.modeOfTravel !==
                    currentValues.travelDetails?.[index]?.modeOfTravel
                  }>
                    {({ getFieldValue }) => {
                      const selectedMode =
                        getFieldValue(["travelDetails", index, "modeOfTravel"]);
                      return (
                        <>
                          {/* Commute address fields for non-aircraft mode */}
                          {selectedMode !== "Aircraft" && selectedMode && (
                            <>
                              <Col span={24}>
                                <Form.Item
                                  label="Enter start address"
                                  name={[name, "commuteStartAddress"]}
                                  style={{ width: "100%" }}
                                  rules={[{ required: true, message: "Please enter the start address!" }]} // Ensure required validation
                                >
                                  <GooglePlacesAutocomplete
                                    apiKey={process.env.REACT_APP_MAP_KEY}
                                    apiOptions={{
                                      types: ["(cities)"],
                                      componentRestrictions: { country: "IN" },
                                    }}
                                    selectProps={{
                                      placeholder: "Select commute start address",
                                      onChange: (item) => {
                                        form.setFieldsValue({
                                          [`travelDetails.commuteStartAddress`]:
                                            item?.value?.description,
                                        });
                                      },
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item
                                  label="Enter end address"
                                  name={[name, "commuteEndAddress"]}
                                  style={{ width: "100%" }}
                                  rules={[{ required: true, message: "Please enter the end address!" }]} // Ensure required validation
                                >
                                  <GooglePlacesAutocomplete
                                    apiKey={process.env.REACT_APP_MAP_KEY}
                                    apiOptions={{
                                      types: ["(cities)"],
                                      componentRestrictions: { country: "IN" },
                                    }}
                                    selectProps={{
                                      placeholder: "Select commute end address",
                                      onChange: (item) => {
                                        form.setFieldsValue({
                                          [`travelDetails[${index}].commuteEndAddress`]: item?.value?.description,
                                        });
                                      },
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </>
                          )}
                          {/* Commute address fields for aircraft mode */}
                          {selectedMode === "Aircraft" && (
                            <>
                              <Col span={24}>
                                <Form.Item
                                  label="Commute start address"
                                  name={[name, "commuteStartAddress"]}
                                  style={{ width: "100%" }}
                                  rules={[{ required: true, message: "Please select your commute start address" }]}
                                >
                                  <AsyncSelect
                                    cacheOptions
                                    loadOptions={loadOptions}
                                    defaultOptions={airports}
                                    onChange={(item) => {
                                      form.setFieldsValue({
                                        [`travelDetails[${index}].commuteStartAddress`]:
                                          item?.label,
                                      });
                                    }}
                                    placeholder="Search for an airport"
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item
                                  label="Commute end address"
                                  name={[name, "commuteEndAddress"]}
                                  style={{ width: "100%" }}
                                  rules={[{ required: true, message: "Please select your commute end address" }]}
                                >
                                  <AsyncSelect
                                    cacheOptions
                                    loadOptions={loadOptions}
                                    defaultOptions={airports}
                                    onChange={(item) => {
                                      form.setFieldsValue({
                                        [`travelDetails[${index}].commuteEndAddress`]:
                                          item?.label,
                                      });
                                    }}
                                    placeholder="Search for an airport"
                                  />
                                </Form.Item>
                              </Col>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Form.Item>
                </Row>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add travel details
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default TravelDetailsForm;
