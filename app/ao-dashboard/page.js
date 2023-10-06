"use client";

import Image from "next/image";
import { Button, Form } from "antd";
import styles from "./page.module.css";
import { Input, Checkbox } from "antd";

export default function SignIn() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <main>
      <div className={styles.landing_header}>
        <Image src="/assets/nav_logo.png" width={160} height={30} />
      </div>
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
          <p className={styles.landing_title}>Login</p>

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
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
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
                  required: true,
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
        </div>
      </div>
      <div className={styles.landing_footer}>
        Working with{" "}
        <Image
          src="/assets/partner_1.png"
          alt="Next.js subtitle"
          style={{ paddingTop: "4px", marginLeft: "10px" }}
          height={30}
          width={100}
          priority
        />
        <Image
          src="/assets/partner_2.png"
          alt="Next.js subtitle"
          style={{ paddingTop: "4px", marginLeft: "10px" }}
          height={30}
          width={200}
          priority
        />
      </div>
    </main>
  );
}
