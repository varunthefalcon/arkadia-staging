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
import { URL_RM_VALIDATE_ASSET, URL_VIEW_ASSET } from "@/constants/config";
import axios from "axios";
import { formatCurrency, getAssetStatus } from "@/lib/helper";

const ValidateAsset = () => {
  const [assetInfo, setAssetInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [eligibilityFlag, setEligibilityFlag] = useState("no"); // yes, loading
  const [assetStatus, setAssetStatus] = useState("");

  const url = useSearchParams();
  const router = useRouter();

  const assetId = url.get("assetId");

  const updateEligibility = () => {
    setEligibilityFlag("loading");
    setTimeout(() => {
      setEligibilityFlag("yes");
    }, 2000);
  };

  const getAsset = useCallback(async () => {
    if (!assetId) {
      router.push("/rm/dashboard");
      return;
    }

    try {
      const config = {
        url: URL_VIEW_ASSET + assetId,
        method: "GET",
      };
      const resp = await axios(config);

      setAssetInfo({
        paymentTerms: {},
        ...(resp.data || {}),
        assetType: resp.data?.category?.categoryName,
        rMInterestRate: resp?.data?.paymentTerms?.rMInterestRate,
      });

      const assetStatus = getAssetStatus(resp.data);

      setAssetStatus(assetStatus);
    } catch (error) {
      console.error(error);
    }
  }, [assetId]);

  const handleReject = async (e) => {
    e.preventDefault();
    if (!confirm("Are you sure to reject?")) return;
    try {
      const config = {
        method: "PUT",
        url: URL_RM_VALIDATE_ASSET,
        data: {
          cashRichOfferId: url.get("aoID"),
          rMInterestRate: 5.8,
          rMInterestType: "Floating",
          rMDuration: 10,
          rMInterestPayoutCycle: "Half-Yearly",
          rMStatus: "NO-GO",
        },
      };
      setLoading(true);
      const resp = await axios(config);
      toast.success("Investor approved Successfully.");
      router.push("/rm/dashboard");
      console.log(resp);
    } catch (error) {
      toast.error("Something went wrong, try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirm("Are you sure to approve?")) return;

    try {
      const config = {
        method: "PUT",
        url: URL_RM_VALIDATE_ASSET,
        data: {
          cashRichOfferId: url.get("aoID"),
          rMInterestRate: 5.8,
          rMInterestType: "Floating",
          rMDuration: 10,
          rMInterestPayoutCycle: "Half-Yearly",
          rMStatus: "GO",
        },
      };
      setLoading(true);
      const resp = await axios(config);
      toast.success("Investor approved Successfully.");
      router.push("/rm/dashboard");
      console.log(resp);
    } catch (error) {
      toast.error("Something went wrong, try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssetInfoChange = (e = {}) => {
    const { value, name } = e.target || {};

    setAssetInfo((info) => ({ ...info, [name]: value }));
  };

  useEffect(() => {
    // getAsset();
  }, [getAsset]);

  console.log(assetInfo);

  return (
    <>
      <Navbar showPages={true} showUserActions={true} />
      <div style={{ backgroundColor: "#EAEBF9" }}>
        <div className={styles.wrapper}>
          <p className={styles.pageTitle}>New Investor Application</p>
          <p className={styles.subTitle}>Listing Information</p>

          <form name="basic" onSubmit={handleSubmit}>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Account ID
                  <p>{assetInfo.assetName || "John Doe"}</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Asset Value
                  <p>{formatCurrency(url.get("amount") || 500000)}</p>
                </label>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #d9d9d9" }} />
            <p className={styles.subTitle}>Loan Information</p>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Name of Bank
                  <p>ABC Bank</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Account Number
                  <p>234-111-734</p>
                </label>
              </Col>
            </Row>

            <hr style={{ border: "1px solid #d9d9d9" }} />

            <p className={styles.subTitle}>Approval Process</p>

            <div className={styles.progressIcons}>
              <CheckCircleFilled
                style={{ fontSize: "32px", color: "#1027B8" }}
              />{" "}
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
                Eligibility <br />
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
                      disabled={assetStatus !== "pending"}
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
                      disabled={assetStatus !== "pending"}
                      onPress={updateEligibility}
                    />
                  </div>
                )}
                {eligibilityFlag === "yes" && (
                  <small>
                    Bank account checked and verified. Interest rates and
                    validity checked.
                  </small>
                )}
              </span>
            </div>
            {assetStatus === "rmApproved" && (
              <div className={[styles.progressIcons].join(" ")}>
                <CheckCircleFilled
                  style={{ fontSize: "32px", color: "#1027B8" }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  RM Validated <br />
                  <small>RM validated this borrow listing</small>
                </span>
              </div>
            )}
            {assetStatus === "customerRejected" && (
              <div className={[styles.progressIcons].join(" ")}>
                <ExclamationCircleFilled
                  style={{ fontSize: "32px", color: "#DB1F28" }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  Customer Validation <br />
                  <small>Customer has rejected this borrow listing</small>
                </span>
              </div>
            )}
            {assetStatus === "rmRejected" && (
              <div className={[styles.progressIcons].join(" ")}>
                <ExclamationCircleFilled
                  style={{ fontSize: "32px", color: "#DB1F28" }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>
                  RM Validation <br />
                  <small>RM has rejected this borrow listing</small>
                </span>
              </div>
            )}

            <div style={{ textAlign: "center" }}>
              <GhostButtons
                onPress={handleReject}
                label="Reject"
                disabled={!!loading}
              />
              &nbsp;
              <PrimaryButtons
                onPress={handleSubmit}
                disabled={!!loading}
                // type="submit"
                loading={!!loading}
                label="Approve"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ValidateAsset;
