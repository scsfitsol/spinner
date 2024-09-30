import React from 'react';
import { Row, Col, Form, Typography } from "antd";
import FormTemplate from './FormTemplate';

const HotelForm = () => {
  return (
    <Form name="hotelDetails" layout="vertical">
      {/* Label at the top */}
      {/* <Typography.Title level={4} style={{ marginBottom: 16 }}>
        Add hotel details
      </Typography.Title> */}

      <Row gutter={16}>
        <Col span={24}>
          <FormTemplate
            span={24}
            label="Enter your hotel location you stayed"
            name="hotelLocation"
            required={false}
            message="Please enter your hotel location"
            placeholder="Enter hotel location"
            type="googleAutoComplete"
          />
        </Col>

        <Col span={24}>
          <FormTemplate
            span={24}
            label="Enter your check-in date"
            name="checkInDate"
            required={false}
            message="Please enter your check-in date"
            placeholder="Enter your check-in date"
            type="date"
          />
        </Col>
        
        {/* Uncomment the next section if you need to add check-out date */}
        {/* 
        <Col span={24}>
          <FormTemplate
            span={24}
            label="Enter your check-out date"
            name="checkOutDate"
            required={true}
            message="Please enter your check-out date"
            placeholder="Enter your check-out date"
            type="date"
          />
        </Col>
        */}
      </Row>
    </Form>
  );
};

export default HotelForm;
