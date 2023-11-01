"use client";

import { Badge, Popover } from "antd";
import styles from "./navbar.module.css";
import { BellFilled, CaretRightFilled } from "@ant-design/icons";
import AvatarBadge from "@/components/Badge";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { getUserInfo, logoutUser } from "@/lib/helper";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = (props) => {
  const [notifications, setNotifications] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  const user = getUserInfo();

  const { showPages = false, showUserActions = false } = props;

  const logout = () => {
    logoutUser();
    router.push("/");
  };

  const getNotification = async () => {
    if (!user.customerId) return;

    try {
      const config = {
        method: "GET",
        url:
          "http://defi.ap-southeast-1.elasticbeanstalk.com:9002/defi/api/v1/notification/fetchcustomernotifications?customerId=" +
          user.customerId,
      };
      const resp = await axios(config);
      setNotifications(resp.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <>
      <div className={styles.landing_header}>
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={() => router.push("/")}
            src="/assets/nav_logo.png"
            className={styles.landing_header_img}
            width={160}
            alt="nav logo"
            height={48}
          />
          {showPages && (
            <>
              <span
                className={[
                  styles.navItems,
                  pathname.includes("dashboard") ? styles.active_navItem : "",
                ].join(" ")}
                onClick={() =>
                  user.customerType === "RM"
                    ? router.push("/rm/dashboard")
                    : router.push("/ao/dashboard")
                }
              >
                Dashboard
              </span>
              <span
                className={[
                  styles.navItems,
                  pathname.includes("marketplace") ? styles.active_navItem : "",
                ].join(" ")}
                onClick={() => router.push("/marketplace")}
              >
                Marketplace
              </span>
            </>
          )}
        </div>

        {showUserActions && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "30px",
              gap: "20px",
            }}
          >
            <Popover
              showArrow={true}
              overlayInnerStyle={{ padding: 0 }}
              content={
                <div
                  style={{ padding: "0", width: "280px", position: "relative" }}
                >
                  <b>Notifications{`(${notifications.length})`}</b>
                  <hr></hr>
                  <br />
                  {notifications.length === 0 && (
                    <p style={{ textAlign: "center" }}>
                      You are all caught up!
                    </p>
                  )}
                  {notifications.slice(0, 5).map((e) => (
                    <>
                      <div
                        key={e.notificationId}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{e.comments || "N/A"}</p>
                        <p>now</p>
                      </div>
                      <hr
                        style={{
                          // width: "calc(100% + 32px)",
                          // left: "-16px",
                          // position: "absolute",
                          margin: "16px 0",
                        }}
                      />
                    </>
                  ))}
                </div>
              }
              trigger="click"
            >
              <div style={{ margin: "0 20px" }}>
                <Badge size="small" count={notifications.length}>
                  <BellFilled style={{ fontSize: "24px", cursor: "pointer" }} />
                </Badge>
              </div>
            </Popover>
            <Popover
              showArrow={true}
              content={
                <div
                  style={{ padding: "0 30px", cursor: "pointer" }}
                  onClick={logout}
                >
                  Logout
                </div>
              }
              trigger="click"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <AvatarBadge />
                <span style={{ padding: "0 10px" }}>
                  {user.customerType === "AO" && "Asset Owner"}
                  {user.customerType === "CRO" && "Cash Rich Customer"}
                  {user.customerType === "RM" && "Relationship manager"}
                </span>
                <CaretRightFilled style={{ color: "#1027B8" }} rotate={90} />
              </div>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;

Navbar.propTypes = {
  showPages: PropTypes.bool,
  showUserActions: PropTypes.bool,
};
