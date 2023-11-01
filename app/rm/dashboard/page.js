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
import { RenderStatus, formatCurrency, formatDate } from "@/lib/helper";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import GhostButtons from "@/components/Buttons/GhostButtons";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_FETCH_PENDING_ASSETS } from "@/constants/config";
import { useRouter } from "next/navigation";

export default function RMDashboard() {
  const [unApprovedAssets, setUnApprovedAssets] = useState([]);
  // const [unApprovedAssets, setUnApprovedAssets] = useState([])
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
      render: (text) => <span>{text}%</span>,
    },
    {
      title: "Status",
      dataIndex: "eligibility",
      render: (text) => (
        <span>
          <RenderStatus status={text === "false" ? "pending" : "success"} />
        </span>
      ),
    },
  ];
  const dataSource2 = [
    {
      title: "Listing name",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category - b.category,
    },
    {
      title: "Date",
      dataIndex: "listedDate",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const rowData = [
    {
      name: "Picasso Painting",
      category: "Fine Art",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
      status: "Pending",
    },
    {
      name: "Vista View",
      category: "Real Estate",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
      status: "Pending",
    },
    {
      name: "XX Bonds",
      category: "Bonds",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
      status: "Pending",
    },
    {
      name: "YY Carbon Credits",
      category: "Carbon Credits",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
      status: "Pending",
    },
  ];

  const getUnapprovedAssets = async () => {
    const config = {
      url: URL_FETCH_PENDING_ASSETS,
      method: "GET",
    };

    try {
      const resp = await axios(config);

      setUnApprovedAssets(
        resp.data.map((e) => ({
          ...e,
          categoryName: e.category.categoryName,
          tenure: e.paymentTerms?.duration,
          return: e.paymentTerms?.rMInterestRate,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUnapprovedAssets();
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
          <p className={styles.pageTitle}>Hello, Relationship Manager</p>
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
            rowData={rowData}
            columnData={dataSource2}
          />
        </div>
      </div>
    </main>
  );
}
