import { CURRENCY_SYMBOL, USER_INFO_LS } from "@/constants/config";

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
