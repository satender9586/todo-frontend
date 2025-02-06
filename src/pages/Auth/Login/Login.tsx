import loginImg from "../../../assets/Auth/login.jpg";
import Layout from "../../../common/Layout/Layout";
import { UserLoginApi } from "../../../services/Post";
import { LoginFieldPayload } from "../../../constant/TypeNotes";
import { useMutation } from "@tanstack/react-query";
import { LoginInputFieldData } from "../../../constant/TypeNotes";
import { useState } from "react";
import { AxiosError } from "axios";
import { SaveTokenInCookies, SaveAuthDetails } from "../../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../redux/feature/auth/authSlice";



const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFieldPayload>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginFormSubmitHandler = async (data: LoginFieldPayload) => {
    try {
      const response = await UserLoginApi(data);
      return response;
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
  };

  
  const mutation = useMutation({
    mutationFn: loginFormSubmitHandler,
    onSuccess: (success) => {
      const res = success.data;
      SaveTokenInCookies(res.accessToken);
      SaveAuthDetails({ userName: res.userName, _id: res._id });
      dispatch(loginAction({ userName: res.userName, id: res._id, userToken: res.accessToken }));
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Error in mutation:", error.message);
      alert(`Error: ${error}`);
    },
    onSettled: () => {
      console.log("Mutation settled ");
    },
  });

  const handleSubmit = (data: LoginFieldPayload) => {
    mutation.mutate(data);
  };




  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImg})` }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Login
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);
            }}
          >
            {LoginInputFieldData?.map((data, index) => (
              <div key={index}>
                <label
                  htmlFor={data.label}
                  className="block text-sm font-medium text-gray-600"
                >
                  {data.label}
                </label>
                <input
                  type={data.type}
                  id={data.name}
                  name={data.name}
                  placeholder={data.placeholder}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div>
              <button
                // type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </div>

            {/* Forgot Password and Register Links */}
            <div className="text-center text-sm text-blue-500 mt-4 space-y-2">
              <div>
                <button
                  onClick={() => navigate("/forget-password")}
                  className="hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div>
                <button
                  onClick={() => navigate("/register")}
                  className="hover:underline"
                >
                  Create an account?
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
