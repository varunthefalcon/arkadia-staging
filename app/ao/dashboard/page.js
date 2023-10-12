"use client";

import Image from "next/image";
import { Button, Form, Table } from "antd";
import styles from "./page.module.css";
import { Input, Checkbox } from "antd";

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

  return (
    <main>
      <div className={styles.landing_header}>
        <Image src="/assets/nav_logo.png" width={160} height={30} />
      </div>
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
          <Button className={styles.landing_button} ghost type="primary">
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
          <p className={styles.pageTitle}>Hello, Asset Owner</p>

          <div className={styles.tableWrapper}>
            <div className={styles.tableTitle}>My Activity</div>
            <Table
              columns={dataSource}
              dataSource={[]}
              locale={{
                emptyText: (
                  <div style={{ marginBlock: "60px" }}>
                    <Button
                      type="primary"
                      style={{ backgroundColor: "#1027B8" }}
                    >
                      Create New Listing
                    </Button>
                  </div>
                ),
              }}
            />
          </div>

          <div style={{ marginBlock: "32px" }} className={styles.tableWrapper}>
            <div className={styles.tableTitle}>My Transaction</div>
            <Table
              columns={dataSource}
              dataSource={[]}
              locale={{
                emptyText: (
                  <div style={{ marginBlock: "60px" }}>
                    You have no transaction records.
                  </div>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
