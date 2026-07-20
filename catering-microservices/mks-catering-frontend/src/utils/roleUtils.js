export const isCustomer = () => {

  return (
    localStorage.getItem("role")
    === "CUSTOMER"
  );
};

export const isOwner = () => {

  return (
    localStorage.getItem("role")
    === "OWNER"
  );
};

export const isAuthenticated = () => {

  return !!localStorage.getItem(
    "token"
  );
};

export const getUserRole = () => {

  return localStorage.getItem(
    "role"
  );
};