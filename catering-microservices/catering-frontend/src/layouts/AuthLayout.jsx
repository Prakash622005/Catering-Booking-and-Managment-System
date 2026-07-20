function AuthLayout({ children }) {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;