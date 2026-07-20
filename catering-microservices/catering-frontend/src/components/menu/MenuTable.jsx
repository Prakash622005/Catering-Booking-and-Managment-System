function MenuTable({

  menus,
  onEdit,
  onDelete

}) {

  return (

    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

      <table className="w-full border-collapse">

        <thead className="bg-orange-600 text-white">

          <tr>

            <th className="p-4 text-left">
              ID
            </th>

            <th className="p-4 text-left">
              Menu Name
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Food Type
            </th>

            <th className="p-4 text-left">
              Availability
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {menus.length > 0 ? (

            menus.map((menu) => (

              <tr
                key={menu.menuId}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  {menu.menuId}

                </td>

                <td className="p-4 font-semibold">

                  {menu.menuName}

                </td>

                <td className="p-4">

                  {menu.category}

                </td>

                <td className="p-4">

                  {menu.foodType}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      menu.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {menu.available
                      ? "Available"
                      : "Unavailable"}

                  </span>

                </td>

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(menu)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >

                    Edit

                  </button>

                  <button
                    onClick={() => onDelete(menu.menuId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  >

                    Delete

                  </button>

                </td>

              </tr>
            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                className="text-center p-6 text-gray-500"
              >

                No Menu Items Found

              </td>

            </tr>
          )}

        </tbody>

      </table>
    </div>
  );
}

export default MenuTable;