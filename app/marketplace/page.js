"use client";

import Image from "next/image";
import { Button, Form } from "antd";
import styles from "./page.module.css";
import { Input } from "antd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArkTable from "@/components/tables";

export default function SignIn() {
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

  const rowData = [
    {
      name: "Picasso Painting",
      category: "Fine Art",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
    },
    {
      name: "Vista View",
      category: "Real Estate",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
    },
    {
      name: "XX Bonds",
      category: "Bonds",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
    },
    {
      name: "YY Carbon Credits",
      category: "Carbon Credits",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
    },
    {
      name: "Expensive Painting",
      category: "Fine Art",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
    },
    {
      name: "NY Condo",
      category: "Real Estate",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
    },
    {
      name: "VS Datacenter",
      category: "Datacenter",
      listedDate: "12/09/2023",
      loanAmount: "$60,000",
      tenure: "6 Months",
      return: "8%",
    },
  ];
  return (
    <main>
      <Navbar showPages={true} showUserActions={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "750px",
          }}
        >
          <p className={styles.pageTitle}>Marketplace</p>

          <ArkTable
            title=""
            rowData={rowData}
            hideTitle={true}
            columnData={dataSource}
          />
        </div>
      </div>
    </main>
  );
}
