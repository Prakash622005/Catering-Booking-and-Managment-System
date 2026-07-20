export const getRole = () => {

  return localStorage.getItem("role");
};


export const setRole = (role) => {

  localStorage.setItem(
    "role",
    role
  );
};


export const removeRole = () => {

  localStorage.removeItem("role");
};


// ROLE CHECKS

export const isOwner = () => {

  return getRole() === "ROLE_OWNER";
};


export const isCustomer = () => {

  return getRole() === "ROLE_CUSTOMER";
};


export const isAdmin = () => {

  return getRole() === "ROLE_ADMIN";
};