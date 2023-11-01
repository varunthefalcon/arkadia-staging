export const URL_BASE =
  "http://defi.ap-southeast-1.elasticbeanstalk.com:9002/defi/api/v1";
export const URL_LOGIN = URL_BASE + "/customer/login";

export const URL_CREATE_ASSET = URL_BASE + "/asset/createAsset";

export const URL_AO_LIST_ASSET = URL_BASE + "/asset/fetchAsset";

export const URL_LIST_VALIDATED_ASSET =
  URL_BASE + "/asset/fetchValidatedAssets";

export const URL_VIEW_ASSET = URL_BASE + "/asset/fetchAsset/";

export const URL_INITIATE_DEAL = URL_BASE + "/deal/initiatedeal";

export const URL_RM_PENDING_ASSET =
  URL_BASE + "/rm/fetchValidationPendingAssets";

export const URL_RM_VALIDATE_ASSET = URL_BASE + "/rm/updatepaymentterms";

export const URL_AO_APPROVE_REJECT_ASSET =
  URL_BASE + "/asset/agree/paymentterms/";

export const URL_FETCH_CATEGORY = URL_BASE + "/asset/fetchCategory";

export const URL_FETCH_PENDING_ASSETS =
  URL_BASE + "/rm/fetchValidationPendingAssets";

export const URL_GET_TOKENIZED_ASSET = URL_BASE + "/tokenizedAssets";

export const BRAND_COLOR = "#1027b8";
export const USER_INFO_LS = "user_information";
export const CURRENCY_SYMBOL = "$";
