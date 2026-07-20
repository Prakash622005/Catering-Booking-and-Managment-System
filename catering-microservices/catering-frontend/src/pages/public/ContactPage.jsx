import Navbar from "../../components/common/Navbar";

import Footer from "../../components/common/Footer";

function ContactPage() {

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      <Navbar />

      <section className="flex-1 py-20 px-6">

        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10">

          <h1 className="text-5xl font-bold text-orange-600 mb-8">

            Contact Us

          </h1>

          <div className="space-y-6 text-lg text-gray-700">

            <p>

              <span className="font-semibold">

                Email:

              </span>{" "}

              cateringplatform@gmail.com

            </p>

            <p>

              <span className="font-semibold">

                Phone:

              </span>{" "}

              +91 9876543210

            </p>

            <p>

              <span className="font-semibold">

                Address:

              </span>{" "}

              Chennai, Tamil Nadu, India

            </p>

          </div>

          <form className="mt-10 space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-4 rounded-xl"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border p-4 rounded-xl"
            />

            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold"
            >

              Send Message

            </button>

          </form>

        </div>

      </section>

      <Footer />

    </div>
  );
}

export default ContactPage;