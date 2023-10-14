"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useState } from "react";
import { Checkbox, Col, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";

const NewAsset = () => {
  const [assetInfo, setAssetInfo] = useState({});
  const [termsConditions, setTermsConditions] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleAssetInfoChange = (e = {}) => {
    const { value, name } = e.target || {};

    setAssetInfo((info) => ({ ...info, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar showPages={true} showUserActions={true} />
      <div>
        <div className={styles.wrapper}>
          <p className={styles.pageTitle}>
            {previewMode
              ? "Digital Asset Onboarding Application"
              : "Review Listing"}
          </p>
          <p className={styles.subTitle}>Listing Information</p>

          <form name="basic" onSubmit={handleSubmit}>
            <label className={styles.label}>
              Asset Name*
              {previewMode ? (
                <p>{assetInfo.name}</p>
              ) : (
                <Input
                  onChange={handleAssetInfoChange}
                  value={assetInfo.name}
                />
              )}
            </label>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Asset Type*
                  {previewMode ? (
                    <p>{assetInfo.name}</p>
                  ) : (
                    <Input
                      name="name"
                      onChange={handleAssetInfoChange}
                      value={assetInfo.name}
                    />
                  )}
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Asset Value*
                  {previewMode ? (
                    <p>{assetInfo.name}</p>
                  ) : (
                    <Input
                      onChange={handleAssetInfoChange}
                      value={assetInfo.name}
                    />
                  )}
                </label>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #d9d9d9" }} />
            <p className={styles.subTitle}>Listing Information</p>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Desired Loan Amount*
                  {previewMode ? (
                    <p>{assetInfo.name}</p>
                  ) : (
                    <Input
                      onChange={handleAssetInfoChange}
                      value={assetInfo.name}
                    />
                  )}
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Loan Tenure*
                  {previewMode ? (
                    <p>Tenure</p>
                  ) : (
                    <Select style={{ display: "block" }}>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  )}
                </label>
              </Col>
            </Row>
            <Checkbox
              checked={termsConditions}
              onChange={() => setTermsConditions((e) => !e)}
            >
              Terms and Conditions
            </Checkbox>
            <div style={{ textAlign: "center" }}>
              <GhostButtons
                onPress={() => setPreviewMode((e) => !e)}
                label="Cancel"
              />{" "}
              &nbsp;
              {!previewMode && (
                <PrimaryButtons
                  onPress={() => setPreviewMode(true)}
                  label="Review"
                />
              )}
              {previewMode && (
                <PrimaryButtons
                  onPress={() => alert(done)}
                  label="Submit for validation"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewAsset;
