    export const saveAuthData = (

  token,
  role,
  customerId

) => {

  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "role",
    role
  );

  if (customerId) {

    localStorage.setItem(
      "customerId",
      customerId
    );
  }
};

export const clearAuthData = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "role"
  );

  localStorage.removeItem(
    "customerId"
  );
};

export const getToken = () => {

  return localStorage.getItem(
    "token"
  );
};

export const getRole = () => {

  return localStorage.getItem(
    "role"
  );
};

export const getCustomerId = () => {

  return localStorage.getItem(
    "customerId"
  );
};

export const isTokenAvailable = () => {

  return !!localStorage.getItem(
    "token"
  );
};