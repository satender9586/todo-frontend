
import forgetImg from "../../../assets/Auth/forget.jpg";
import { useNavigate } from "react-router-dom";
import { forgetPasswordApi } from "../../../services/Post";
import { useRef } from "react";
import { AxiosError } from "axios";




const ForgetPassword = () => {

  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)



  async function forgetPasswordHandler() {

    if (emailRef.current?.value) {
      const email: string = emailRef.current?.value
      try {
        const response = await forgetPasswordApi({ email })
        if(response.status===200){
          navigate(`/update-password?update/email=${email}`)
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.error("Error adding note:", error);
          throw new Error(
            error.response?.data?.message || "An unknown error occurred"
          );
        } else {
          console.error("Unexpected error:", error);
          throw new Error("An unexpected error occurred");
        }
      }

    }

  }




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
          <form   onSubmit={(e) => {
              e.preventDefault();
              forgetPasswordHandler();
            }} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email Address
              </label>
              <input
                ref={emailRef}
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
            <button onClick={()=>navigate("/login")}><a  className="text-blue-600 hover:underline">
              Remembered your password? Go back to Login
            </a></button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
