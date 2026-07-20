function MenuCard({ menu }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      {/* IMAGE */}

      <img
        src={
          menu.imageUrl ||
          "https://images.unsplash.com/photo-1544025162-d76694265947"
        }
        alt={menu.menuName}
        className="w-full h-52 object-cover"
      />

      {/* CONTENT */}

      <div className="p-5">

        <h2 className="text-2xl font-bold text-gray-800 mb-2">

          {menu.menuName}

        </h2>

        <p className="text-gray-600 mb-3">

          {menu.description}

        </p>

        <div className="flex flex-wrap gap-2 mb-4">

          {menu.category && (
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">

              {menu.category}

            </span>
          )}

          {menu.foodType && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

              {menu.foodType}

            </span>
          )}

        </div>

        <div className="flex justify-between items-center">

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

        </div>

      </div>
    </div>
  );
}

export default MenuCard;