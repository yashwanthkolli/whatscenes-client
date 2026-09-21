export const CTA_CONFIG = {
  LOGIN_REQUIRED: {
    label: "Login to Continue",
    variant: "white",
    action: ({ navigate }) => navigate("/auth/login"),
  },

  REGISTER: {
    label: "Register Now",
    variant: "primary",
    action: "REGISTER",
  },

  APPLY: {
    label: "Join Waitlist",
    variant: "primary",
    action: "REGISTER",
  },

  WAITLISTED: {
    label: "Already Waitlisted",
    variant: "white",
    disabled: true,
  },

  PAY_NOW: {
    label: "Pay to Confirm",
    variant: "primary",
    action: "OPEN_PAYMENT",
  },

  WAIT_FOR_PAYMENT_WINDOW: {
    label: "Payment Opens Soon",
    variant: "white",
    disabled: true,
  },

  GROUP_FULL: {
    label: "Group Full",
    variant: "white",
    disabled: true,
  },

  NOT_SELECTED: {
    label: "Not Selected",
    variant: "white",
    disabled: true,
  },

  VIEW_STATUS: {
    label: "View My Ticket",
    variant: "white",
    action: "VIEW_STATUS",
  },

  REGISTRATION_CLOSED: {
    label: "Registration Closed",
    variant: "white",
    disabled: true,
  },

  SOLD_OUT: {
    label: "Sold Out",
    variant: "white",
    disabled: true,
  },
}
