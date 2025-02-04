import { useState } from "react";
import registerImg from "../../../assets/Auth/register.jpg";
import Layout from "../../../common/Layout/Layout";
import { signupInputField } from "../../../constant/TypeNotes";
import { singupApi } from "../../../services/Post";
import { InputFieldPayload } from "../../../constant/TypeNotes";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";





const Register = () => {


  const [formData, setFormData] = useState<InputFieldPayload>({ userName: "", email: "", password: "" });
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const signUpFormSubmitHandler = async (formData: InputFieldPayload): Promise<void> => {
    try {
      const response = await singupApi(formData);
      if (response.status === 201) {
        navigate(`/otp-verify?singup/email=${formData?.email}`)
        toast("User created successfully");
      } else {
        toast("Unexpected status: " + response.status);
      }
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage = error?.response.data?.message || 'An error occurred. Please try again.';
      toast(errorMessage);
    }
  };







  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${registerImg})` }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Register
          </h2>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); signUpFormSubmitHandler(formData); }}>
            {signupInputField.map((data, index) => (
              <div key={index} className="mb-4">
                <label
                  htmlFor={data.name}
                  className="block text-sm font-medium text-gray-600"
                >
                  {data.label}
                </label>
                <input
                  onChange={handleChange}
                  type={data.type}
                  id={data.name}
                  name={data.name}
                  placeholder={data.placeholder}
                  required={data.isRequired}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            ))}


            <div>
              <button

                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>


            <div className="text-center text-sm text-blue-500">
              <p>
                Already have an account?{" "}
                <button onClick={()=>navigate("/login")} className="hover:underline"> Login here?</button>
               
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
