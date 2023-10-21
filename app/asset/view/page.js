"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Alert, Checkbox, Col, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import axios from "axios";
import { formatCurrency } from "@/lib/helper";

const ViewAsset = () => {
  const [assetInfo, setAssetInfo] = useState({ paymentTerms: {} });
  const [loading, setLoading] = useState(false);

  const getAsset = async () => {
    try {
      const config = {
        url: "http://defi.ap-southeast-1.elasticbeanstalk.com:9002/defi/api/v1/asset/fetchAsset/352",
        method: "GET",
      };
      setLoading(true);
      const resp = await axios(config);

      console.log(resp);
      setAssetInfo({ paymentTerms: {}, ...(resp.data || {}) });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAsset();
  }, []);

  return (
    <>
      <Navbar showPages={true} showUserActions={true} />
      <div>
        <div className={styles.wrapper}>
          <br />
          <p className={styles.pageTitle}>{assetInfo.assetName}</p>
          <p className={styles.subTitle}>Listing Information</p>

          <Row gutter={20}>
            <Col span={12}>
              <label className={styles.label}>
                Account ID*
                <p>{assetInfo.accountID || "#132455454"}</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Asset Name*
                <p>{assetInfo.assetName}</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Asset Type*
                <p>{assetInfo.categoryId}</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Asset Value*
                <p>{formatCurrency(assetInfo.assetPrice)}</p>
              </label>
            </Col>
          </Row>
          <hr style={{ border: "1px solid #d9d9d9" }} />
          <br />
          <Row gutter={20}>
            <Col span={12}>
              <label className={styles.label}>
                Desired Loan Amount*
                <p>{assetInfo.loanRequested}</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Loan Tenure*
                <p>{assetInfo.paymentTerms.duration}</p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Interest Rates Offered*
                <p className={styles.highlight}>
                  {assetInfo.paymentTerms.rMInterestRate}%
                </p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Start date*
                <p className={styles.highlight}>
                  {assetInfo.paymentTerms.startDate || "N/A"}
                </p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Final Maturity date*
                <p className={styles.highlight}>
                  {assetInfo.paymentTerms.endDate || "N/A"}
                </p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Validated By*
                <p className={styles.highlight}>
                  {assetInfo.paymentTerms.manager || "N/A"}
                </p>
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
              label="Request for Loan Agreement"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAsset;
