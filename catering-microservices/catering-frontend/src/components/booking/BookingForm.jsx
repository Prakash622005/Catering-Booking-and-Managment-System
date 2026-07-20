import { useState } from "react";

function BookingForm({ onSubmit }) {

  const [formData, setFormData] = useState({

    customerId: "",

    eventType: "",

    eventDate: "",

    eventLocation: "",

    guestCount: "",

    specialInstructions: "",

    menuItemIds: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const payload = {

      ...formData,

      customerId: Number(formData.customerId),

      guestCount: Number(formData.guestCount),

      menuItemIds: formData.menuItemIds
        .split(",")
        .map((id) => Number(id.trim()))
    };

    onSubmit(payload);
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-8 space-y-5"
    >

      <h2 className="text-3xl font-bold text-orange-600">

        Create Booking

      </h2>

      <input
        type="number"
        name="customerId"
        placeholder="Customer ID"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <select
        name="eventType"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      >

        <option value="">
          Select Event Type
        </option>

        <option value="WEDDING">
          Wedding
        </option>

        <option value="BIRTHDAY">
          Birthday
        </option>

        <option value="ENGAGEMENT">
          Engagement
        </option>

        <option value="CORPORATE">
          Corporate
        </option>

      </select>

      <input
        type="date"
        name="eventDate"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        name="eventLocation"
        placeholder="Event Location"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="number"
        name="guestCount"
        placeholder="Guest Count"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        name="menuItemIds"
        placeholder="Menu IDs (Example: 1,2,3)"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <textarea
        name="specialInstructions"
        placeholder="Special Instructions"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        rows="4"
      />

      <button
        type="submit"
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold"
      >

        Create Booking

      </button>

    </form>
  );
}

export default BookingForm;