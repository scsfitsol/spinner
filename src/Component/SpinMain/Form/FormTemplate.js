import React from "react";
import {
  Input,
  Form,
  Button,
  Row,
  Col,
  Checkbox,
  AutoComplete,
  Select,
  DatePicker
} from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const FormTemplate = (props) => { 
    const handleChange = (value) => {
        if (props.onChange) {
          props.onChange(value); // Call the parent-provided onChange handler
        }
      };  
  return (
        <Col xs={props.xs} md={props.md} lg={props.lg} span={props.span}>
          <Form.Item
            label={props.label}
            name={props.name}
            rules={[
              {
                required: props.required,
                message: props.message,
              },
            ]}
          >
            {props.type === "input" && <Input placeholder={props.placeholder} />}
            {props.type === "date" && 
            <Input 
            type = "date"
            style={{ width: "100%" }} 
            format="DD-MM-YYYY" 
            onChange={handleChange}
            />} 
            {props.type ==="select" && 
            <Select 
            options = {props.options}
            placeholder={props.placeholder}
            onChange={handleChange}
            />}
            {props.type === "googleAutoComplete" &&
            <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_MAP_KEY}
            apiOptions={{
              types: ["(cities)"],
              componentRestrictions: { country: "IN" },
            }}
            selectProps={{
              placeholder : props.placeholder,
              onChange: handleChange
              // placeholder: (
              //   <div
              //     className="google-placeholder-custom"
              //     style={{
              //       overflow: "hidden",
              //       textOverflow: "ellipsis",
              //       whiteSpace: "nowrap",
              //     }}
              //   >
              //     {props.placeholder}
              //   </div>
              // ),
              // onChange: (e) => onChangeGoogleAddress(e, fieldName?.name),
            }}
          />
            }
          </Form.Item>
        </Col>
  );
};

export default FormTemplate;
