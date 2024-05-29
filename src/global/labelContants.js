export const log_labels = [
  { id: "0", name: "email", label: "Email" },
  { id: "1", name: "password", label: "Password" },
];

export const form_labels = [
  {
    ID: "0",
    NAME: "email",
    LABEL: "Email",
    RMESSAGE: "Please  Enter the Email",
    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    RXMESSAGE: "Please enter a valid email",
  },
  {
    ID: "1",
    NAME: "password",
    LABEL: "Password",
    RMESSAGE: "Please  Enter the Password",
    REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    RXMESSAGE:
      "Password should be of at least 8 characters,one capital,one number and one special character",
  },
];
export const update_form_labels = [
  {
    ID: 0,
    NAME: "first_name",
    LABEL: "First Name",
    RMESSAGE: "Please  Enter the First Name",
    REGEX: /^[A-Z][a-z]{2,}$/,
    RXMESSAGE:
      "First Name should be start with Uppercase letters and atleast of two characters",
  },
  {
    ID: 1,
    NAME: "last_name",
    LABEL: "Last Name",
    RMESSAGE: "Please  Enter the Last Name",
    REGEX: /^[A-Z][a-z]{2,}$/,
    RXMESSAGE:
      "Last Name should be start with Uppercase letters and atleast of two characters",
  },
  {
    ID: 2,
    NAME: "email",
    LABEL: "Email",
    RMESSAGE: "Please enter the Email",
    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    RXMESSAGE: "Please enter a valid email",
  },
  {
    ID: 3,
    NAME: "role",
    LABEL: "Role",
    RMESSAGE: "Please  Enter the role of the employee",
    REGEX: /^[a-z]{2,5}$/,
    RXMESSAGE: "Please  Enter the role of the employee",
  },
  {
    ID: 4,
    NAME: "phone_number",
    LABEL: "Phone Number",
    RMESSAGE: "Please  Enter the Phone Number",
    REGEX: /^[0-9]{10}$/,
    RXMESSAGE: "Please enter 10 digit Phone Number",
  },
];
export const form_register_labels = [
  {
    ID: 0,
    NAME: "first_name",
    LABEL: "First Name",
    RMESSAGE: "Please  Enter the First Name",
    REGEX: /^[A-Z][a-z]{2,}$/,
    RXMESSAGE:
      "First name should start with uppercase letters and atleast of two characters",
  },
  {
    ID: 1,
    NAME: "last_name",
    LABEL: "Last Name",
    RMESSAGE: "Please  Enter the Last Name",
    REGEX: /^[A-Z][a-z]{2,}$/,
    RXMESSAGE:
      "Last name should start with uppercase letters and atleast of two characters",
  },
  {
    ID: 2,
    NAME: "email",
    LABEL: "Email",
    RMESSAGE: "Please  Enter the Email",
    REGEX: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    RXMESSAGE: "Please enter a valid email",
  },
  {
    ID: 3,
    NAME: "role",
    LABEL: "Role",
    RMESSAGE: "Please enter the role of the employee",
    REGEX: /^[a-z]{2,5}$/,
    RXMESSAGE: "Please enter the role of the employee",
  },
  {
    ID: 4,
    NAME: "phone_number",
    LABEL: "Phone Number",
    RMESSAGE: "Please  Enter the Phone Number",
    REGEX: /^[0-9]{10}$/,
    RXMESSAGE: "Please enter a 10-digit phone number.",
  },
  {
    ID: 5,
    NAME: "password",
    LABEL: "Password",
    RMESSAGE: "Please  Enter the Password",
    REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    RXMESSAGE:
      "Password should be of at least  8 characters, one capital letter, and one number. and one special character.",
  },
  {
    ID: 6,
    NAME: "password_confirmation",
    LABEL: "Confirm Password",
    RMESSAGE: "Please  Enter the Confirm Password",
    REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    RXMESSAGE: "Password and Confirm Password do not match.",
  },
];
export const drawer_list_points = [
  {
    ID: 0,
    NAME: "ALL Employee",
    LINK: "all-employees",
  },
  {
    ID: 2,
    NAME: "My Profile",
    LINK: "my-profile",
  },
  {
    ID: 3,
    NAME: "Download CSV",
    LINK: "download-csv",
  },
  {
    ID: 4,
    NAME: "Trash",
    LINK: "trash",
  },
  {
    ID: 5,
    NAME: "Active Employees",
    LINK: "active-employees",
  },
];
export const drawer_list_points_user = [
  {
    ID: 0,
    NAME: "ALL Employee",
    LINK: "all-employees",
  },

  {
    ID: 1,
    NAME: "My Profile",
    LINK: "my-profile",
  },
];
export const csvdownloadconstant = [
  {
    ID: 0,
    NAME: "All Employees",
    PATH: "/dashboard/all-employees",
    LENGTHNAME: "allUserss",
    BGCOLOR: "#ff9f1c",
  },
  {
    ID: 1,
    NAME: "Active Employees",
    PATH: "/dashboard/active-employees",
    LENGTHNAME: "activeUsers",
    BGCOLOR: "#ff6b6b",
  },
  {
    ID: 2,
    NAME: "InActive Employees",
    PATH: "/dashboard/trash",
    LENGTHNAME: "inActiveUsers",
    BGCOLOR: "#4ecdc4",
  },
];
export const BASE_URL = "http://localhost:8000/api/user";
