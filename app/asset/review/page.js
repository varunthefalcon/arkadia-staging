"use client";

import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { useCallback, useState, useEffect } from "react";
import { Alert, Checkbox, Col, Input, Row, Select } from "antd";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  URL_AO_APPROVE_REJECT_ASSET,
  URL_RM_VALIDATE_ASSET,
  URL_VIEW_ASSET,
} from "@/constants/config";
import axios from "axios";
import { formatCurrency } from "@/lib/helper";

const ReviewAsset = () => {
  const [assetInfo, setAssetInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [eligibilityFlag, setEligibilityFlag] = useState("no"); // yes, loading

  const url = useSearchParams();
  const router = useRouter();

  const assetId = url.get("assetId");

  const rejectOffer = () => {
    if (!confirm("Are you sure to reject?")) return;

    setLoading("reject");
    setTimeout(() => {
      updateAssetStatus("NO-GO");
    }, 2000);
  };

  const acceptOffer = () => {
    if (!confirm("Are you sure to accept?")) return;

    setLoading("accept");
    setTimeout(() => {
      updateAssetStatus("GO");
    }, 2000);
  };

  const updateAssetStatus = async (status) => {
    const config = {
      method: "PUT",
      url: URL_AO_APPROVE_REJECT_ASSET + assetId,
      params: {
        customerStatus: status,
      },
    };
    try {
      await axios(config);
      toast.success(
        `Asset ${status === "GO" ? "accepted" : "rejected"} Successfully`
      );
      router.push("/ao/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getAsset = useCallback(async () => {
    if (!assetId) {
      router.push("/ao/dashboard");
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
        interestRate: assetInfo.paymentTerms.rMInterestRate,
        interestType: assetInfo.paymentTerms.rMInterestType,
        duration: assetInfo.paymentTerms.duration,
        interestPayoutCycle: assetInfo.paymentTerms.rMInterestPayoutCycle,
        loanAmount: assetInfo.loanRequested,
      });
    } catch (error) {
      console.error(error);
    }
  }, [assetId]);

  useEffect(() => {
    getAsset();
  }, [getAsset]);

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
          <p className={styles.subTitle}>Listing Information</p>
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
                <p className={styles.highlight}>{assetInfo.interestRate}%</p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Start date
                <p className={styles.highlight}>14-10-2023</p>
              </label>
            </Col>
            <Col span={12}>
              <label className={styles.label}>
                Final Maturity date
                <p className={styles.highlight}>14-10-2023</p>
              </label>
            </Col>

            <Col span={12}>
              <label className={styles.label}>
                Validated By
                <p className={styles.highlight}>Relation manager</p>
              </label>
            </Col>
          </Row>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <GhostButtons
              disabled={!!loading}
              loading={loading === "reject"}
              onPress={rejectOffer}
              label="Reject"
            />{" "}
            &nbsp;
            <PrimaryButtons
              disabled={!!loading}
              loading={loading === "accept"}
              onPress={acceptOffer}
              label="Accept and List on Marketplace"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewAsset;
