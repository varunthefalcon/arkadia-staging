"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Checkbox, Col, Input, Modal, Radio, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import {
  URL_CREATE_ASSET,
  URL_FETCH_CATEGORY,
  URL_GET_TOKENIZED_ASSET,
} from "@/constants/config";
import { formatCurrency, getUserInfo, theme } from "@/lib/helper";
import { Button, ConfigProvider } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PaperClipOutlined } from "@ant-design/icons";

const NewAsset = () => {
  const [assetInfo, setAssetInfo] = useState({});
  const [termsConditions, setTermsConditions] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [inputModalOpen, setInputModalOpen] = useState(false);

  const user = getUserInfo();
  const router = useRouter();

  const handleAssetInfoChange = (e = {}) => {
    const { value, name } = e.target || {};

    setAssetInfo((info) => ({ ...info, [name]: value }));
  };

  const handleAssetTypeChange = (e = {}) => {
    setAssetInfo((info) => ({ ...info, categoryId: e }));
  };

  const fetchCategories = async () => {
    try {
      const config = {
        url: URL_FETCH_CATEGORY,
        method: "GET",
      };

      const resp = await axios(config);

      setCategories(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: URL_CREATE_ASSET,
      method: "POST",
      data: {
        customerId: user.customerId,
        assetName: assetInfo.assetName,
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
      const resp = await axios(config);

      // console.log(resp);
      setInputModalOpen(true);
      // toast.success("Asset created and sent for approval.");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log(assetInfo);

  return (
    <>
      <ConfigProvider theme={theme}>
        <Navbar showPages={true} showUserActions={true} />
        <div
          style={{
            backgroundColor: "#EAEBF9",
          }}
        >
          <div className={styles.wrapper}>
            <p className={styles.pageTitle}>
              {previewMode ? "Review Borrowing Request" : "Borrowing Request"}
            </p>
            <p className={styles.subTitle}>Asset Information</p>

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
                      <p>
                        {!!assetInfo?.categoryId &&
                          categories.find(
                            (e) => e.categoryId == assetInfo?.categoryId
                          )?.categoryName}
                      </p>
                    ) : (
                      <>
                        <br />
                        <Select
                          placeholder="Select a category"
                          style={{ width: "100%" }}
                          onChange={handleAssetTypeChange}
                        >
                          {categories.map((e) => (
                            <Select.Option key={e.categoryId}>
                              {" "}
                              {e.categoryName}{" "}
                            </Select.Option>
                          ))}
                        </Select>
                      </>
                    )}
                  </label>
                </Col>
                <Col span={12}>
                  <label className={styles.label}>
                    Asset Value*
                    {previewMode ? (
                      <p>{formatCurrency(assetInfo.assetPrice)}</p>
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
              <a href="#" style={{ fontSize: "12px", color: "#1027B8" }}>
                <PaperClipOutlined color="black" /> &nbsp; Paris 15 District.pdf
              </a>
              <hr style={{ border: "1px solid #d9d9d9", marginTop: "10px" }} />
              <p className={styles.subTitle}>Listing Information</p>
              <Row gutter={20}>
                <Col span={12}>
                  <label className={styles.label}>
                    Desired Loan Amount*
                    {previewMode ? (
                      <p>{formatCurrency(assetInfo.loanRequested)}</p>
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
                    Risk Profile Type*
                    {previewMode ? (
                      <p>{assetInfo.loanRisk}</p>
                    ) : (
                      <Select
                        style={{ display: "block" }}
                        value={assetInfo.loanRisk}
                        onChange={(e) =>
                          setAssetInfo((info) => ({
                            ...info,
                            loanRisk: e,
                          }))
                        }
                      >
                        <Select.Option value="A">A</Select.Option>
                        <Select.Option value="B">B</Select.Option>
                        <Select.Option value="C">C</Select.Option>
                      </Select>
                    )}
                  </label>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col span={12}>
                  <label className={styles.label}>
                    Loan Type*
                    <br />
                    {previewMode ? (
                      <p>{assetInfo.loanType}</p>
                    ) : (
                      <Radio.Group
                        onChange={(e) =>
                          setAssetInfo((info) => ({
                            ...info,
                            loanType: e.target.value,
                          }))
                        }
                        style={{ marginTop: "12px" }}
                      >
                        <Radio value={"Bullet"}>Bullet</Radio>
                        <Radio value={"Amortising"}>Amortising</Radio>
                      </Radio.Group>
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
                        <Select.Option value="6">6 months</Select.Option>
                        <Select.Option value="12">12 months</Select.Option>
                        <Select.Option value="24">24 months</Select.Option>
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
          <Modal
            title={<b>Request submitted</b>}
            closable={true}
            style={{ textAlign: "center" }}
            centered
            footer={[
              <div style={{ textAlign: "center" }} key="modal_footer_1">
                <PrimaryButtons
                  label="Close"
                  onPress={() => router.push("/ao/dashboard")}
                />
              </div>,
            ]}
            open={inputModalOpen}
            maskStyle={{ backgroundColor: "#050C36", opacity: 0.5 }}
            onOk={() => setInputModalOpen(false)}
            onCancel={() => setInputModalOpen(false)}
            width={450}
          >
            <p style={{ margin: "24px 0 32px 0" }}>
              Once your request is approved, you will be able notified.
            </p>
          </Modal>
        </div>
      </ConfigProvider>
    </>
  );
};

export default NewAsset;
