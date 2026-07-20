import CustomerLayout from "../../layouts/CustomerLayout";

function CustomerDashboard() {

  return (

    <CustomerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Customer Dashboard

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            My Bookings

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            Quotations

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            Payments

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            Notifications

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

      </div>

    </CustomerLayout>
  );
}

export default CustomerDashboard;