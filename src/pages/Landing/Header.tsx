import notsImg from "../../assets/Header/nots.jpg";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4">
          <h1 className="sm:mt-0 md:mt-[4rem] lg:mt-[5rem] xl:[7rem] text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Stay Organized with
          </h1>
          <h1 className=" sm:mt-0 md:mt-2 lg:mt-[1rem] text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-medium leading-tigh"> Your Notes</h1>
          <span className="sm:mt-1 md:mt-2 block text-xl md:text-2xl text-[#CB76BA]">Stay organized, stay productive.</span>
          <p className="text-[17px] sm:mt-1 md:mt-2 opacity-[0.8]">Capture thoughts, ideas, and tasks with easily. Your notes,</p>
          <p className="text-[17px] sm:mt-[1] md:mt-1 opacity-[0.8]">always within reach., always within reach.</p>
          <button onClick={()=> navigate("/login")} className="mt-[1rem] rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6  text-md">
            Get Started
          </button>
        </div>
        <div className="bg-black">
          <img
            src={notsImg}
            alt="bannerImg"
            className="object-cover w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
