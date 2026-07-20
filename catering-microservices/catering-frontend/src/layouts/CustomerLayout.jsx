import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

function CustomerLayout({ children }) {

  return (

    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* NAVBAR */}

      <Navbar />

      {/* MAIN CONTENT */}

      <div className="flex flex-1">

        {/* SIDEBAR */}

        <Sidebar />

        {/* PAGE CONTENT */}

        <main className="flex-1 p-6">

          {children}

        </main>

      </div>

      {/* FOOTER */}

      <Footer />

    </div>
  );
}

export default CustomerLayout;