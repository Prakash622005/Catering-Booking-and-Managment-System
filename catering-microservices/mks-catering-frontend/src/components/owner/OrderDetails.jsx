import React from "react";

function OrderDetails({ order }) {

  const getSessionDetails = (mealType) => {
    const session = order?.mealSessions?.find(
      s => s.mealType === mealType
    );

    if (!session) {
      return {
        guestCount: 0,
        mealDate: "",
        foods: []
      };
    }

    const foods = order?.selectedFoods?.filter(
      (food) =>
        session?.foodIds?.includes(
          food.foodId || food.id
        )
    ) || [];

    return {
      guestCount: session.guestCount,
      mealDate: session.mealDate,
      foods
    };
  };

  const renderFoodSection = (mealType, title) => {
    const session = getSessionDetails(mealType);
    const sessionIdFallback = session?.sessionId || mealType;

    return (
      <div style={styles.foodBox}>
        <h4 style={styles.foodTiming}>{title}</h4>

        <div style={styles.guestCount}>
          Guests : {session.guestCount}
        </div>

        <div style={styles.dateText}>
          Date : {session.mealDate || "-"}
        </div>

        {session.foods.length > 0 ? (
          session.foods.map((food, index) => (
            <div
              key={`static-${sessionIdFallback}-${food.foodId || food.id || index}-${index}`}
              style={styles.foodItem}
            >
              • {food.foodName}
            </div>
          ))
        ) : (
          <p style={styles.emptyText}>No items</p>
        )}
      </div>
    );
  };

  return (
    <div style={styles.detailsCardWrapper}>
      <div style={styles.masterFormLayout}>
        <h2 style={styles.mainOrderHeaderTitle}>
          Order Registry #{order?.bookingId}
        </h2>

        <div style={styles.profileDataSplitGrid}>
          <div style={styles.dataBlockSection}>
            <h3 style={styles.blockSubheadingTitle}>
              Customer Information
            </h3>

            <div style={styles.infoContentStack}>
              <p style={styles.dataParagraphRow}>
                <span style={styles.boldLabel}>Name :</span>
                <span style={styles.valueHighlight}>
                  {order?.customerName}
                </span>
              </p>

              <p style={styles.dataParagraphRow}>
                <span style={styles.boldLabel}>Email :</span>
                <span style={styles.valueHighlight}>
                  {order?.customerEmail}
                </span>
              </p>

              <p style={styles.dataParagraphRow}>
                <span style={styles.boldLabel}>Phone :</span>
                <span style={styles.valueHighlight}>
                  {order?.customerPhone}
                </span>
              </p>
            </div>
          </div>

          <div style={styles.dataBlockSection}>
            <h3 style={styles.blockSubheadingTitle}>
              Event Information
            </h3>

            <div style={styles.infoContentStack}>
              <p style={styles.dataParagraphRow}>
                <span style={styles.boldLabel}>Event Type :</span>
                <span style={styles.valueHighlight}>
                  {order?.eventType}
                </span>
              </p>

              <p style={styles.dataParagraphRow}>
                <span style={styles.boldLabel}>Location :</span>
                <span style={styles.valueHighlight}>
                  {order?.eventLocation}
                </span>
              </p>

              <p style={styles.dataParagraphRow}>
                <span style={styles.boldLabel}>Sessions :</span>
                <span style={styles.valueHighlight}>
                  {order?.mealSessions?.length || 0}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div style={styles.dataBlockSection}>
          <h3 style={styles.blockSubheadingTitle}>
            Special Instructions
          </h3>

          <div style={styles.instructionTextBox}>
            <p style={styles.instructionParagraphText}>
              {order?.specialInstructions || "No special instructions"}
            </p>
          </div>
        </div>

        <div style={styles.dataBlockSectionNoBorder}>
          <h3 style={styles.blockSubheadingTitle}>
            Meal Sessions
          </h3>

          <div style={styles.foodGrid}>
            {order?.mealSessions?.map((session, sessionIdx) => {
              const foods = order?.selectedFoods?.filter(
                (food) =>
                  session?.foodIds?.includes(
                    food.foodId || food.id
                  )
              ) || [];

              const currentSessionId = session.sessionId || session.mealType || sessionIdx;

              return (
                <div
                  key={currentSessionId}
                  style={styles.foodBox}
                >
                  <h4 style={styles.foodTiming}>
                    {session.mealType}
                  </h4>

                  <div style={styles.guestCount}>
                    Guests : {session.guestCount}
                  </div>

                  <div style={styles.dateText}>
                    Date : {session.mealDate}
                  </div>

                  {foods.length > 0 ? (
                    foods.map((food, foodIdx) => (
                      <div
                        key={`dynamic-${currentSessionId}-${food.foodId || food.id || foodIdx}-${foodIdx}`}
                        style={styles.foodItem}
                      >
                        • {food.foodName}
                      </div>
                    ))
                  ) : (
                    <p style={styles.emptyText}>No Items</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  detailsCardWrapper: {
    width: "100%",
    maxWidth: "950px",
    margin: "0 auto"
  },
  masterFormLayout: {
    backgroundColor: "rgba(19,22,34,0.45)",
    borderRadius: "24px",
    padding: "40px",
    color: "#fff"
  },
  mainOrderHeaderTitle: {
    fontSize: "28px",
    marginBottom: "30px"
  },
  profileDataSplitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "24px"
  },
  dataBlockSection: {
    background: "rgba(10,11,18,0.3)",
    padding: "24px",
    borderRadius: "18px",
    marginBottom: "24px"
  },
  dataBlockSectionNoBorder: {
    marginTop: "20px"
  },
  blockSubheadingTitle: {
    color: "#A78BFA",
    marginBottom: "16px"
  },
  infoContentStack: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  dataParagraphRow: {
    display: "flex",
    justifyContent: "space-between"
  },
  boldLabel: {
    color: "#9CA3AF"
  },
  valueHighlight: {
    color: "#E5E7EB"
  },
  instructionTextBox: {
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(10,11,18,0.4)"
  },
  instructionParagraphText: {
    margin: 0
  },
  foodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px"
  },
  foodBox: {
    background: "rgba(10,11,18,0.4)",
    padding: "20px",
    borderRadius: "16px"
  },
  foodTiming: {
    color: "#FBBF24"
  },
  guestCount: {
    color: "#10B981",
    fontWeight: "700",
    marginBottom: "8px"
  },
  dateText: {
    color: "#60A5FA",
    marginBottom: "12px"
  },
  foodItem: {
    marginBottom: "8px"
  },
  emptyText: {
    color: "#6B7280"
  }
};

export default OrderDetails;