import React, { useRef, useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';
import emailjs from '@emailjs/browser';

const { Title, Paragraph } = Typography;

const AuthPopup = ({ visible, onAuthenticated }) => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values) => {
    setIsSubmitting(true);

    emailjs
      .send(
        'service_xgi703s',
        'template_2ph6ofk',
        {
          user_name: values.name,
          user_email: values.email,
          message: values.purpose,
        },
        '3W6WYJsDuttM2qHuE'
      )
      .then(
        () => {
          setIsSubmitting(false);
          onAuthenticated(true);
          localStorage.setItem('siteAuthenticated', 'true');
        },
        (error) => {
          console.error('Email send error:', error.text);
          setIsSubmitting(false);
        }
      );
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
      bodyStyle={{ padding: '2rem' }}
    >
      <Title level={4} style={{ textAlign: 'center' }}>
        Welcome to Our Website!
      </Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: '2rem' }}>
        To better understand our visitors and improve your experience, please share your details and purpose of visit.
      </Paragraph>

      <Form
        ref={formRef}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Your full name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email address' }
          ]}
        >
          <Input placeholder="you@example.com" />
        </Form.Item>

        <Form.Item
          label="Purpose of Visit"
          name="purpose"
          rules={[{ required: true, message: 'Please share your purpose' }]}
        >
          <Input.TextArea rows={4} placeholder="Let us know why you’re visiting" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            loading={isSubmitting}
            size="large"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthPopup;
