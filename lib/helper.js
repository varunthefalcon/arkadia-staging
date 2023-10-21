import { CURRENCY_SYMBOL } from "@/constants/config";

export const getUserInfo = () => {
  let userInfo = window.localStorage.getItem("USER_INFO_LS") || "{}";
  try {
    userInfo = JSON.parse(userInfo);
  } catch (error) {
    userInfo = {};
  }
  return userInfo;
};

export const setUserInfo = (info) => {
  try {
    window.localStorage.setItem("USER_INFO_LS", JSON.stringify(info));
  } catch (error) {
    return false;
  }
  return true;
};

export const logoutUser = () => {
  try {
    window.localStorage.removeItemItem("USER_INFO_LS");
  } catch (error) {
    return false;
  }
  return true;
};

export const formatCurrency = (price = 0) => {
  let formattedStr = "";
  try {
    formattedStr = new Intl.NumberFormat("en-US").format(price);
  } catch (error) {
    return price;
  }
  return CURRENCY_SYMBOL + formattedStr;
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
