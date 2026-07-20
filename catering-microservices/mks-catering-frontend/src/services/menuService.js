import api from "../api/axios";

// GET ALL FOODS

const getAllFoods = async () => {

  return await api.get(
    "/menus"
  );
};

// GET FOOD BY ID

const getFoodById = async (
  id
) => {

  return await api.get(
    `/menus/${id}`
  );
};

// ADD FOOD

const addFood = async (
  foodData
) => {

  return await api.post(
    "/menus",
    foodData
  );
};

// DELETE FOOD

const deleteFood = async (
  id
) => {

  return await api.delete(
    `/menus/${id}`
  );
};

const menuService = {

  getAllFoods,

  getFoodById,

  addFood,

  deleteFood
};

export default menuService;