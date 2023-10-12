"use client";

import Image from "next/image";
import { Button, Form } from "antd";
import styles from "./page.module.css";
import { Input } from "antd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignIn() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <main>
      <Navbar />
      <div className={styles.landing_wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/landing_arrow.png"
            alt="Next.js Logo"
            fill
            priority
          />
        </div>
        <div className={styles.right_wrapper}>
          <p className={styles.landing_title}>
            Secure loans <br /> Connect investors
          </p>
          <p className={styles.landing_subtitle}>
            Bridge opportunity and capital by using assets as collateral to
            connect professional investors with the resources you need
          </p>

          <Form
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  message: "Please input your email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Button
              htmlType="submit"
              className={styles.login_buttons}
              type="primary"
            >
              <span>Login</span>
            </Button>

            <Button className={styles.login_buttons_ghost} type="primary">
              <span>Forgot Password</span>
            </Button>
          </Form>
          <div style={{ display: "flex" }}>
            <div className={styles.landing_stat_wrapper}>
              <span className={styles.landing_stat_wrapper_label}>
                Total Asset Financed{" "}
              </span>
              <br />
              <span className={styles.landing_stat_wrapper_value}>$ 256M</span>
            </div>
            <div className={styles.landing_stat_wrapper}>
              <span className={styles.landing_stat_wrapper_label}>
                Asset Tokenized{" "}
              </span>
              <br />
              <span className={styles.landing_stat_wrapper_value}>1108</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
