import { Outlet } from "react-router-dom";

import Navbar
from "../components/common/Navbar";

function CustomerLayout() {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <Navbar />

      {/* PAGE CONTENT */}

      <main className="max-w-7xl mx-auto px-4 py-8">

        <Outlet />

      </main>
    </div>
  );
}

export default CustomerLayout;