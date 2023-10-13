"use client";

import Image from "next/image";
import { Button, Form } from "antd";
import styles from "./page.module.css";
import { Input } from "antd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArkTable from "@/components/tables";
import ArkCharts from "@/components/Charts";

export default function RMDashboard() {
  const dataSource = [
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
      title: "Listed Date",
      dataIndex: "listedDate",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmount",
    },
    {
      title: "Tenure",
      dataIndex: "tenure",
    },
    {
      title: "Return (P.A)",
      dataIndex: "return",
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
            maxWidth: "750px",
          }}
        >
          <p className={styles.pageTitle}>Hello, Relationship Manager</p>

          <div
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
          </div>

          <div
            style={{
              border: "1px solid #707DD4",
              borderRadius: "8px",
              backgroundColor: "white",
              flexGrow: "1",
              padding: "32px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <div style={{ width: "52%" }}>
                <p className={styles.bannerLabel}>Revenue for XX Bank</p>
                <p className={styles.bannerValue}>SGD 10,694.36</p>
              </div>

              <div>
                <p className={styles.bannerLabel}>Revenue for XX Bank</p>
                <p className={styles.bannerValue}>SGD 10,694.36</p>
              </div>
            </div>
            <div style={{ height: "300px" }}>
              <ArkCharts />
            </div>
          </div>

          <ArkTable
            title="Listings Application"
            rowData={rowData}
            columnData={dataSource2}
          />
          <ArkTable
            title="Loan Agreement Applications"
            rowData={rowData}
            columnData={dataSource}
          />
        </div>
      </div>
    </main>
  );
}
