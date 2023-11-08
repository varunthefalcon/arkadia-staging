"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useCallback, useEffect, useState } from "react";
import { Alert, Checkbox, Col, DatePicker, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import { CheckCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";
import ArkBadge from "@/components/Badge";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  URL_RM_VALIDATE_ASSET,
  URL_FETCH_DEAL,
  URL_DEAL_UPDATE_RM_STATUS,
  URL_DEAL_UPDATE_AO_CR_STATUS,
} from "@/constants/config";
import axios from "axios";
import {
  formatCurrency,
  formatDate,
  getAssetStatus,
  getUserInfo,
  getinterestRateColor,
} from "@/lib/helper";

const ValidateAsset = () => {
  const [assetInfo, setAssetInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [eligibilityFlag, setEligibilityFlag] = useState("no"); // yes, loading
  const [validationFlag, setValidationFlag] = useState("no"); // yes, loading
  // const [assetStatus, setAssetStatus] = useState("");

  const url = useSearchParams();
  const router = useRouter();
  const user = getUserInfo();

  const dealId = url.get("loan");

  const updateEligibility = () => {
    setEligibilityFlag("loading");
    setTimeout(() => {
      setEligibilityFlag("yes");
    }, 2000);
  };

  const updateValidation = () => {
    setValidationFlag("loading");
    setTimeout(() => {
      setValidationFlag("yes");
    }, 2000);
  };

  const getLoan = useCallback(async () => {
    if (!dealId) {
      router.push("/rm/dashboard");
      return;
    }

    try {
      const config = {
        url: URL_FETCH_DEAL + dealId,
        method: "GET",
      };
      const resp = await axios(config);

      setAssetInfo({
        paymentTerms: {},
        ...(resp.data || {}),
        assetType: resp.data?.category?.categoryName,
      });

      if (resp.data?.dealStatus != "INITIATED") {
        setEligibilityFlag("yes");
        setValidationFlag("yes");
      }

      // const assetStatus = getAssetStatus(resp.data);

      // setAssetStatus(assetStatus);
    } catch (error) {
      console.error(error);
    }
  }, [dealId]);

  const handleReject = (e) => {
    if (!confirm("Are you sure to reject?")) return;

    e.preventDefault();

    handleSubmit("NO-GO", "Loan Agreement Rejected Successfully.");
  };

  const handleApprove = (e) => {
    if (!confirm("Are you sure to approve?")) return;

    e.preventDefault();

    handleSubmit("GO", "Loan Agreement Approved Successfully.");
  };

  const handleSubmit = async (status, postMsg) => {
    try {
      const config = {
        method: "PUT",
        url: URL_DEAL_UPDATE_AO_CR_STATUS + dealId,
        params: {
          customerType: user.customerType,
          customerStatus: status,
        },
      };
      setLoading(true);
      const resp = await axios(config);
      toast.success(postMsg);
      router.push("/ao/dashboard");
      console.log(resp);
    } catch (error) {
      toast.error("Something went wrong, try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!assetInfo.rMInterestRate) {
  //     toast.warning("Interest rate is required!");
  //     return;
  //   }

  //   try {
  //     const config = {
  //       method: "PUT",
  //       url: URL_RM_VALIDATE_ASSET,
  //       data: {
  //         assetId: url.get("assetId"),
  //         rMInterestRate: assetInfo.rMInterestRate,
  //         rMInterestType: "Floating",
  //         duration: assetInfo?.paymentTerms?.duration,
  //         rMInterestPayoutCycle: "Half-Yearly",
  //         rMStatus: "GO",
  //       },
  //     };
  //     setLoading(true);
  //     const resp = await axios(config);
  //     toast.success(
  //       "Loan Agreement approved Successfully and sent for AO acceptance."
  //     );
  //     router.push("/rm/dashboard");
  //     console.log(resp);
  //   } catch (error) {
  //     toast.error("Something went wrong, try again later.");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleAssetInfoChange = (e = {}) => {
  //   const { value, name } = e.target || {};

  //   setAssetInfo((info) => ({ ...info, [name]: value }));
  // };

  useEffect(() => {
    getLoan();
  }, [getLoan]);

  console.log(assetInfo);

  return (
    <>
      <Navbar showPages={true} showUserActions={true} />
      <div style={{ backgroundColor: "#EAEBF9" }}>
        <div className={styles.wrapper}>
          <p className={styles.pageTitle}>Matched Transaction Application</p>
          <p className={styles.subTitle}>Listing Information</p>

          {/* {assetStatus == "rejected" && (
            <div style={{ marginBottom: "3rem" }}>
              <Alert
                message="This Borrow request is rejected."
                type="error"
                showIcon
              />
            </div>
          )} */}
          <label className={styles.label}>
            Asset Name
            <p>{assetInfo?.asset?.assetName}</p>
          </label>
          <Row gutter={20}>
            <Col span={12}>
              <label className={styles.label}>
                Asset Type
                <p>{assetInfo?.asset?.category?.categoryName}</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Asset Value
                <p>
                  <b>{formatCurrency(assetInfo?.asset?.assetPrice)}</b>
                </p>
              </label>
            </Col>
          </Row>
          <hr style={{ border: "1px solid #d9d9d9" }} />
          <p className={styles.subTitle}>Loan Information</p>
          <Row gutter={20}>
            <Col span={12}>
              <label className={styles.label}>
                Desired Loan Amount
                <p>
                  <b>{formatCurrency(assetInfo?.asset?.loanRequested)}</b>
                </p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Loan Tenure
                <p>{assetInfo?.asset?.paymentTerms?.duration || 0} months</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Interest Rates Offered
                <p
                  className={styles.highlight}
                  style={{
                    fontWeight: "bold",
                    color: getinterestRateColor(assetInfo?.interestRate),
                  }}
                >
                  {assetInfo.interestRate}%
                </p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Start date
                <p className={styles.highlight}>
                  {formatDate(assetInfo?.createdOn) || "N/A"}
                </p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Final Maturity date
                <p className={styles.highlight}>
                  {formatDate(assetInfo?.expiryDate) || "N/A"}
                </p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Validated By
                <p className={styles.highlight}>Relationship Manager</p>
              </label>
            </Col>
          </Row>

          <hr style={{ border: "1px solid #d9d9d9" }} />
          <br />
          <br />
          <Row gutter={20}>
            <Col span={12}>
              <label className={styles.label}>
                Investor Name
                <p className={styles.highlight}>{"Investor"}</p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Loan Amount
                <p>
                  <b>{formatCurrency(assetInfo?.asset?.loanRequested)}</b>
                </p>
              </label>
            </Col>
          </Row>

          <hr style={{ border: "1px solid #d9d9d9" }} />

          <p className={styles.subTitle}>Approval Process</p>

          <div className={styles.progressIcons}>
            <CheckCircleFilled style={{ fontSize: "32px", color: "#1027B8" }} />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              Application <br />
              <small>Validated by Relationship manager</small>
            </span>
          </div>
          <div className={styles.progressIcons}>
            {eligibilityFlag === "yes" ? (
              <CheckCircleFilled
                style={{ fontSize: "32px", color: "#1027B8" }}
              />
            ) : (
              <ArkBadge label="2" />
            )}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ width: "100%" }}>
              Eligibility(KYC) <br />
              {eligibilityFlag === "loading" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <small>In-progress...</small>
                  <PrimaryButtons
                    label="Evaluate"
                    // onPress={updateEligibility}
                    loading={true}
                  />
                </div>
              )}
              {eligibilityFlag === "no" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <small>Eligibility yet to be verified.</small>
                  <PrimaryButtons
                    label="Evaluate"
                    onPress={updateEligibility}
                  />
                </div>
              )}
              {eligibilityFlag === "yes" && (
                <small>
                  Bank account checked and verified. checked. <br />
                  Validated by Relationship manager
                </small>
              )}
            </span>
          </div>
          <div className={styles.progressIcons}>
            {validationFlag === "yes" ? (
              <CheckCircleFilled
                style={{ fontSize: "32px", color: "#1027B8" }}
              />
            ) : (
              <ArkBadge label="3" />
            )}{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ width: "100%" }}>
              Market Validation <br />
              {validationFlag === "loading" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <small>In-progress...</small>
                  <PrimaryButtons label="Validate" loading={true} />
                </div>
              )}
              {validationFlag === "no" && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <small>Market Validation yet to be verified.</small>
                  <PrimaryButtons label="Validate" onPress={updateValidation} />
                </div>
              )}
              {validationFlag === "yes" && (
                <small>
                  Bank account checked and verified. checked. <br />
                  Validated by Relationship manager
                </small>
              )}
            </span>
          </div>

          <div className={[styles.progressIcons].join(" ")}>
            {assetInfo.rMStatus == "GO" ? (
              <CheckCircleFilled
                style={{ fontSize: "32px", color: "#1027B8" }}
              />
            ) : (
              <ExclamationCircleFilled
                style={{ fontSize: "32px", color: "#DB1F28" }}
              />
            )}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ width: "100%" }}>
              RM Approval <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <small>
                  {assetInfo.rMStatus === "GO"
                    ? "RM approved the loan application."
                    : "RM did not approve the loan application."}
                </small>
              </div>
            </span>
          </div>
          {!!assetInfo.aOStatus && (
            <div className={[styles.progressIcons].join(" ")}>
              {assetInfo.aOStatus == "GO" ? (
                <CheckCircleFilled
                  style={{ fontSize: "32px", color: "#1027B8" }}
                />
              ) : (
                <ExclamationCircleFilled
                  style={{ fontSize: "32px", color: "#DB1F28" }}
                />
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ width: "100%" }}>
                AO Approval <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <small>
                    {assetInfo.aOStatus === "GO"
                      ? "Asset Owner approved the loan application."
                      : "Asset Owner did not approve the loan application."}
                  </small>
                </div>
              </span>
            </div>
          )}

          {!!assetInfo.cRStatus && (
            <div className={[styles.progressIcons].join(" ")}>
              {assetInfo.cRStatus == "GO" ? (
                <CheckCircleFilled
                  style={{ fontSize: "32px", color: "#1027B8" }}
                />
              ) : (
                <ExclamationCircleFilled
                  style={{ fontSize: "32px", color: "#DB1F28" }}
                />
              )}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span style={{ width: "100%" }}>
                Customer Approval <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <small>
                    {assetInfo.cRStatus === "GO"
                      ? "Customer approved the loan application."
                      : "Customer did not approve the loan application."}
                  </small>
                </div>
              </span>
            </div>
          )}
          {assetInfo.dealStatus == "VALIDATED" &&
            !assetInfo.cRStatus &&
            user.customerId == assetInfo?.croffer?.customerId && (
              <div style={{ textAlign: "center" }}>
                <GhostButtons
                  onPress={handleReject}
                  label="Reject"
                  disabled={!!loading}
                />
                &nbsp;
                <PrimaryButtons
                  onPress={handleApprove}
                  disabled={
                    !!loading ||
                    validationFlag !== "yes" ||
                    eligibilityFlag !== "yes"
                  }
                  label="Approve"
                />
              </div>
            )}

          {assetInfo.dealStatus == "VALIDATED" &&
            user.customerId == assetInfo?.asset?.customerId && (
              <div style={{ textAlign: "center" }}>
                <GhostButtons
                  onPress={handleReject}
                  label="Reject"
                  disabled={!!loading}
                />
                &nbsp;
                <PrimaryButtons
                  onPress={handleApprove}
                  disabled={
                    !!loading ||
                    validationFlag !== "yes" ||
                    eligibilityFlag !== "yes"
                  }
                  label="Approve"
                />
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default ValidateAsset;
