import DashboardLayout from "../../common/DashbordLayout/DashboardLayout";
import { userDetailsApi } from "../../services/getApi";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { UserInfoInterface } from "../../constant/TypeNotes";
import { FaCamera } from "react-icons/fa";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { uploadFileApi } from "../../services/putApi";

// ------------------------------------GET USER DETAILS-------------------------------------------

const getUserDetails = async (id: string): Promise<UserInfoInterface> => {
    try {
        const response = await userDetailsApi(id);
        return response?.data?.isUserExists;
    } catch (error) {
        console.error("Error fetching User:", error);
        throw error;
    }
};

const Profile = () => {
    const userReduxData = useSelector((state: any) => state.auth);
    const [isEye, setIsEye] = useState<boolean>(false);
    const { data } = useQuery<UserInfoInterface, Error>({queryKey: ['user'], queryFn: () => getUserDetails(userReduxData.id || ""), });
    const { userName, email, profileImage } = data || {};
    const [uploadProfile, setUploadProfile]=useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null)

    function handleButtonClick(){
        if (fileRef.current) {
            fileRef.current.click();
          }
    }

   
    function fileChangeHandler(event:React.ChangeEvent<HTMLInputElement>){
        if (event.target.files) {
            setUploadProfile(event.target.files[0]);
          }
    }

    async function fileUploadHandler(uploadProfile: File | null, userReduxData: { id: string }) {
        try {
            const formData = new FormData();
            if (uploadProfile) {
                formData.append("file", uploadProfile); 
            } else {
                console.error("No file selected.");
                return;
            }

            formData.append("_id", userReduxData?.id);
    
            const response = await uploadFileApi(formData);
           if(response.status===200){
            getUserDetails(userReduxData.id)
            setUploadProfile(null)
           }
    
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    useEffect(() => {
        if (uploadProfile) {
            fileUploadHandler(uploadProfile, userReduxData); 
        }
    }, [uploadProfile, userReduxData]); 
    


    return (
        <DashboardLayout>
            <div className="bg-white rounded-sm overflow-hidden min-h-screen">
                <div className="px-3">
                    <div>
                        <p className="text-[20px] font-[600] py-4">My Profile</p>
                    </div>
                    <div className="flex item gap-2.5 relative">
                        <div className="min-w-[55px] relative min-h-[55px] flex items-center justify-center border border-[#C4C4C4] shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] rounded-[100%]">
                            <img  src={profileImage || "https://example.com/default-profile-image.jpg"} alt="Profile" className="w-[50px] h-full rounded-full object-cover" />
                        </div>
                        <input   onChange={fileChangeHandler} ref={fileRef} className="hidden" type="file"/>
                        <button onClick={handleButtonClick} className="absolute top-10 left-8">
                            <FaCamera  color="#C4C4C4" size={13} />
                        </button>
                        <div className="pt-1">
                            <h1 className="text-[14px] font-[600]">{userName || "No Name"}</h1>
                            <h1 className="text-[12px]">Paytel Financial Technologies</h1>
                        </div>
                        <div className="flex-1 w-[200px] flex justify-end">
                            {/* <Button className="min-w-[80px] text-[15px]">Edit</Button> */}
                        </div>
                    </div>
                    <div className="border-b border-[#f3eaea] mt-3"></div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="">
                            <label htmlFor="userName" className="block text-[16px] font-[600] text-[#2B3674]">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={userName || ""}
                                autoComplete="off"
                                className="mt-2 block w-full px-3 py-1.5 border border-[#C4C4C4] shadow-sm focus:outline-none sm:text-sm"
                                readOnly 
                            />
                        </div>
                        <div className="">
                            <label htmlFor="email" className="block text-[16px] font-[600] text-[#2B3674]">
                                Email Address
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={email || ""}
                                autoComplete="off"
                                className="mt-2 block w-full px-3 py-1.5 border border-[#C4C4C4] shadow-sm focus:outline-none sm:text-sm"
                                readOnly
                            />
                        </div>
                        <div className="">
                            <label htmlFor="phoneNumber" className="block text-[16px] font-[600] text-[#2B3674]">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                              
                                autoComplete="off"
                                className="mt-2 block w-full px-3 py-1.5 border border-[#C4C4C4] shadow-sm focus:outline-none sm:text-sm"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="border-b border-[#f3eaea] mt-7"></div>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="pt-1 relative">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                            </div>

                            <input
                                type={isEye ? "password" : "text"}
                                id="password"
                                name="password"
                                value={"password"} 
                                className="mt-2 block w-full px-3 py-1.5 border border-[#C4C4C4] shadow-sm focus:outline-none sm:text-sm"
                            />

                            <div>
                                <span onClick={() => setIsEye(!isEye)} className="absolute top-10 right-3">
                                    {isEye ? <FaEyeSlash /> : <FaEye size={15} />}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Profile;
