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
import { getUserInfo, setUserInfo } from "@/lib/helper";
import { URL_LOGIN } from "@/constants/config";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiLoading, setAPILoading] = useState(false);
  const router = useRouter();
  const user = getUserInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: URL_LOGIN,
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
      setUserInfo(p.data);
      toast.success(`Welcome back ${p.data.firstName || p.data.userName}!`);

      if (p.data.customerType === "AO") {
        router.push("/ao/dashboard");
      } else if (p.data.customerType === "CRO") {
        router.push("/ao/dashboard");
      } else if (p.data.customerType === "RM") {
        router.push("/rm/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Incorrect! Please check your credentials!");
    } finally {
      setAPILoading(false);
    }
  };

  useEffect(() => {
    if (user.customerType === "AO") {
      router.push("/ao/dashboard");
    } else if (user.customerType === "CRO") {
      router.push("/ao/dashboard");
    } else if (user.customerType === "RM") {
      router.push("/rm/dashboard");
    }
  }, []);

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
                placeholder="Enter your email address"
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
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Item>

            <PrimaryButtons
              loading={apiLoading}
              htmlType="submit"
              className={styles.login_buttons}
              type="primary"
              onPress={handleSubmit}
              label={"Login"}
              block={true}
            ></PrimaryButtons>

            <p>
              Don’t have an account?{" "}
              <span style={{ color: "#1027B8" }}>Sign Up</span>
            </p>
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
