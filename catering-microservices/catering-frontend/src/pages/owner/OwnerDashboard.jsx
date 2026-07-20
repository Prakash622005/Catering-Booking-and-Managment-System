import OwnerLayout from "../../layouts/OwnerLayout";

function OwnerDashboard() {

  return (

    <OwnerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Owner Dashboard

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            Total Menus

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            Total Bookings

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            Quotations Sent

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-2">

            Payments Received

          </h2>

          <p className="text-4xl font-bold text-orange-600">

            0

          </p>

        </div>

      </div>

    </OwnerLayout>
  );
}

export default OwnerDashboard;