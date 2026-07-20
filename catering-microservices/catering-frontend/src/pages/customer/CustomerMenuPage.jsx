import { useEffect, useState } from "react";

import CustomerLayout from "../../layouts/CustomerLayout";

import MenuCard from "../../components/menu/MenuCard";

import { getAllMenus } from "../../services/menuService";

function CustomerMenuPage() {

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

  return (

    <CustomerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Catering Menus

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {menus.map((menu) => (

          <MenuCard
            key={menu.menuId}
            menu={menu}
          />
        ))}

      </div>

    </CustomerLayout>
  );
}

export default CustomerMenuPage;