import React from "react";
import { Row, Col, Button, Form, Label, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import FormTemplate from "./FormTemplate"; // Assuming you have a FormTemplate component
import { travelModeOptions } from "../../../constant";

const TravelDetailsForm = () => {
  const vehicleOptions = [...new Set(travelModeOptions)].map((vehicle) => ({
    label: vehicle,
    value: vehicle,
  }));
  return (
    <Form name="travel_details_form" layout="vertical">
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
                  //   backgroundColor: "#fafafa", // Ensure the background doesn't interfere
                }}
              >
                {/* Cross Icon to Remove Section */}
                <CloseOutlined
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontSize: "15px",
                    // color: "#ff4d4f",
                    cursor: "pointer",
                    zIndex: 10, // Ensure icon is above other content
                  }}
                  onClick={() => remove(name)} // Remove the section
                />

                <Row gutter={16}>
                  <FormTemplate
                    span={24}
                    label="Date of travel"
                    name={[name, "dateOfTravel"]}
                    required={true}
                    message="Please select your travel date!"
                    placeholder="Select your date of travel"
                    type="date"
                  />
                  <FormTemplate
                    span={24}
                    label="Mode of travel"
                    name={[name, "modeOfTravel"]}
                    required={true}
                    message="Please select your travel mode!"
                    placeholder="Select your mode of travel"
                    type="select"
                    options={vehicleOptions} // Assuming vehicleOptions is available
                  />
                  <FormTemplate
                    span={24}
                    label="Select your commute start address"
                    name={[name, "commuteStartAddress"]}
                    required={true}
                    message="Please select your commute start address"
                    placeholder="Select your commute start address"
                    type="googleAutoComplete"
                  />
                  <FormTemplate
                    span={24}
                    label="Select your commute end address"
                    name={[name, "commuteEndAddress"]}
                    required={true}
                    message="Please select your commute end address"
                    placeholder="Select your commute end address"
                    type="googleAutoComplete"
                  />
                </Row>
              </div>
            ))}

            {/* Button to Add More Travel Sections */}
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

      {/* Form submission buttons, etc. */}
    </Form>
  );
};

export default TravelDetailsForm;
