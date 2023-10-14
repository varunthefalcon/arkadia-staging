const getUserInfo = () => {
  let userInfo = localStorage.getItem("USER_INFO_LS") || "{}";
  try {
    userInfo = JSON.parse(userInfo);
  } catch (error) {
    userInfo = {};
  }
  return userInfo;
};

export const setUserInfo = (info) => {
  try {
    localStorage.setItem("USER_INFO_LS", JSON.stringify(info));
  } catch (error) {
    return false;
  }
  return true;
};

export const logoutUser = (info) => {
  try {
    localStorage.removeItemItem("USER_INFO_LS");
  } catch (error) {
    return false;
  }
  return true;
};
