"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useCallback, useEffect, useState } from "react";
import { Alert, Checkbox, Col, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import axios from "axios";
import {
  formatCurrency,
  getAssetStatus,
  getUserInfo,
  getinterestRateColor,
} from "@/lib/helper";
import { URL_INITIATE_DEAL, URL_VIEW_ASSET } from "@/constants/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ViewAsset = () => {
  const [assetInfo, setAssetInfo] = useState({ paymentTerms: {} });
  const [loading, setLoading] = useState(false);

  const [cashRichOfferId, setCashRichOfferId] = useState(null);

  const getCashrichId = async (customerId) => {
    try {
      const resp = await axios.get(
        "https://prod.defidata.net/defi/api/v1/cashrich/croffer?customerId=" +
          customerId
      );
      setCashRichOfferId(resp.data[0].cashRichOfferId);
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();
  const user = getUserInfo();
  const url = useSearchParams();

  const assetId = url.get("assetId");

  const getAsset = useCallback(async () => {
    if (!assetId) return;

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
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [assetId]);

  const initiateDeal = async () => {
    if (!confirm("Are you sure to request a loan?")) return;
    try {
      const config = {
        method: "POST",
        url: URL_INITIATE_DEAL,
        data: {
          assetId: url.get("assetId"),
          cashRichOfferId: cashRichOfferId,
          interestRate: assetInfo.paymentTerms.rMInterestRate,
          interestType: assetInfo.paymentTerms.rMInterestType,
          duration: assetInfo.paymentTerms.duration,
          interestPayoutCycle: assetInfo.paymentTerms.rMInterestPayoutCycle,
          loanAmount: assetInfo.loanRequested,
          customerId: assetInfo.customer.customerId,
        },
      };
      setLoading(true);
      const resp = await axios(config);
      toast.success(
        "Loan Agreement Requested Successfully and sent for RM validation."
      );
      router.push("/marketplace");
      console.log(resp);
    } catch (error) {
      toast.error("Something went wrong, try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAsset();
    getCashrichId(user.customerId);
  }, [getAsset]);

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
                Account ID
                <p>{assetInfo.accountID || "N/A"}</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Asset Name
                <p>{assetInfo.assetName}</p>
              </label>
            </Col>
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
          <br />
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
                Interest Rates Offered
                <p
                  className={styles.highlight}
                  style={{
                    fontWeight: "bold",
                    color: getinterestRateColor(
                      assetInfo?.paymentTerms?.rMInterestRate
                    ),
                  }}
                >
                  {assetInfo?.paymentTerms?.rMInterestRate}%
                </p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Start date
                <p className={styles.highlight}>
                  {assetInfo?.paymentTerms?.startDate || "N/A"}
                </p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Final Maturity date
                <p className={styles.highlight}>
                  {assetInfo?.paymentTerms?.endDate || "N/A"}
                </p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Validated By
                <p className={styles.highlight}>
                  {assetInfo?.paymentTerms?.manager || "Relationship Manager"}
                </p>
              </label>
            </Col>
          </Row>
          {["rmApproved", "pending"].includes(getAssetStatus(assetInfo)) && (
            <div style={{ marginBottom: "3rem" }}>
              <Alert
                message="Awaiting Approval. Asset not yet validated."
                type="warning"
                showIcon
              />
            </div>
          )}

          {["rejected"].includes(getAssetStatus(assetInfo)) && (
            <div style={{ marginBottom: "3rem" }}>
              <Alert
                message="Asset is not active. Borrow request is rejected by RM"
                type="error"
                showIcon
              />
            </div>
          )}
          {user.customerType != "RM" &&
            assetInfo.eligibility === "true" &&
            assetInfo.customerId != user.customerId && (
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                {/* <GhostButtons
                  onPress={() => setPreviewMode((e) => !e)}
                  label="Cancel"
                />{" "} */}
                &nbsp;
                <PrimaryButtons
                  onPress={initiateDeal}
                  loading={loading}
                  label="Request for Loan Agreement"
                />
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default ViewAsset;
