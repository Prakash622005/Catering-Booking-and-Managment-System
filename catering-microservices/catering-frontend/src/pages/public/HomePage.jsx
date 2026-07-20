import Navbar from "../../components/common/Navbar";

import Footer from "../../components/common/Footer";

import { Link } from "react-router-dom";

function HomePage() {

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      {/* HERO SECTION */}

      <section className="bg-orange-600 text-white py-24 px-6 text-center">

        <h1 className="text-5xl font-bold mb-6">

          Premium Catering Booking Platform

        </h1>

        <p className="text-xl max-w-3xl mx-auto mb-8">

          Simplifying Catering Management,
          Event Booking,
          Quotations,
          Payments,
          and Customer Experience.

        </p>

        <div className="flex justify-center gap-5">

          <Link
            to="/register"
            className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold"
          >

            Get Started

          </Link>

          <Link
            to="/services"
            className="border border-white px-6 py-3 rounded-xl font-semibold"
          >

            Explore Services

          </Link>

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-20 px-6">

        <h2 className="text-4xl font-bold text-center text-orange-600 mb-12">

          Our Features

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white shadow-lg rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-3">

              Catering Menus

            </h3>

            <p className="text-gray-600">

              Explore dynamic catering menus
              customized by catering owners.

            </p>

          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-3">

              Booking Management

            </h3>

            <p className="text-gray-600">

              Book events easily with
              streamlined workflow automation.

            </p>

          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-3">

              Quotation System

            </h3>

            <p className="text-gray-600">

              Receive customized quotations
              directly from catering owners.

            </p>

          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-3">

              Online Payments

            </h3>

            <p className="text-gray-600">

              Securely manage catering
              payments and confirmations.

            </p>

          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default HomePage;