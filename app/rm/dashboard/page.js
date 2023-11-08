"use client";

import Image from "next/image";
import { Button, Form } from "antd";
import styles from "./page.module.css";
import { Input } from "antd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArkTable from "@/components/tables";
import ArkCharts from "@/components/Charts";
import PieChartComp from "@/components/Analytics/PieChart";
import TwoColStrip from "@/components/Analytics/TwoColStrip";
import {
  RenderStatus,
  formatCurrency,
  formatDate,
  getAssetStatus,
  getUserLabel,
  getinterestRateColor,
} from "@/lib/helper";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_FETCH_DEALS, URL_FETCH_PENDING_ASSETS } from "@/constants/config";
import { useRouter } from "next/navigation";

export default function RMDashboard() {
  const [unApprovedAssets, setUnApprovedAssets] = useState([]);
  const [initiatedDeals, setInitiatedDeals] = useState([]);
  const [activeDeals, setActiveDeals] = useState([]);
  const [newActiveFlag, setNewActiveFlag] = useState("new");
  // const [unApprovedAssets, setUnApprovedAssets] = useState([])
  const router = useRouter();

  const dataSource = [
    {
      title: "Listing name",
      dataIndex: "assetName",
      sorter: (a, b) => a.assetName - b.assetName,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      sorter: (a, b) => a.categoryName - b.categoryName,
    },
    {
      title: "Listed Date",
      dataIndex: "createdOn",
      sorter: (a, b) => a.date - b.date,
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Loan Amount",
      dataIndex: "loanRequested",
      render: (text) => <span>{formatCurrency(text)}</span>,
    },
    {
      title: "Tenure",
      dataIndex: "tenure",
      render: (text) => <span>{text} months</span>,
    },
    {
      title: "Return (P.A)",
      dataIndex: "return",
      render: (text) => (
        <b style={{ color: getinterestRateColor(text) }}>{text}%</b>
      ),
    },
    {
      title: "Status",
      dataIndex: "eligibility",
      render: (_, data) => {
        return (
          <span>
            <RenderStatus status={getAssetStatus(data)} />
          </span>
        );
      },
    },
  ];

  const dataSource2 = [
    {
      title: "Asset",
      dataIndex: "assetName",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Start Date",
      dataIndex: "createdOn",
      render: (text) => <span>{text.split("T")[0]}</span>,
      sorter: (a, b) => a.category - b.category,
    },
    {
      title: "End Date",
      dataIndex: "expiryDate",
      render: (text) => <span>{text.split("T")[0]}</span>,
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Amount",
      dataIndex: "loanAmount",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Yield",
      dataIndex: "interestRate",
      render: (text) => (
        <b style={{ color: getinterestRateColor(text) }}>{text}%</b>
      ),
    },
    {
      title: "Status",
      dataIndex: "dealStatus",
      render: (text, data) => {
        return (
          <span>
            <RenderStatus status={text} />
          </span>
        );
      },
    },
  ];

  const getInitiatedDeals = async () => {
    const config = {
      url: URL_FETCH_DEALS,
      method: "GET",
      params: { dealStatus: "INITIATED" },
    };

    try {
      const resp = await axios(config);
      setInitiatedDeals(
        resp.data
          .map((e) => ({
            ...e,
            assetName: e.asset.assetName,
            categoryName: e?.asset?.category?.categoryName,
          }))
          .reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getActiveDeals = async () => {
    const config = {
      url: URL_FETCH_DEALS,
      method: "GET",
      params: { dealStatus: "ACTIVE" },
    };

    try {
      const resp = await axios(config);
      setActiveDeals(
        resp.data
          .map((e) => ({
            ...e,
            assetName: e.asset.assetName,
            categoryName: e?.asset?.category?.categoryName,
          }))
          .reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getUnapprovedAssets = async () => {
    const config = {
      url: URL_FETCH_PENDING_ASSETS,
      method: "GET",
    };

    try {
      const resp = await axios(config);

      setUnApprovedAssets(
        resp.data
          .map((e) => ({
            ...e,
            categoryName: e.category.categoryName,
            tenure: e.paymentTerms?.duration,
            return: e.paymentTerms?.rMInterestRate,
          }))
          .reverse()
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUnapprovedAssets();
    getInitiatedDeals();
    getActiveDeals();
  }, []);

  console.log(unApprovedAssets);

  return (
    <main>
      <Navbar showPages={true} showUserActions={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#EAEBF9",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "940px",
          }}
        >
          <p className={styles.pageTitle}>Hello, {getUserLabel()}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "64%" }}>
              <b style={{ marginBottom: "10px", display: "block" }}>
                Quick Analytics
              </b>
              <TwoColStrip
                title1={"Total bank fees (Past 12 Months)"}
                title2={"Aggregated Outstanding Loan"}
                subTitle1={formatCurrency(7000)}
                subTitle2={formatCurrency(540000)}
                style={{ marginBottom: "10px" }}
                bgColor="#F8F8FD"
                fontColor="black"
                borderColor="#EAEBF9"
              />
              <TwoColStrip
                key={2}
                title1={"Active Clients"}
                title2={"Active Loans"}
                subTitle1={"35/40"}
                subTitle2={"10"}
                bgColor="#F8F8FD"
                fontColor="black"
                borderColor="#EAEBF9"
              />
            </div>
            <div
              style={{
                width: "34%",
              }}
            >
              <div
                style={{
                  height: "calc(100% - 30px)",
                }}
              >
                <b style={{ marginBottom: "10px", display: "block" }}>
                  Asset Distribution
                </b>
                <div
                  style={{
                    backgroundColor: "#F8F8FD",
                    height: "100%",
                    borderRadius: "8px",
                  }}
                >
                  <PieChartComp />
                </div>
              </div>
            </div>
          </div>
          <>
            {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
              marginBottom: "32px",
              gap: "20px",
            }}
          >
            <div
              style={{
                border: "1px solid #707DD4",
                borderRadius: "8px",
                backgroundColor: "white",
                flexGrow: "1",
                padding: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className={styles.bannerLabel}>Total Clients</p>
                  <p className={styles.bannerValue}>24</p>
                </div>
                <Image
                  src="/assets/RM Dasboard 1.png"
                  alt="Next.js subtitle"
                  style={{ paddingTop: "4px", marginLeft: "10px" }}
                  height={82}
                  width={84}
                  priority
                />
              </div>
            </div>
            <div
              style={{
                border: "1px solid #707DD4",
                borderRadius: "8px",
                backgroundColor: "white",
                flexGrow: "1",
                padding: "32px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p className={styles.bannerLabel}>Active Loan Agreement</p>
                  <p className={styles.bannerValue}>10</p>
                  <p>
                    Previous Month{" "}
                    <span className={styles.bannerLabel}>15</span>
                  </p>
                </div>
                <Image
                  src="/assets/RM Dasboard 2.png"
                  alt="Next.js subtitle"
                  style={{ paddingTop: "4px", marginLeft: "10px" }}
                  height={82}
                  width={84}
                  priority
                />
              </div>
            </div>
          </div> */}
          </>

          <br />
          <p>
            <b>Charts</b>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "15px",
              margin: "15px 0 10px 0",
            }}
          >
            <PrimaryButtons
              labelStyle={{ fontWeight: "bold" }}
              label="Aggregated Clients Cash Inflow"
            />
            <GhostButtons
              labelStyle={{ fontWeight: "bold" }}
              label="Client Loan Maturity"
            />
          </div>
          <div
            style={{
              border: "1px solid #707DD4",
              borderRadius: "8px",
              backgroundColor: "white",
              padding: "32px",
              marginBottom: "32px",
            }}
          >
            <div style={{ width: "52%" }}>
              <p className={styles.bannerLabel}>Revenue for the Bank</p>
              <p className={styles.bannerValue}>SGD 10,694.36</p>
            </div>
            <div style={{ height: "300px" }}>
              <ArkCharts />
            </div>
          </div>

          <ArkTable
            title="Listings Application"
            rowData={unApprovedAssets}
            columnData={dataSource}
            onRow={(record) => {
              return {
                onClick: () => {
                  router.push("/rm/validate-asset?assetId=" + record.assetId);
                },
              };
            }}
          />
          <ArkTable
            title="Loan Agreement Applications"
            rowData={newActiveFlag === "new" ? initiatedDeals : activeDeals}
            columnData={dataSource2}
            secondlineContent={
              <div
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  paddingLeft: "20px",
                }}
              >
                <span
                  className={[
                    styles.table_subitem,
                    newActiveFlag === "new" ? styles.active_table_subitem : "",
                  ].join(" ")}
                  onClick={() => setNewActiveFlag("new")}
                >
                  New
                </span>
                <span
                  className={[
                    styles.table_subitem,
                    newActiveFlag === "active"
                      ? styles.active_table_subitem
                      : "",
                  ].join(" ")}
                  onClick={() => setNewActiveFlag("active")}
                >
                  Active
                </span>
              </div>
            }
            onRow={(record) => {
              return {
                onClick: () => {
                  router.push("/rm/validate-loan?loan=" + record.dealId);
                },
              };
            }}
          />
        </div>
      </div>
    </main>
  );
}
