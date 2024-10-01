import React, { useState } from "react";
import { Row, Col, Button, Form, Label, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import FormTemplate from "./FormTemplate"; // Assuming you have a FormTemplate component
import { travelModeOptions } from "../../../constant";
import AsyncSelect from "react-select/async";
import Services from "../../../Services";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const TravelDetailsForm = (props) => {
  const vehicleOptions = [...new Set(travelModeOptions)].map((vehicle) => ({
    label: vehicle,
    value: vehicle,
  }));
  const [selectedMode, setSelectedMode] = useState(null);
  const [airports, setAirports] = useState([]);
  const [selectedStartAddress, setSelectedStartAddress] = useState(null);
  const [selectedEndAddress, setSelectedEndAddress] = useState(null);
  const [form] = Form.useForm();

  const handleModeChange = (value) => {
    setSelectedMode(value);
    if (value === "Aircraft") {
      if (airports.length === 0) {
        fetchAirports();
      }
    }
  };
  const handleValuesChange = (changedValues) => {
    console.log("Changedvalues1", changedValues);
    const travelDetails = form.getFieldValue("travelDetails") || [];
    const updatedTravelDetails = travelDetails.map((detail, index) => ({
      ...detail,
      travelDetails: {"updatedTravelDetails":[{"dateOfTravel":"2022-11-11","modeOfTravel":"4 wheeler - Petrol","commuteStartAddress":"delhi", "commuteEndAddress":"vizag"},{"dateOfTravel":"2022-10-12","modeOfTravel":"Aircraft","commuteStartAddress":{"label":"AGX: Agatti Airport, Agatti, India","value":"AGX"},"commuteEndAddress":{"label":"BLP: Huallaga Airport, Bellavista, Peru","value":"BLP"}}]},
      commuteStartAddress: selectedStartAddress,
      commuteEndAddress: selectedEndAddress,
      ...changedValues.travelDetails?.[index], // Only apply changes to the respective index
    }));

    console.log("updatedvalues", updatedTravelDetails);
    props.onChange({ updatedTravelDetails });
  };
  const fetchAirports = async () => {
    try {
      const response = await Services.get(`/getAirportList`);
      const options = response.data.data.map((airport) => ({
        label: airport.name, // Display airport name
        value: airport.IATA_code, // Use IATA code as the value
      }));
      setAirports(options); // Store the fetched airport data
    } catch (error) {
      console.error("Error fetching airport list:", error);
    }
  };
  const loadOptions = (inputValue, callback) => {
    const filteredOptions = airports.filter((airport) =>
      airport.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredOptions);
  };
  //   const loadOptions = (inputValue) => {
  //     // Return a promise that resolves to the options
  //     return Services.get(`/getAirportList/${inputValue}`)
  //       .then((res) => {
  //         // Map the response data into options format for AsyncSelect
  //         const options = res?.data?.data.map((airport) => ({
  //           label: `${airport.IATA_code}: ${airport.name}`, // Display IATA code with name
  //           value: airport.IATA_code, // Use IATA code as the value
  //         }));
  //         return options; // Return the options for the select dropdown
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching airport list:", error);
  //         return []; // Return an empty array in case of error
  //       });
  //   };
  //   const loadOptions = (inputValue, callback) => {
  //     Services.get(`/getAirportList/${inputValue}`).then((res) => {
  //         console.log("res", res?.data?.data);
  //     //   const optionsList = res?.data?.data.split("\n").slice(0, -1);
  //     const options = res?.data?.data.map((airport) => ({
  //         label: airport.name,  // Display the full airport name, including location
  //         value: airport.IATA_code,  // Use IATA code as the value for the option
  //       }));
  //     //   const options = [];
  //     //   optionsList.forEach((el) => {
  //     //     options.push({
  //     //       label: el.split("|")[0],
  //     //       value: el.split("|")[0],
  //     //     });
  //     //   });
  //       callback(options);
  //     });
  //   };
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
      <Form.List name="travelDetails" onChange={props.onChange}>
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
                    onChange={handleModeChange}
                  />
                  {selectedMode !== null && selectedMode !== "Aircraft" && (
                    <>
                      <Col span={24}>
                        <Form.Item
                          label="Enter start address"
                          name="commuteStartAddress"
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
                                // setSelectedHotel(value);
                                console.log("commutevalue", item);
                                setSelectedStartAddress(
                                    item?.value?.description
                                )
                              },
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="Enter start address"
                          name="commuteStartAddress"
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
                                // setSelectedHotel(value);
                                console.log("commutevalue", item);
                                setSelectedStartAddress(
                                    item?.value?.description
                                )
                              },
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  {selectedMode !== null && selectedMode === "Aircraft" && (
                    <>
                      <Col span={24}>
                        <Form.Item
                          label="Commute start address"
                          name={[name, "commuteStartAddress"]}
                          rules={[
                            {
                              required: true,
                              message:
                                "Please select your commute start address",
                            },
                          ]}
                        >
                          <AsyncSelect
                            cacheOptions
                            loadOptions={loadOptions} // This will use the loadOptions function
                            defaultOptions={airports} // Load default options on initial render if available
                            onChange={(selectedOption) => {
                                setSelectedStartAddress(selectedOption?.label);
                            //   console.log("Selected airport: ", selectedOption); // Handle selected option
                            }}
                            placeholder="Search for an airport"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="Commute end address"
                          name={[name, "commuteEndAddress"]}
                          rules={[
                            {
                              required: true,
                              message: "Please select your commute end address",
                            },
                          ]}
                        >
                          <AsyncSelect
                            cacheOptions
                            loadOptions={loadOptions} // This will use the loadOptions function
                            defaultOptions={airports} // Load default options on initial render if available
                            onChange={(selectedOption) => {
                                // to change code to label update text to label
                                setSelectedEndAddress(selectedOption.label);
                            //   console.log("Selected airport: ", selectedOption); // Handle selected option
                            }}
                            placeholder="Search for an airport"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
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

      {/* Form submission buttons, etc. */}
    </Form>
  );
};

export default TravelDetailsForm;


// new code

