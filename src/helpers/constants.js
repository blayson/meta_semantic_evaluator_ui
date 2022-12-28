export const API_URL = "https://sre-api.herokuapp.com/api/v1";

export const SRE_TOKEN = "sre_token";

export const HISTORY_SIZE = 10;

export const STATUS_MAP = {
  pending: "PENDING",
  approved: "APPROVED",
  rejected: "REJECTED",
};

export const ACTIVE_MENU_ITEM_INDEX = "activeMenuItemIndex";

export const ROLE_TO_ID_MAP = {
  user: 1,
  admin: 2,
  "super admin": 3,
};

export const ID_TO_ROLES_MAP = {
  1: "User",
  2: "admin",
  3: "Super admin",
};

export const USER_ROLES = ["user", "admin"];

export const REVIEW_STATUS = [
  {
    name: "Rejected",
    id: "rejected",
  },
  {
    name: "Approved",
    id: "approved",
  },
  {
    name: "Pending",
    id: "pending",
  },
];


