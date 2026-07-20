import React from "react";

function FoodGrid({

  foods,
  selectedFoods,
  setSelectedFoods

}) {

  const groupedFoods = {

    BREAKFAST: [],
    LUNCH: [],
    EVENING: [],
    DINNER: []

  };

  foods.forEach((food) => {

    groupedFoods[
      food.foodTiming
    ]?.push(food);

  });

  const handleSelectFood =
    (food) => {

      const alreadySelected =
        selectedFoods.some(

          (item) =>
            item.id ===
            food.id
        );

      if (alreadySelected) {

        setSelectedFoods(

          selectedFoods.filter(

            (item) =>
              item.id !==
              food.id
          )
        );

      } else {

        setSelectedFoods([

          ...selectedFoods,
          food

        ]);
      }
    };

  const renderSection =
    (title, items) => (

      <div
        style={styles.section}
      >

        <h2
          style={styles.heading}
        >
          {title}
        </h2>

        {

          items.length === 0 ? (

            <p
              style={
                styles.empty
              }
            >
              No Foods
            </p>

          ) : (

            items.map(
              (food) => (

                <label
                  key={food.id}
                  style={
                    styles.foodRow
                  }
                >

                  <input
                    type="checkbox"
                    checked={

                      selectedFoods.some(
                        (
                          item
                        ) =>
                          item.id ===
                          food.id
                      )
                    }
                    onChange={() =>
                      handleSelectFood(
                        food
                      )
                    }
                  />

                  <span
                    style={
                      styles.foodName
                    }
                  >
                    {
                      food.foodName
                    }
                  </span>

                </label>
              )
            )
          )
        }

      </div>
    );

  return (

    <div
      style={
        styles.container
      }
    >

      {renderSection(
        "Breakfast",
        groupedFoods
          .BREAKFAST
      )}

      {renderSection(
        "Lunch",
        groupedFoods
          .LUNCH
      )}

      {renderSection(
        "Evening",
        groupedFoods
          .EVENING
      )}

      {renderSection(
        "Dinner",
        groupedFoods
          .DINNER
      )}

    </div>
  );
}

const styles = {

  container: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",

    gap: "30px"

  },

  section: {

    background:
      "rgba(255,255,255,0.03)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "20px",

    padding: "20px"
  },

  heading: {

    color: "#D4AF37",

    fontSize: "28px",

    fontWeight: "800",

    marginBottom: "20px"
  },

  foodRow: {

    display: "flex",

    alignItems: "center",

    gap: "12px",

    marginBottom: "16px",

    color: "#fff",

    fontSize: "18px"
  },

  foodName: {

    fontWeight: "500"
  },

  empty: {

    color: "#aaa"
  }
};

export default FoodGrid;