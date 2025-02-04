import updatePassImg from "../../../assets/Auth/update-password.jpg";
import Layout from "../../../common/Layout/Layout";

const UpdatePassword = () => {




  return (
    <Layout>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src={updatePassImg}
            alt="Update Password"
            className="w-full h-full object-cover rounded-l-lg"
          />
          <div className="absolute inset-0  opacity-30 rounded-l-lg"></div>
        </div>


        <div className="flex items-center justify-center py-10 px-6 md:px-0">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Update Your Password
            </h2>
            <p className="text-center text-gray-600">
              Please enter your new password and the OTP sent to your email below.
            </p>

            <form className="space-y-4">
              {/* OTP Input */}
              <div>
                <label
                  htmlFor="otp"
                  className="block text-gray-700 font-medium"
                >
                  OTP (One-Time Password)
                </label>
                <input
                  type="text"
                  id="otp"

                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the OTP sent to your email"
                  required
                />
              </div>

              {/* New Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your new password"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your new password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Update Password
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
    </Layout>

  );
};

export default UpdatePassword;
