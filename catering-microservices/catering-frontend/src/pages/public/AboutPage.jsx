import Navbar from "../../components/common/Navbar";

import Footer from "../../components/common/Footer";

function AboutPage() {

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <section className="flex-1 py-20 px-6">

        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-10">

          <h1 className="text-5xl font-bold text-orange-600 mb-8">

            About Our Platform

          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">

            Our Catering Booking and Management
            System is a modern full-stack platform
            designed to digitalize the complete
            catering workflow.

          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">

            Customers can browse menus,
            create bookings,
            receive quotations,
            make payments,
            and receive notifications seamlessly.

          </p>

          <p className="text-lg text-gray-700 leading-relaxed">

            Catering owners can efficiently manage
            menus, bookings, quotations,
            and customer interactions through
            a centralized dashboard system.

          </p>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default AboutPage;