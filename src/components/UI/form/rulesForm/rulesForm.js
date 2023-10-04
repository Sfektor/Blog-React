export const rulesEmail = {
  required: "Required field",
  pattern: {
    value: /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
    message: "Email is incorrect",
  },
};

export const rulesPassword = {
  required: "Required field",
  minLength: {
    value: 6,
    message: "Your password needs to be at least 6 characters",
  },
  maxLength: {
    value: 40,
    message: "Your password must be less than 40 characters",
  },
};

export const rulesUsername = {
  required: "Required field",
  minLength: {
    value: 3,
    message: "Your username needs to be at least 3 characters",
  },
  maxLength: {
    value: 20,
    message: "Your username must be less than 20 characters",
  },
};

export const rulesAvatar = {
  pattern: {
    value:
      /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/,
    message: "Url is incorrect",
  },
};
