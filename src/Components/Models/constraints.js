export const emailValidator = {
  email: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address",
    },
    email: {
      message: "^Please enter a valid email address",
    },
  },
};

export const loginConstraints = {
  email: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address",
    },
    email: {
      message: "^Please enter a valid email address",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an password",
    },
    length: {
      minimum: 8,
      message: "must be at least 8 characters",
    },
  },
};

export const fullNameConstraints = {
  first_name: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an first name",
    },
  },
  last_name: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an last name",
    },
  },
};
