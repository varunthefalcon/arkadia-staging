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
import {
  formatCurrency,
  formatDate,
  getUserInfo,
  getinterestRateColor,
} from "@/lib/helper";
import { useRouter } from "next/navigation";
import FilterInput from "@/components/FilterButton/FilterInput";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";

export default function Marketplace() {
  const [listings, setListings] = useState([]);
  const [assetTypes, setAssetTypes] = useState([]);
  const [apiFlag, setAPIFlag] = useState(false);
  const user = getUserInfo();
  const [windowWidth, setWindowWidth] = useState(900);

  // const dataSource = [
  //   {
  //     title: "Listing name",
  //     dataIndex: "assetName",
  //     // sorter: (a, b) => a.name - b.name,
  //   },
  //   {
  //     title: "Category",
  //     dataIndex: "categoryName",
  //     sorter: (a, b) => a.category - b.category,
  //   },
  //   {
  //     title: "Asset Price",
  //     dataIndex: "assetPrice",
  //     sorter: (a, b) => a.date - b.date,
  //     render: (text) => formatCurrency(text),
  //   },
  //   {
  //     title: "Listed Date",
  //     dataIndex: "createdOn",
  //     render: (text) => <span>{text.split("T")[0]}</span>,
  //     sorter: (a, b) => a.date - b.date,
  //   },
  //   {
  //     title: "Loan Amount",
  //     dataIndex: "loanRequested",
  //     render: (text) => formatCurrency(loanRequested),
  //   },
  //   {
  //     title: "Tenure",
  //     dataIndex: "tenure",
  //     render: (text) => <span>{text} months</span>,
  //   },
  //   {
  //     title: "Return (P.A)",
  //     dataIndex: "interestRate",
  //     render: (text) => (
  //       <b
  //         style={{
  //           color: getinterestRateColor(text),
  //         }}
  //       >
  //         {text}%
  //       </b>
  //     ),
  //   },
  // ];

  async function getListings() {
    try {
      const config = {
        method: "GET",
        url: URL_LIST_VALIDATED_ASSET,
      };
      setAPIFlag(true);
      const resp = await axios(config);
      const allListings = resp.data
        .map((e) => ({
          ...e,
          tenure: e.paymentTerms.duration,
          interestRate: e.paymentTerms.rMInterestRate,
          categoryName: e.category.categoryName,
        }))
        .filter((e) => e.customerId != user.customerId)
        .reverse();
      setListings(allListings);
      const uniqueTypes = new Set(allListings.map((e) => e.categoryName));
      setAssetTypes([...uniqueTypes]);
    } catch (error) {
      console.error(error);
    } finally {
      setAPIFlag(false);
    }
  }

  useEffect(() => {
    getListings();
    setWindowWidth(window.screen.availWidth);
  }, []);

  return (
    <main>
      <Navbar showPages={true} showUserActions={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#0A1767",
          color: "white",
          position: "relative",
        }}
      >
        <Image
          src="/assets/marketplace_waves.png"
          alt="Next.js subtitle"
          style={{
            position: "absolute",
            clipPath: "inset(50px 0 0 0)",
            top: -50,
            right: 0,
            paddingTop: "4px",
            marginLeft: "10px",
            overflow: "hidden",
          }}
          height={500}
          width={windowWidth}
          priority
        />
        <div
          style={{
            width: "100%",
            maxWidth: "940px",
          }}
        >
          <p className={styles.pageTitle}>
            Secure loans <br /> Connect investors
          </p>

          <p className={styles.pageSubTitle}>
            Bridge opportunity and capital by using assets as collateral to
            connect
            <br /> professional investors with the resources you need
          </p>

          <br />

          <FilterInput assetTypes={assetTypes} />

          <b>Featured Assets</b>
          <br />
          <br />
          {listings.map((item) => (
            <AssetItem key={item.assetId} asset={item} />
          ))}
        </div>
      </div>
    </main>
  );
}

const AssetItem = ({ asset = {} }) => {
  const navigate = useRouter();

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          border: "8px",
          padding: "20px",
          marginBottom: "20px",
          color: "black",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <VerticalLabelValues
            label={asset.categoryName}
            value={asset.assetName}
          />
          <div>
            <PrimaryButtons
              label="View"
              onPress={() => {
                navigate.push("/asset/view?assetId=" + asset.assetId);
              }}
            />
          </div>
        </div>
        <p style={{ fontSize: "13px", padding: "8px 0" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vulputate
          sem at lectus fringilla consectetur. Sed vel purus leo. Donec nec
          venenatis arcu. Aliquam aliquam nibh at mi commodo commodo.
        </p>
        <hr style={{ margin: "10px  0" }} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <VerticalLabelValues
            label="Loan Amount"
            value={formatCurrency(asset.loanRequested)}
          />
          <VerticalLabelValues
            label="Returns"
            comp={
              <p
                style={{
                  fontWeight: "bold",
                  color: getinterestRateColor(asset?.interestRate),
                }}
              >
                {asset.interestRate + "%"}
              </p>
            }
          />
          <VerticalLabelValues
            label="Tenure"
            value={asset.tenure + " months"}
          />
          <VerticalLabelValues
            label="Listed Date"
            value={formatDate(asset?.createdOn)}
          />
        </div>
      </div>
    </>
  );
};

const VerticalLabelValues = ({ label = "", value = "", comp = null }) => {
  return (
    <div>
      <p className={styles.label}>{label}</p>
      {!!value && <p className={styles.value}>{value}</p>}
      {comp}
    </div>
  );
};
