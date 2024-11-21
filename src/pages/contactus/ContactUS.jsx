import React from 'react';
import { Layout, Card, Typography, Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import styles from './ContactUs.module.css'; // Import the CSS module

const { Content } = Layout;
const { Title, Text } = Typography;

const ContactUs = () => {
  return (
    <Layout>
      <Content className={styles.contactUsContainer}>
        <Card title="Contact Us" className={styles.contactCard}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Title level={3} className={styles.contactTitle}>
                University Grants Commission (UGC)
              </Title>
              <Text strong>Address:</Text>
              <p className={styles.contactText}>
                Bahadur Shah Zafar Marg,
                <br />
                New Delhi - 110002.
              </p>
            </Col>

            <Col span={24}>
              <Text strong className={styles.contactText}>
                <PhoneOutlined className={styles.iconStyle} />
                Phone:
              </Text>
              <p className={styles.contactText}>011-23604446, 011-23604200</p>
            </Col>

            <Col span={24}>
              <Text strong className={styles.contactText}>
                <MailOutlined className={styles.iconStyle} />
                Email:
              </Text>
              <p className={styles.contactText}>contact.ugc@nic.in</p>
            </Col>

            <Col span={24}>
              <Text strong className={styles.contactText}>
                <EnvironmentOutlined className={styles.iconStyle} />
                Location:
              </Text>
              <p className={styles.contactText}>Bahadur Shah Zafar Marg, New Delhi - 110002</p>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};

export default ContactUs;
