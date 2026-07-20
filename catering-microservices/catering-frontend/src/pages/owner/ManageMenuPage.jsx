import { useEffect, useState } from "react";

import OwnerLayout from "../../layouts/OwnerLayout";

import MenuTable from "../../components/menu/MenuTable";

import {

  getAllMenus,
  deleteMenu

} from "../../services/menuService";

function ManageMenuPage() {

  const [menus, setMenus] = useState([]);

  useEffect(() => {

    fetchMenus();

  }, []);

  const fetchMenus = async () => {

    try {

      const data = await getAllMenus();

      setMenus(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleDelete = async (id) => {

    try {

      await deleteMenu(id);

      alert("Menu Deleted");

      fetchMenus();

    } catch (error) {

      console.error(error);
    }
  };

  const handleEdit = (menu) => {

    console.log(menu);

    alert("Edit Feature Coming Soon");
  };

  return (

    <OwnerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Manage Menus

      </h1>

      <MenuTable
        menus={menus}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

    </OwnerLayout>
  );
}

export default ManageMenuPage;