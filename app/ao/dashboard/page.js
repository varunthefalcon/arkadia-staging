"use client";

import Image from "next/image";
import { Button, Form, Table } from "antd";
import styles from "./page.module.css";
import { Input, Checkbox } from "antd";
import ArkTable from "@/components/tables";
import Navbar from "@/components/Navbar";

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
      <Navbar showPages={true} showUserActions={true} />
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

          <ArkTable
            title="My Activity"
            columnData={dataSource}
            rowData={[]}
            emptylistAsButton={true}
            localeLabel="Create New Listing"
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
    </main>
  );
}
