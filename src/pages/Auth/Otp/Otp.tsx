import Layout from "../../../common/Layout/Layout";
import registerImg from "../../../assets/Auth/register.jpg";
import { OTPInputFieldPayload, ResendInputFieldPayload } from "../../../constant/TypeNotes";
import { OtpVerifyInputField } from "../../../constant/TypeNotes";
import { useEffect, useState } from "react";
import { OtpVerifyApi,ResendOtpApi } from "../../../services/Post";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Otp = () => {
  const navigate = useNavigate();
  const url = useLocation();
  const pathEmail = url.search.split("=")[1];
  const [otpTime, setOtpTime] = useState<number>(10)
  const [formData, setFormData] = useState<OTPInputFieldPayload>({email: "",otp: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const OtpSubmitHandler = async (data: OTPInputFieldPayload) => {
    try {
      const response = await OtpVerifyApi(data);
      if (response?.status == 200) {
        toast.success("Otp verified successfully");
        navigate("/login")
      }
    } catch (error: any) {
      toast(error?.response?.data?.message);
    }
  };

  const ResendOTPSubmitHandler = async ()=>{
    const data:ResendInputFieldPayload = {email:formData.email}
    try {
      const response = await ResendOtpApi(data)
      if (response?.status == 200) {
        toast.success(response?.data?.message);
      }
    } catch (error:any) {
      toast(error?.response?.data?.message);
    }
  }


  useEffect(()=>{
    if(otpTime>0){
      const interval = setInterval(()=>{
          setOtpTime((prevTime:number)=>{
            if(prevTime<=1){
              clearInterval(interval);
              return 0;
            }
            return prevTime - 1;
          })
         
      },1000)
      return ()=> clearInterval(interval);
    }
  },[otpTime])

  useEffect(() => {
    setFormData({ email: pathEmail, otp: "" });
  }, [pathEmail]);

  return (
    <Layout>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${registerImg})` }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            OTP Verify
          </h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault(), OtpSubmitHandler(formData);
            }}
          >
            {OtpVerifyInputField.map((data, index) => (
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
                  disabled={data.type==="email"}
                  value={formData[data.name]}
                  placeholder={data.placeholder}
                  // required={data.isRequired}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Verify OTP
              </button>
            </div>
            
          </form>
          <div className="flex justify-center items-center mt-5">
              {otpTime > 0 ? (
                <div
                  className="p-2 rounded-lg shadow-lg bg-gradient-to-r from-yellow-100 via-orange-200 to-red-300 text-center w-full max-w-md"
                  style={{ animation: "fadeIn 1s ease" }}
                >
                  <h2 className="text-md font-bold text-[#d9534f]">
                    OTP will expire in
                  </h2>
                  <strong className="text-lg font-semibold text-[#d9534f]">
                    {otpTime}
                  </strong>
                  <div className="mt-0 text-sm text-gray-700">
                    <p>Hurry up! Please use your OTP before it expires.</p>
                  </div>
                </div>
              ) : (
                <div
                  className="p-2 rounded-lg shadow-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-center w-full max-w-md"
                  style={{ animation: "fadeIn 1s ease" }}
                >
                  <h2 className="text-md font-bold text-[#d9534f]">OTP Expired</h2>
                  <p className="text-md text-gray-800">
                    Your OTP has expired. Please request a new one.
                  </p>
                  <button
                    className="mt-2 px-4 py-1 rounded-full text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 transition-all duration-300"
                    onClick={()=> ResendOTPSubmitHandler()}
                  >
                    Resend OTP
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Otp;
