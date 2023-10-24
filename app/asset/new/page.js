"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useState } from "react";
import { Checkbox, Col, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import { URL_CREATE_ASSET, URL_GET_TOKENIZED_ASSET } from "@/constants/config";
import { getUserInfo, theme } from "@/lib/helper";
import { Button, ConfigProvider } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const NewAsset = () => {
  const [assetInfo, setAssetInfo] = useState({});
  const [termsConditions, setTermsConditions] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = getUserInfo();
  const router = useRouter();

  const handleAssetInfoChange = (e = {}) => {
    const { value, name } = e.target || {};

    setAssetInfo((info) => ({ ...info, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const config1 = {
    //   url: URL_GET_TOKENIZED_ASSET,
    //   method: "GET",
    //   params: {
    //     customerId: user.customerId,
    //   },
    // };

    const config2 = {
      url: "http://defi.ap-southeast-1.elasticbeanstalk.com:9002/defi/api/v1/hedera/createAsset",
      method: "POST",
      data: {
        customerId: user.customerId,
        assetName: assetInfo.assetName,
      },
    };

    const config = {
      url: URL_CREATE_ASSET,
      method: "POST",
      data: {
        customerId: user.customerId,
        assetName: assetInfo.assetName,
        // nftTokenId: 0,
        categoryId: 1,
        loanRequested: parseInt(assetInfo.loanRequested),
        assetPrice: parseInt(assetInfo.assetPrice),
        colleteralizationOffer: 30,
        paymentTerms: {
          duration: parseInt(assetInfo.loanTenure),
        },
      },
    };

    try {
      setLoading(true);
      const resp = await axios(config2);

      console.log(resp);

      // toast.success("Asset created and sent for approval.");

      // router.push("/ao/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(user);

  return (
    <>
      <ConfigProvider theme={theme}>
        <Navbar showPages={true} showUserActions={true} />
        <div>
          <div className={styles.wrapper}>
            <p className={styles.pageTitle}>
              {previewMode
                ? "Digital Asset Onboarding Application"
                : "Review Listing"}
            </p>
            <p className={styles.subTitle}>Listing Information</p>

            <form name="basic">
              <label className={styles.label}>
                Asset Name*
                {previewMode ? (
                  <p>{assetInfo.assetName}</p>
                ) : (
                  <Input
                    name="assetName"
                    onChange={handleAssetInfoChange}
                    value={assetInfo.assetName}
                  />
                )}
              </label>
              <Row gutter={20}>
                <Col span={12}>
                  <label className={styles.label}>
                    Asset Type*
                    {previewMode ? (
                      <p>{assetInfo.categoryId}</p>
                    ) : (
                      <Input
                        name="categoryId"
                        onChange={handleAssetInfoChange}
                        value={assetInfo.categoryId}
                      />
                    )}
                  </label>
                </Col>
                <Col span={12}>
                  <label className={styles.label}>
                    Asset Value*
                    {previewMode ? (
                      <p>{assetInfo.assetPrice}</p>
                    ) : (
                      <Input
                        name="assetPrice"
                        onChange={handleAssetInfoChange}
                        value={assetInfo.assetPrice}
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
                      <p>{assetInfo.loanRequested}</p>
                    ) : (
                      <Input
                        name="loanRequested"
                        onChange={handleAssetInfoChange}
                        value={assetInfo.loanRequested}
                      />
                    )}
                  </label>
                </Col>
                <Col span={12}>
                  <label className={styles.label}>
                    Loan Tenure*
                    {previewMode ? (
                      <p>{assetInfo.loanTenure} months</p>
                    ) : (
                      <Select
                        style={{ display: "block" }}
                        value={assetInfo.loanTenure}
                        onChange={(e) =>
                          setAssetInfo((info) => ({
                            ...info,
                            loanTenure: e,
                          }))
                        }
                      >
                        <Select.Option value="24">2 years</Select.Option>
                        <Select.Option value="36">3 years</Select.Option>
                        <Select.Option value="48">4 years</Select.Option>
                        <Select.Option value="60">5 years</Select.Option>
                        <Select.Option value="72">6 years</Select.Option>
                        <Select.Option value="84">7 years</Select.Option>
                        <Select.Option value="96">8 years</Select.Option>
                        <Select.Option value="108">9 years</Select.Option>
                        <Select.Option value="120">10 years</Select.Option>
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
                    disabled={!termsConditions}
                  />
                )}
                {previewMode && (
                  <PrimaryButtons
                    onPress={handleSubmit}
                    loading={loading}
                    label="Submit for validation"
                  />
                )}
              </div>
            </form>
          </div>
          <br />
          <br />
          <br />
        </div>
      </ConfigProvider>
    </>
  );
};

export default NewAsset;
