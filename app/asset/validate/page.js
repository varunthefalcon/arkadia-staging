"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useState } from "react";
import { Alert, Checkbox, Col, DatePicker, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import { CheckCircleFilled } from "@ant-design/icons";
import ArkBadge from "@/components/Badge";

const ValidateAsset = () => {
  const [assetInfo, setAssetInfo] = useState({
    name: "alksdf asdlkfjansdf asdf",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleAssetInfoChange = (e = {}) => {
    const { value, name } = e.target || {};

    setAssetInfo((info) => ({ ...info, [name]: value }));
  };

  return (
    <>
      <Navbar showPages={true} showUserActions={true} />
      <div style={{ backgroundColor: "#EAEBF9" }}>
        <div className={styles.wrapper}>
          <p className={styles.pageTitle}>Validate Listing</p>
          <p className={styles.subTitle}>Listing Information</p>

          <form name="basic" onSubmit={handleSubmit}>
            <label className={styles.label}>
              Asset Name*
              <p>{assetInfo.name}</p>
            </label>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Asset Type*
                  <p>{assetInfo.name}</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Asset Value*
                  <p>{assetInfo.name}</p>
                </label>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #d9d9d9" }} />
            <p className={styles.subTitle}>Loan Information</p>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Desired Loan Amount*
                  <p>{assetInfo.name}</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Loan Tenure*
                  <p>Tenure</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Interest Rates Offered*
                  <Input
                    style={{ margin: "8px 0 24px 0" }}
                    onChange={handleAssetInfoChange}
                    value={assetInfo.name}
                  />
                </label>
              </Col>

              <Col span={12}>
                <label className={styles.label}>
                  Start date*
                  <div style={{ margin: "8px 0 24px 0" }}>
                    <DatePicker />
                  </div>
                </label>
              </Col>

              <Col span={12}>
                <label className={styles.label}>
                  Final Maturity date*
                  <div style={{ margin: "8px 0 24px 0" }}>
                    <DatePicker />
                  </div>
                </label>
              </Col>
            </Row>

            <hr style={{ border: "1px solid #d9d9d9" }} />

            <p className={styles.subTitle}>Approval Process</p>

            <div className={styles.progressIcons}>
              <CheckCircleFilled
                style={{ fontSize: "32px", color: "#1027B8" }}
              />
            </div>
            <div className={styles.progressIcons}>
              <ArkBadge label="2" />
              <span>
                Application <br />
                <span>asdfasdf</span>
              </span>
            </div>
            <div className={[styles.progressIcons, styles.lastElem].join(" ")}>
              <ArkBadge label="3" />
            </div>

            <div style={{ textAlign: "center" }}>
              <GhostButtons
                onPress={() => setPreviewMode((e) => !e)}
                label="Cancel"
              />{" "}
              &nbsp;
              <PrimaryButtons
                onPress={() => setPreviewMode(true)}
                label="Accept and List on Marketplace"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ValidateAsset;
