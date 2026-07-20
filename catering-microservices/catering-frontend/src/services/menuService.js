import api from "../api/axios";


// GET ALL MENUS
export const getAllMenus = async () => {

  const response = await api.get(
    "/menus"
  );

  return response.data;
};


// GET MENU BY ID
export const getMenuById = async (id) => {

  const response = await api.get(
    `/menus/${id}`
  );

  return response.data;
};


// CREATE MENU
export const createMenu = async (menuData) => {

  const response = await api.post(
    "/menus",
    menuData
  );

  return response.data;
};


// UPDATE MENU
export const updateMenu = async (
  id,
  menuData
) => {

  const response = await api.put(
    `/menus/${id}`,
    menuData
  );

  return response.data;
};


// DELETE MENU
export const deleteMenu = async (id) => {

  const response = await api.delete(
    `/menus/${id}`
  );

  return response.data;
};