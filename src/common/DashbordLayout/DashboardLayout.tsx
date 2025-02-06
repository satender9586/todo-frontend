import logoImg from "../../assets/Common/Navbar/todo.png";
import partyImg from "../../assets/DashbordLayout/party.jpg";
import { ReactNode } from "react";
import Notificaiton from "../../pages/Dashboard/Notificaiton"
import ProfileButton from "../../pages/Dashboard/ProfileButton";
import { sideBaarData } from "../../constant/DashSideBaar";
import { NavLink } from "react-router-dom";
import MobileNavbaarLayout from "../../common/DashbordLayout/MobileNavbaarLayout";


interface DashboardLayoutProps {
  children: ReactNode;
}



const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

  return (
    <div className="flex min-h-screen ">
      <aside className=" bg-[#F9F9F9] shadow-md text-white w-64 p-4   hidden md:block">
        <div className=" mb-6 pl-3 max-h-[70px]">
          <img src={logoImg} alt="to-img" className="w-[35px]" />
        </div>
        <nav>
          <ul>
            {
              sideBaarData?.map((tab, index) => (
                <NavLink
                  key={index}
                  to={tab.tabPath}
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                >
                  <li className="mb-1 pl-2 flex items-center space-x-2 py-2 border-1.5 border-transparent rounded-lg hover:border-[#F889F6] hover:bg-gradient-to-r hover:from-[#F9F2F9] hover:to-[#F1D1D6] hover:text-gray-800 transition-all duration-300 ease-in-out">
                    {tab.icons}
                    <a
                      href={tab.tabPath}
                      className="text-gray-700 text-[12px] font-medium pl-1 hover:text-gray-800 transition-all duration-300 ease-in-out"
                    >
                      {tab.tabName}
                    </a>
                  </li>
                </NavLink>


              ))
            }


          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full ">
        <nav className="px-6 sm:py-3 md:py-4 lg:py-4 border-b border-[#E3E5E8] max-h-[90px] flex ">
          <div className="flex items-center gap-2">
            <div>
              <MobileNavbaarLayout/>
              <img src={partyImg} className="w-[22px] hidden sm:block" alt="party-icons" />
            </div>
            <div className=" sm:text-[18px] md:text-[18px] tracking-[1.2px]  text-[#6C5562] ">Dashbord</div>
          </div>
          <div className=" flex-1 flex justify-end gap-2">
            <Notificaiton />
            <ProfileButton />
          </div>
        </nav>
        <div className="flex-1  p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
