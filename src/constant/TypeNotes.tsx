export interface Note_Interface {
    _id: string;
    user: string;
    noteTitle: string;
    description: string;
    isPriority?: boolean;
    noteColor?: string;
    isArchive?:boolean
}

export interface InputFieldPayload{
  userName:string,
  password:string,
  email:string
}

export interface InputField_Interface {
    label: string;
    name: string;
    placeholder: string;
    isRequired: boolean;
    type: string;
  }
  
 export const signupInputField: InputField_Interface[] = [
    {
      label: "UserName",
      name: "userName",
      placeholder: "Enter your full name",
      isRequired: true,
      type: "text"
    },
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      isRequired: true,
      type: "email"
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter your password",
      isRequired: true,
      type: "password"
    }
    
  ];
  
  

  // --------------------------------------------------------------OTP Verify-----------------------------------

  export interface OTPInputFieldPayload {
    otp: string;
    email: string;
    [key: string]: string;  
}


  export interface OTPInputField_Interface {
    label: string;
    name: string;
    placeholder: string;
    isRequired: boolean;
    type: string;
  }
  

  export const OtpVerifyInputField: OTPInputField_Interface[] = [
    
    {
      label: "Email",
      name: "email",
      placeholder: "Enter your email",
      isRequired: true,
      type: "email"
    },
    {
      label: "Otp",
      name: "otp",
      placeholder: "Enter your OTP",
      isRequired: true,
      type: "text"
    },
    
  ];


  
  // --------------------------------------------------------Resend OTP -----------------------------------
  
  
  export  interface ResendInputFieldPayload{
    email:string
  }
  
  
  // -------------------------------------------------------------Login User-------------------------------------

 export interface LoginFieldPayload {
    email:string,
    password:string
}

export interface LoginInputFieldData_Interface {
  label: string;
  name: string;
  placeholder: string;
  isRequired: boolean;
  type: string;
}

export const LoginInputFieldData:LoginInputFieldData_Interface []=[
  {
    label: "Email",
    name: "email",
    placeholder: "Enter your Email",
    isRequired: true,
    type: "email"
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter your Password",
    isRequired: true,
    type: "password"
  },
]

// ---------------------------------PROTECTED ROUTES---------------------------------------------

export interface Private_Routes_Interface{
  DASHBORD:string,
  REMINDER :string,
  ARCHIVE:string,
  TRASH:string, 
}
export interface Public_Routes_Interface{
  HOME:string,
  LOGIN :string,
  SIGNUP:string,
  FORGET:string, 
}


// -----------------------------------USER SLICE---------------------------------


export interface UserInterface {
  userName: string | null;
  id: string | null;
  isAuthenticated?: boolean;
  userToken: string | null;
}


// -----------------------------------GET USER DETAILS ------------------------------

export interface UserInfoInterface {
  _id: string; 
  userName: string; 
  email: string; 
  isAdmin: number; 
  isVerify: boolean; 
  otp: string; 
  otptime: string; 
  password: string; 
  profileImage: string; 
  createdAt: string; 
  updatedAt: string; 
  __v: number; 
}
