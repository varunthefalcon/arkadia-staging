"use client";

import Image from "next/image";
import { Button, Form } from "antd";
import styles from "./page.module.css";
import { Input } from "antd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArkTable from "@/components/tables";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_LIST_VALIDATED_ASSET } from "@/constants/config";
import { formatCurrency } from "@/lib/helper";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [listings, setListings] = useState([]);
  const [apiFlag, setAPIFlag] = useState(false);
  const navigate = useRouter();

  const dataSource = [
    {
      title: "Listing name",
      dataIndex: "assetName",
      // sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      sorter: (a, b) => a.category - b.category,
    },
    {
      title: "Asset Price",
      dataIndex: "assetPrice",
      sorter: (a, b) => a.date - b.date,
      render: (text) => formatCurrency(text),
    },
    // {
    //   title: "Listed Date",
    //   dataIndex: "listedDate",
    //   sorter: (a, b) => a.date - b.date,
    // },
    {
      title: "Loan Amount",
      dataIndex: "loanRequested",
    },
    {
      title: "Tenure",
      dataIndex: "tenure",
    },
    {
      title: "Return (P.A)",
      dataIndex: "interestRate",
    },
  ];

  async function getListings() {
    try {
      const config = {
        method: "GET",
        url: URL_LIST_VALIDATED_ASSET,
      };
      setAPIFlag(true);
      const resp = await axios(config);
      setListings(
        resp.data.map((e) => ({
          ...e,
          tenure: e.paymentTerms.duration,
          interestRate: e.paymentTerms.rMInterestRate,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setAPIFlag(false);
    }
  }

  useEffect(() => {
    getListings();
  }, []);

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
            rowData={listings}
            onRow={(record) => {
              return {
                onClick: () => {
                  navigate.push("/asset/view?assetId=" + record.assetId);
                },
              };
            }}
            hideTitle={true}
            columnData={dataSource}
          />
        </div>
      </div>
    </main>
  );
}
