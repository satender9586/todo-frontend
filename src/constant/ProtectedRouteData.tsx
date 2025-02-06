import { Private_Routes_Interface, Public_Routes_Interface } from "./TypeNotes";


export const PRIVATE_ROUTES: Private_Routes_Interface = Object.freeze({
   DASHBORD: "/dashboard",
   REMINDER: "/dashboard/remind",
   ARCHIVE: "/dashboard/isachive",
   TRASH: "/dashboard/trash",
   PROFILE: "/dashboard/profile"
})

export const PUBLIC_ROUTES: Public_Routes_Interface = Object.freeze({
   HOME: "/",
   LOGIN: "/login",
   SIGNUP: "/register",
   FORGET: "/forget-password",
   OTP: "/otp-verify"
});

export const DEFAULT_ROUTE: { HOME: string } = Object.freeze({
   HOME: "/"
})
