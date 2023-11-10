"use client";

import { CURRENCY_SYMBOL, USER_INFO_LS } from "@/constants/config";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const getUserInfo = () => {
  let userInfo = window.localStorage.getItem(USER_INFO_LS) || "{}";
  try {
    userInfo = JSON.parse(userInfo);
  } catch (error) {
    userInfo = {};
  }
  return userInfo;
};

export const setUserInfo = (info) => {
  try {
    window.localStorage.setItem(USER_INFO_LS, JSON.stringify(info));
  } catch (error) {
    return false;
  }
  return true;
};

export const logoutUser = () => {
  try {
    localStorage.clear();
  } catch (error) {
    return false;
  }
  return true;
};

export const getUserDetails = (key) => {
  try {
    let userDetails = getUserInfo();
    return userDetails[key] || null;
  } catch (error) {
    return null;
  }
};

export const setUserDetails = (key, value) => {
  try {
    let userDetails = getUserInfo();
    userDetails[key] = value;
    setUserInfo(userDetails);
  } catch (error) {
    return false;
  }
  return true;
};

export const formatCurrency = (price = 0) => {
  let formattedStr = "";
  try {
    formattedStr = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      minimumFractionDigits: 2,
    }).format(price);
  } catch (error) {
    return price;
  }
  return formattedStr;
};

export const formatDate = (date) => {
  try {
    const p = new Date(date);
    return p.toLocaleDateString();
  } catch (error) {
    console.error(error);
  }
  return "";
};

export const RenderStatus = ({ status }) => {
  const StatusColors = {
    pending: "#CD6200",
    rmApproved: "#CD6200",
    success: "#019E82",
    accepted: "#019E82",
    INITIATED: "#CD6200",
    VALIDATED: "#CD6200",
    ACTIVE: "#019E82",
    CANCELLED: "#DB1F28",
    // COMPLETED : "",
    // TERMINATED: '',
    listed: "#707DD4",
    approved: "#019E82",
    rejected: "#DB1F28",
    customerRejected: "#DB1F28",
    rmRejected: "#DB1F28",
  };

  const StatusLabels = {
    pending: "Pending",
    approved: "Approved",
    rmApproved: "RM Approved",
    INITIATED: "Pending",
    VALIDATED: "Pending",
    ACTIVE: "Active",
    CANCELLED: "Rejected",
    accepted: "Accepted",
    listed: "Listed",
    success: "Success",
    rejected: "Rejected",
    customerRejected: "Rejected",
    rmRejected: "Rejected",
  };

  if (Object.keys(StatusColors).includes(status)) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          color: StatusColors[status],
        }}
      >
        <div
          style={{
            height: 10,
            width: 10,
            backgroundColor: StatusColors[status],
            borderRadius: "50%",
          }}
        ></div>
        <p>{StatusLabels[status]}</p>
      </div>
    );
  }
  return <>{status}</>;
};

export const getAssetStatus = (data) => {
  if (data.eligibility === "true") {
    return "listed";
  } else if (data?.paymentTerms?.customerStatus === "NO-GO") {
    return "customerRejected";
  } else if (data?.paymentTerms?.rMStatus === "NO-GO") {
    return "rmRejected";
  } else if (data?.paymentTerms?.rMStatus === "GO") {
    return "rmApproved";
  }

  return "pending";
};

export const getUserLabel = () => {
  const user = getUserInfo();

  if (user.customerType === "AO") {
    return "Asset Owner";
  }
  if (user.customerType === "CRO") {
    return "Cash Rich Customer";
  }
  if (user.customerType === "RM") {
    return "Relationship manager";
  }
  return "";
};

// Your listing has been validated, you can now check and list it on the marketplace.
// Your application as an investor has been validated. You can now switch to “Investor mode”
// Your loan agreement has been validated and approved.
// Your borrowing request have been validated and approved.
// You have a matched transaction to review.
// You have a borrowing request to review.

const labels = {
  "ASSET LISTED FOR VALIDATION": "You have a borrowing request to review.",
  "ASSET LISTING VALIDATED BY RM":
    "Your listing has been validated, you can now check and list it on the marketplace",
  "CUSTOMER ACCEPTED RM OFFER FOR ASSET LISTING":
    "An investor has accepted the borrow request.",
  "RM APPROVED CR": "You have a matched transaction to review",
  "CR INITIATED LOAN REQUEST": "You have a matched transaction to review",
  "RM CREATED LOAN AGREEMENT": "You have a matched transaction to review",
  "CUSTOMER REJECTED RM OFFER FOR ASSET LISTING":
    "Your borrow request approval is rejected by a asset owner",
};

export const RenderNotification = ({ notification = {} }) => {
  const {
    comments,
    notificationStatus,
    aolisting = {},
    deal = {},
    notificationId,
  } = notification;
  const navigate = useRouter();

  const getNavigation = useCallback(() => {
    let path = null;

    if (
      [
        "CUSTOMER REJECTED RM OFFER FOR ASSET LISTING",
        "ASSET LISTED FOR VALIDATION",
      ].includes(comments)
    ) {
      path = "/rm/validate-asset?assetId=" + aolisting.assetId;
    } else if (comments === "ASSET LISTING VALIDATED BY RM") {
      path = "/asset/review?assetId=" + aolisting.assetId;
    } else if (comments === "CUSTOMER ACCEPTED RM OFFER FOR ASSET LISTING") {
      path = "/asset/view?assetId=" + aolisting.assetId;
    } else if (comments === "RM APPROVED CR") {
      path = "/ao/validate-loan?loan=" + aolisting.assetId;
    } else if (comments === "CR INITIATED LOAN REQUEST") {
      path = "/rm/validate-loan?loan=" + deal.dealId;
    } else if (comments === "RM CREATED LOAN AGREEMENT") {
      path = "/loan/validate-loan?loan=" + deal.dealId;
    }
    return path ? navigate.push(path) : () => {};
  }, [notificationId]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "16px 10px",
          cursor: "pointer",
        }}
        className="notificationItem"
      >
        <p
          onClick={getNavigation}
          style={{
            fontWeight: notificationStatus === "true" ? "bold" : "normal",
          }}
        >
          {labels[comments] || comments}
        </p>
        <p style={{ fontSize: "11px", marginLeft: "3px" }}>now</p>
      </div>
      <hr />
    </>
  );
};

export const getinterestRateColor = (rate) => {
  console.log(rate);
  if (rate <= 5) {
    return "#019E82"; // green
  } else if (rate <= 9) {
    return "#CD6200"; // orange
  } else if (rate > 9) {
    return "#DB1F28"; // red
  }

  return "inherit";
};

export const getNotificationLabel = ({ comments }) => {
  if (labels[comments]) {
    return labels[comments];
  }
  return "You have a notification";
};

export const getNotificationType = ({ comments }) => {
  if (labels[comments]) {
    return labels[comments];
  }
  return "You have a notification";
};

export const theme = {
  theme: {
    colorPrimary: "#1027B8",
  },
  token: {
    colorPrimary: "#1027B8",
  },
  mapToken: {
    colorPrimary: "#1027B8",
  },
  components: {
    Button: {
      colorPrimary: "#1027B8",
      borderRadius: 2,
    },
    PrimaryButtons: {
      colorPrimary: "#1027B8",
      borderRadius: 2,
    },
  },
};
