"use client";

import Image from "next/image";
import { Alert, Button, Form, Modal, Table } from "antd";
import styles from "./page.module.css";
import { Input, Checkbox } from "antd";
import ArkTable from "@/components/tables";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import PrimaryButtons from "@/components/Buttons/PrimaryButtons";
import { useRouter } from "next/navigation";
import {
  URL_AO_LIST_ASSET,
  URL_AO_REQUEST_INVESTOR,
  URL_FETCH_DEALS,
} from "@/constants/config";
import {
  RenderStatus,
  formatCurrency,
  getAssetStatus,
  getUserDetails,
  getUserInfo,
  getUserLabel,
  setUserDetails,
} from "@/lib/helper";
import axios from "axios";
import TwoColStrip from "@/components/Analytics/TwoColStrip";
import PieChartComp from "@/components/Analytics/PieChart";
import AuthComp from "@/components/auth";

export default function Dashboard() {
  const dataSource = [
    {
      title: "Listing name",
      dataIndex: "assetName",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Asset Price",
      dataIndex: "assetPrice",
      sorter: (a, b) => a.date - b.date,
      render: (text) => formatCurrency(text),
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      sorter: (a, b) => a.category - b.category,
    },
    {
      title: "Listed Date",
      dataIndex: "createdOn",
      render: (text) => <span>{text.split("T")[0]}</span>,
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Loan Amount",
      dataIndex: "loanRequested",
      render: (text) => formatCurrency(text),
    },
    {
      title: "Tenure",
      dataIndex: "tenure",
      render: (text) => <span>{text} months</span>,
    },
    {
      title: "Status",
      dataIndex: "eligibility",
      render: (text, data) => {
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
      // render: (text) => formatCurrency(text),
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
      render: (text) => <span>{text} months</span>,
    },
    {
      title: "Status",
      dataIndex: "dealStatus",
      render: (text, data) => {
        console.log(text);

        const getStatus = (text, data) => {
          if (text === "true") {
            return "listed";
          } else if (data?.paymentTerms?.rMStatus === "NO-GO") {
            return "rejected";
          } else if (data?.paymentTerms?.rMStatus === "GO") {
            return "rmApproved";
          }

          return "pending";
        };

        return (
          <span>
            <RenderStatus status={text} />
          </span>
        );
      },
    },
  ];

  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [investAmountSubmitFlag, setInvestAmountSubmitFlag] = useState(false);
  const [assetRows, setAssetRows] = useState([]);
  const [deals, setDeals] = useState([]);
  const [windowWidth, setWindowWidth] = useState(900);

  const router = useRouter();
  const user = getUserInfo();

  const investAmountRef = useRef();

  const handleApplyToInvestor = () => {
    setInputModalOpen(true);
  };

  const handleInvestAmountSubmit = async () => {
    setInvestAmountSubmitFlag(true);

    const config = {
      url: URL_AO_REQUEST_INVESTOR + user.customerId,
      params: {
        investAmount: investAmountRef.current.input.value,
      },
      method: "PUT",
    };

    try {
      await axios(config);
    } catch (error) {
      console.error(error);
    } finally {
      setUserDetails("isInvestor", true);
      setUserDetails("isInvestorAmount", investAmountRef.current.input.value);
      setInputModalOpen(false);
      setAlertModalOpen(true);
      setInvestAmountSubmitFlag(false);
    }
  };

  const getListings = async () => {
    const config = {
      url: URL_AO_LIST_ASSET,
      method: "GET",
      params: { customerId: user.customerId },
    };

    try {
      const resp = await axios(config);
      setAssetRows(
        resp.data
          .map((e) => ({
            ...e,
            tenure: e.paymentTerms.duration,
            interestRate: e.paymentTerms.rMInterestRate,
            categoryName: e.category.categoryName,
          }))
          .reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDeals = async () => {
    const config = {
      url:
        user.customerType === "AO"
          ? "https://prod.defidata.net/defi/api/v1/deal/fetchdeal/" +
            user.customerId +
            "/asset"
          : "https://prod.defidata.net/defi/api/v1/deal/fetchdeal/" +
            user.customerId +
            "/cashRich",
      method: "GET",
    };

    try {
      const resp = await axios(config);
      setDeals(
        resp.data
          .map((e) => ({
            ...e,
            assetName: e?.asset?.assetName,
            categoryName: e?.asset?.category?.categoryName,

            // tenure: e.paymentTerms.duration,
            // interestRate: e.paymentTerms.rMInterestRate,
            // categoryName: e.category.categoryName,
          }))
          .reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const isInvestorApproved = getUserDetails("isInvestor");

  useEffect(() => {
    getListings();
    getDeals();
    setWindowWidth(window.screen.availWidth);
  }, []);

  return (
    <main>
      <AuthComp />

      <Navbar showPages={true} showUserActions={true} />
      {!isInvestorApproved && user.customerType == "AO" && (
        <div
          style={{
            position: "relative",
          }}
        >
          <Image
            src="/assets/InvestPic2.png"
            alt="Next.js InvestPic"
            style={{
              position: "absolute",
              height: "100%",
              paddingTop: "4px",
              right: 0,
              marginLeft: "10px",
            }}
            width={windowWidth / 1.4}
            height={300}
            priority
          />
          <div
            className={styles.banner}
            style={{
              // position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "50px",
            }}
          >
            <div style={{ zIndex: 4 }}>
              <p className={styles.banner_title}>You can be an investor too</p>
              <p className={styles.banner_sub_title}>
                Get validated and start investing now.
              </p>
              <Button
                className={styles.landing_button}
                ghost
                type="primary"
                onClick={handleApplyToInvestor}
              >
                <span style={{ color: "#0a1767" }}>
                  Apply to be an Investor
                  <Image
                    src="/assets/landing_arrow_subtitle.png"
                    alt="Next.js subtitle"
                    style={{ paddingTop: "4px", marginLeft: "10px" }}
                    height={12}
                    width={12}
                    priority
                  />
                </span>
              </Button>
            </div>
            <div style={{ width: "425px" }}>
              <p>&nbsp;</p>
            </div>
            {/* <div style={{  }}> */}

            {/* </div> */}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor:
            !isInvestorApproved && user.customerType == "AO"
              ? "white"
              : "#EAEBF9",
        }}
      >
        {isInvestorApproved && (
          <Image
            src="/assets/Waves 3.png"
            alt="Next.js subtitle"
            style={{
              position: "absolute",
              clipPath: "inset(50px 0 0 0)",
              top: 0,
              right: 0,
              paddingTop: "4px",
              marginLeft: "10px",
              overflow: "hidden",
              zIndex: 0,
            }}
            height={500}
            width={windowWidth}
            priority
          />
        )}
        <div
          style={{
            width: "100%",
            maxWidth: "940px",
            zIndex: 2,
          }}
        >
          {isInvestorApproved && (
            <>
              <br />
              <br />
              <Alert
                type="success"
                message="Your application as an investor has been validated. You can start investing now."
                showIcon
                closable
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                  margin: "32px 0",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    border: "1px solid #707DD4",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    backgroundColor: "#0A1767",
                    flexGrow: "1",
                    position: "relative",
                    color: "white",
                    padding: "32px",
                  }}
                >
                  <div>
                    <div>
                      <p className={styles.bannerLabel}>
                        Total Amount Invested
                      </p>
                      <p className={styles.bannerValue}>$100,000</p>
                    </div>
                    <Image
                      src="/assets/InvestPic_2.png"
                      alt="Next.js subtitle"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        paddingTop: "4px",
                        marginLeft: "10px",
                      }}
                      // height={82}
                      // width={125}
                      fill
                      priority
                    />
                  </div>
                </div>
                <div
                  style={{
                    border: "1px solid #707DD4",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    backgroundColor: "#0A1767",
                    flexGrow: "1",
                    color: "white",
                    padding: "32px",
                    position: "relative",
                  }}
                >
                  <div>
                    <div>
                      <p className={styles.bannerLabel}>
                        Active Loan Agreement
                      </p>
                      <p className={styles.bannerValue}>-</p>
                    </div>
                    <Image
                      src="/assets/InvestPic_1.png"
                      alt="Next.js subtitle"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        paddingTop: "4px",
                        marginLeft: "10px",
                      }}
                      fill
                      priority
                    />
                  </div>
                </div>
              </div>
            </>
          )}
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
              <br />
              <TwoColStrip
                title1={"Outstanding Loan Amount"}
                title2={"Amount Invested"}
                subTitle1={formatCurrency(20000)}
                subTitle2={formatCurrency(
                  assetRows.reduce((a, e) => a + e.loanRequested, 0)
                )}
                style={{ marginBottom: "10px" }}
                bgColor={
                  !isInvestorApproved && user.customerType == "AO"
                    ? undefined
                    : "#F8F8FD"
                }
                fontColor={
                  !isInvestorApproved && user.customerType == "AO"
                    ? undefined
                    : "black"
                }
                borderColor={
                  !isInvestorApproved && user.customerType == "AO"
                    ? undefined
                    : "silver"
                }
              />
              <TwoColStrip
                bgColor={
                  !isInvestorApproved && user.customerType == "AO"
                    ? undefined
                    : "#F8F8FD"
                }
                fontColor={
                  !isInvestorApproved && user.customerType == "AO"
                    ? undefined
                    : "black"
                }
                borderColor={
                  !isInvestorApproved && user.customerType == "AO"
                    ? undefined
                    : "silver"
                }
                key={2}
                title1={"Assets"}
                title2={"Active Loans"}
                subTitle1={assetRows.length}
                subTitle2={deals.length}
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
                <br />
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

          <ArkTable
            title="My Transaction"
            columnData={dataSource}
            key="transaction_table"
            rowData={assetRows}
            emptylistAsButton={true}
            localeOnClick={
              // isInvestorApproved ?
              () => router.push("/asset/new")
              // : handleApplyToInvestor
            }
            onRow={(record) => {
              return {
                onClick: () => {
                  router.push("/asset/view?assetId=" + record.assetId);
                },
              };
            }}
            rBtnOnClick={
              // isInvestorApproved ?
              () => router.push("/asset/new")
              // : handleApplyToInvestor
            }
            rBtnLabel={"Digital Asset Onboarding Application"}
            localeLabel={"Digital Asset Onboarding Application"}
          />

          <ArkTable
            title="My Investments"
            rowData={deals}
            columnData={dataSource2}
            onRow={(record) => {
              return {
                onClick: () => {
                  router.push("/loan/validate-loan?loan=" + record.dealId);
                },
              };
            }}
          />

          {/* <ArkTable
            title="My Investment"
            columnData={dataSource2}
            rowData={[]}
            emptylistAsText={true}
            localeLabel="You have no investments record."
          /> */}
        </div>
      </div>

      {/* modals start here */}
      <Modal
        title={<b>Investment Amount</b>}
        closable={true}
        style={{ textAlign: "center" }}
        centered
        footer={[
          <div style={{ textAlign: "center" }} key="modal_footer_1">
            <PrimaryButtons
              label="Submit"
              onPress={handleInvestAmountSubmit}
              loading={investAmountSubmitFlag}
            />
          </div>,
        ]}
        open={inputModalOpen}
        maskStyle={{ backgroundColor: "#050C36", opacity: 0.5 }}
        onOk={() => setInputModalOpen(false)}
        onCancel={() => setInputModalOpen(false)}
        width={450}
      >
        <p style={{ margin: "24px 0 32px 0" }}>
          Please enter the investment amount for <br /> validation.
        </p>

        <label>
          <p style={{ textAlign: "start", marginLeft: "15%" }}>
            Investment Amount
          </p>
          <Input
            name="amount"
            style={{ width: "70%" }}
            required
            type="number"
            ref={investAmountRef}
          />
        </label>
      </Modal>

      <Modal
        title={<b>Congratulations!</b>}
        closable={true}
        style={{ textAlign: "center" }}
        centered
        footer={[
          <div style={{ textAlign: "center" }} key="modal_footer_2">
            <PrimaryButtons
              label="Close"
              onPress={() => setAlertModalOpen(false)}
            />
          </div>,
        ]}
        open={alertModalOpen}
        maskStyle={{ backgroundColor: "#050C36", opacity: 0.5 }}
        onOk={() => setAlertModalOpen(false)}
        onCancel={() => setAlertModalOpen(false)}
        width={450}
      >
        <p style={{ margin: "24px 0 32px 0" }}>
          You have activated <b>Investor mode</b>. Checkout marketplace and
          start Investing in digital assets.
        </p>
      </Modal>
    </main>
  );
}
