import Navbar from "../../components/common/Navbar";

import Footer from "../../components/common/Footer";

function ServicesPage() {

  const services = [

    "Wedding Catering",

    "Birthday Catering",

    "Corporate Catering",

    "Engagement Functions",

    "Outdoor Catering",

    "Custom Menu Planning"

  ];

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <section className="flex-1 py-20 px-6">

        <h1 className="text-5xl font-bold text-center text-orange-600 mb-14">

          Our Catering Services

        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition"
            >

              <h2 className="text-2xl font-semibold mb-4">

                {service}

              </h2>

              <p className="text-gray-600">

                Professional catering services
                tailored for your event needs.

              </p>

            </div>
          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default ServicesPage;