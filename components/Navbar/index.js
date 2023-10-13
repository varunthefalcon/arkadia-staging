"use client";

import { Badge, Popover } from "antd";
import styles from "./navbar.module.css";
import { BellFilled, CaretRightFilled } from "@ant-design/icons";
import AvatarBadge from "@/components/Badge";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = (props) => {
  const pathname = usePathname();
  const router = useRouter();

  const { showPages = false, showUserActions = false } = props;

  return (
    <>
      <div className={styles.landing_header}>
        <div style={{ display: "flex" }}>
          <img
            src="/assets/nav_logo.png"
            className={styles.landing_header_img}
            width={160}
            height={48}
          />
          {showPages && (
            <>
              <span
                className={[
                  styles.navItems,
                  pathname.includes("dashboard") ? styles.active_navItem : "",
                ].join(" ")}
                onClick={() => router.push("/ao/dashboard")}
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
            <div style={{ margin: "0 20px" }}>
              <Badge size="small" count={2}>
                <BellFilled style={{ fontSize: "24px" }} />
              </Badge>
            </div>
            <Popover
              showArrow={true}
              content={<span>Logout</span>}
              trigger="click"
              overlayInnerStyle={{ padding: "10px 30px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <AvatarBadge />
                <span style={{ padding: "0 10px" }}>Asset Owner</span>
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
