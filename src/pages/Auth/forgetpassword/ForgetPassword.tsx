
import forgetImg from "../../../assets/Auth/forget.jpg";

const ForgetPassword = () => {



  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${forgetImg})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Forgot Your Password?
          </h2>
          <p className="text-center text-gray-600">
            No worries! Just enter your email address below and we'll send you instructions to reset your password.
          </p>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </form>

          <p className="text-center text-gray-600">
            <a href="/login" className="text-blue-600 hover:underline">
              Remembered your password? Go back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
