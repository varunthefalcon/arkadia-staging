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
import { URL_AO_LIST_ASSET } from "@/constants/config";
import { getUserDetails, getUserInfo, setUserDetails } from "@/lib/helper";
import axios from "axios";

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
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Status",
      dataIndex: "Status",
    },
  ];

  const [inputModalOpen, setInputModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [investAmountSubmitFlag, setInvestAmountSubmitFlag] = useState(false);
  const [listings, setListings] = useState([]);

  const router = useRouter();
  const user = getUserInfo();

  const investAmountRef = useRef();

  const handleApplyToInvestor = () => {
    setInputModalOpen(true);
  };

  const handleInvestAmountSubmit = () => {
    setInvestAmountSubmitFlag(true);

    setTimeout(() => {
      setUserDetails("isInvestor", true);
      setUserDetails("isInvestorAmount", investAmountRef.current.input.value);
      setInputModalOpen(false);
      setAlertModalOpen(true);
    }, 2000);
  };

  const getListings = async () => {
    const config = {
      url: URL_AO_LIST_ASSET,
      method: "GET",
      params: { customerId: user.customerId },
    };

    try {
      const resp = await axios(config);
      console.log(resp);

      console.log(resp.data); //setListings
    } catch (error) {
      console.log(error);
    }
  };

  const isInvestorApproved = getUserDetails("isInvestor");

  useEffect(() => {
    getListings();
  }, []);

  return (
    <main>
      <Navbar showPages={true} showUserActions={true} />
      {!isInvestorApproved && (
        <div
          className={styles.banner}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          <div>
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
          <div>
            <Image
              src="/assets/InvestPic.png"
              alt="Next.js InvestPic"
              style={{ paddingTop: "4px", marginLeft: "10px" }}
              height={190}
              width={425}
              priority
            />
          </div>
        </div>
      )}

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
                    color: "white",
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
                      <p className={styles.bannerLabel}>
                        Total Amount Invested
                      </p>
                      <p className={styles.bannerValue}>$100,000</p>
                    </div>
                    <Image
                      src="/assets/AOInvestPic.png"
                      alt="Next.js subtitle"
                      style={{ paddingTop: "4px", marginLeft: "10px" }}
                      height={82}
                      width={125}
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
                      <p className={styles.bannerLabel}>
                        Active Loan Agreement
                      </p>
                      <p className={styles.bannerValue}>-</p>
                    </div>
                    <Image
                      src="/assets/FinancePic.png"
                      alt="Next.js subtitle"
                      style={{ paddingTop: "4px", marginLeft: "10px" }}
                      height={82}
                      width={84}
                      priority
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <p className={styles.pageTitle}>Hello, Asset Owner</p>

          <ArkTable
            title="My Activity"
            columnData={dataSource}
            rowData={[]}
            emptylistAsButton={true}
            localeOnClick={
              isInvestorApproved
                ? () => router.push("/asset/new")
                : handleApplyToInvestor
            }
            localeLabel={
              isInvestorApproved
                ? "Create New Listing"
                : "Digital Asset Onboarding Application"
            }
          />

          <ArkTable
            title="My Transaction"
            columnData={dataSource}
            rowData={[]}
            emptylistAsText={true}
            localeLabel="You have no transaction records."
          />
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
