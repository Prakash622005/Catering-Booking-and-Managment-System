import { Outlet } from "react-router-dom";

function AuthLayout() {

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-gray-800 p-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <Outlet />

      </div>
    </div>
  );
}

export default AuthLayout;