"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useCallback, useEffect, useState } from "react";
import { Alert, Checkbox, Col, DatePicker, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import { CheckCircleFilled } from "@ant-design/icons";
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
    if (!confirm("Are you sure to reject?")) return;

    e.preventDefault();

    try {
      const config = {
        method: "PUT",
        url: URL_RM_VALIDATE_ASSET,
        data: {
          assetId: url.get("assetId"),
          rMInterestRate: assetInfo.rMInterestRate,
          rMInterestType: "Floating",
          rMDuration: assetInfo?.paymentTerms?.duration,
          rMInterestPayoutCycle: "Half-Yearly",
          rMStatus: "NO-GO",
        },
      };
      setLoading(true);
      const resp = await axios(config);
      toast.success("Loan Agreement Rejected Successfully.");
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

    if (!assetInfo.rMInterestRate) {
      toast.warning("Interest rate is required!");
      return;
    }

    try {
      const config = {
        method: "PUT",
        url: URL_RM_VALIDATE_ASSET,
        data: {
          assetId: url.get("assetId"),
          rMInterestRate: assetInfo.rMInterestRate,
          rMInterestType: "Floating",
          duration: assetInfo?.paymentTerms?.duration,
          rMInterestPayoutCycle: "Half-Yearly",
          rMStatus: "GO",
        },
      };
      setLoading(true);
      const resp = await axios(config);
      toast.success(
        "Loan Agreement approved Successfully and sent for AO acceptance."
      );
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
    getAsset();
  }, [getAsset]);

  console.log(assetInfo);

  return (
    <>
      <Navbar showPages={true} showUserActions={true} />
      <div style={{ backgroundColor: "#EAEBF9" }}>
        <div className={styles.wrapper}>
          <p className={styles.pageTitle}>Borrow Request Application</p>
          <p className={styles.subTitle}>Listing Information</p>

          {assetStatus == "rejected" && (
            <div style={{ marginBottom: "3rem" }}>
              <Alert
                message="This Borrow request is rejected."
                type="error"
                showIcon
              />
            </div>
          )}
          <form name="basic" onSubmit={handleSubmit}>
            <label className={styles.label}>
              Asset Name
              <p>{assetInfo.assetName}</p>
            </label>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Asset Type
                  <p>{assetInfo.assetType}</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Asset Value
                  <p>{formatCurrency(assetInfo.assetPrice)}</p>
                </label>
              </Col>
            </Row>
            <hr style={{ border: "1px solid #d9d9d9" }} />
            <p className={styles.subTitle}>Loan Information</p>
            <Row gutter={20}>
              <Col span={12}>
                <label className={styles.label}>
                  Desired Loan Amount
                  <p>{formatCurrency(assetInfo.loanRequested)}</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Loan Tenure
                  <p>{assetInfo?.paymentTerms?.duration || 0} months</p>
                </label>
              </Col>
              <Col span={12}>
                <label className={styles.label}>
                  Interest Rates Offered*
                  <Input
                    disabled={assetStatus !== "pending"}
                    style={{ margin: "8px 0 24px 0" }}
                    onChange={handleAssetInfoChange}
                    name="rMInterestRate"
                    value={assetInfo.rMInterestRate}
                    type="number"
                  />
                </label>
              </Col>

              <Col span={12}>
                <label className={styles.label}>
                  Start date*
                  <div style={{ margin: "8px 0 24px 0" }}>
                    <Input
                      disabled={assetStatus !== "pending"}
                      // onChange={handleAssetInfoChange}
                      name="startDate"
                      // value={assetInfo.name}
                      type="date"
                    />
                  </div>
                </label>
              </Col>

              <Col span={12}>
                <label className={styles.label}>
                  Final Maturity date*
                  <div style={{ margin: "8px 0 24px 0" }}>
                    <Input
                      disabled={assetStatus !== "pending"}
                      // onChange={handleAssetInfoChange}
                      name="endDate"
                      // value={assetInfo.name}
                      type="date"
                    />
                  </div>
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
            <div className={[styles.progressIcons, styles.lastElem].join(" ")}>
              <ArkBadge label="3" />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>
                Asset Value <br />
                <small>Validate asset Value</small>
              </span>
            </div>

            {assetStatus == "pending" && (
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
                  label="Approve"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ValidateAsset;
