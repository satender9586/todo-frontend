import { useLocation, useNavigate } from "react-router-dom";
import updatePassImg from "../../../assets/Auth/update-password.jpg";
import Layout from "../../../common/Layout/Layout";
import { UpdatePasswordApi } from "../../../services/Post";
import { useState } from "react";
import { UpdatePasswordFieldPayload } from "../../../constant/TypeNotes";




const UpdatePassword = () => {
  const navigate = useNavigate();
  const url = useLocation();
  const pathEmail = url.search.split("=")[1];
  const [formData, setFormData] = useState<UpdatePasswordFieldPayload>({email: pathEmail,otp: "",newPassword:""});

  const updatePasswordHandler=(e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target;
    setFormData({...formData,[name]:value})
  }

  const submitPasswordHandler = async () => {
    try {
      const objData: UpdatePasswordFieldPayload = { ...formData };
      const response = await UpdatePasswordApi(objData);
      if (response.status===200) {
        navigate("/login")
      } else {
        console.log('Password update failed');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };
  


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

            <form  onSubmit={(e) => {
              e.preventDefault(), submitPasswordHandler();
            }} className="space-y-4">
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
                  name="otp"
                  value={formData.otp}
                  onChange={updatePasswordHandler}
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
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={updatePasswordHandler}
                  type="password"
                  id="newPassword"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your new password"
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
