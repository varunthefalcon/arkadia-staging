"use client";

import Image from "next/image";
import { Button, Form } from "antd";
import styles from "./page.module.css";
import { Input } from "antd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setUserInfo } from "@/lib/helper";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiLoading, setAPILoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: "http://defi.ap-southeast-1.elasticbeanstalk.com:9002/defi/api/v1/customer/login",
      method: "POST",
      data: {
        userName: username,
        password: password,
      },
    };
    console.log(config);

    try {
      setAPILoading(true);
      const p = await axios(config);
      console.log(p);

      setUserInfo(p.data);

      if (p.data.customerType === "AO") {
        router.push("/ao/dashboard");
      } else if (p.data.customerType === "RM") {
        router.push("/rm/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please check credentials");
    } finally {
      setAPILoading(false);
    }
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
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
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
              <Input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
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
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Item>

            <Button
              loading={apiLoading}
              htmlType="submit"
              className={styles.login_buttons}
              type="primary"
              onClick={handleSubmit}
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
