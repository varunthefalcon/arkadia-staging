"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useState } from "react";
import { Alert, Checkbox, Col, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";

const ReviewAsset = () => {
  const [assetInfo, setAssetInfo] = useState({
    name: "alksdf asdlkfjansdf asdf",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar showPages={true} showUserActions={true} />
      <div>
        <div className={styles.wrapper}>
          <Alert
            message="Your listing has been updated with interest rates and validity."
            type="warning"
            showIcon
            closable
          />
          <br />
          <p className={styles.pageTitle}>Review Listing</p>
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
            <p className={styles.subTitle}>Listing Information</p>
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
                  <p className={styles.highlight}>5%</p>
                </label>
              </Col>

              <Col span={12}>
                <label className={styles.label}>
                  Start date*
                  <p className={styles.highlight}>14-10-2023</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Final Maturity date*
                  <p className={styles.highlight}>14-10-2023</p>
                </label>
              </Col>

              <Col span={12}>
                <label className={styles.label}>
                  Validated By*
                  <p className={styles.highlight}>Relation manager</p>
                </label>
              </Col>
            </Row>

            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
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

export default ReviewAsset;
