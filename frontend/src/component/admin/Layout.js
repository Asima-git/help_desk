import { useContext, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import SideBar from "../common/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiContext from "../../Context/ApiState";
import useAuth from "../../utils/useAuth";
import { TiThMenu } from "react-icons/ti";

const AdminLayout = () => {
  const { logout } = useContext(ApiContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handlerLogout = async () => {
    const result = await logout();
    if (result === true) {
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="flex flex-col h-screen md:flex-row relative">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-gray-200 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-50`}
        >
          <div className="p-4 bg-gray-900">
            <span className="text-xl font-semibold">Help Desk</span>
            <br />
            <span className="text-sm my-4 flex items-center">
              <FaRegUserCircle className="mr-2" />
              Hello, <strong className="mx-2">{user?.name}</strong>
            </span>
          </div>
          <SideBar />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Toast Container */}
        <ToastContainer />

        {/* Main Content */}
        <div className="flex flex-col flex-grow bg-gray-100 md:ml-64">
          {/* Header */}
         
          <header className="flex items-center justify-between bg-gray-900 text-white p-4 shadow md:static fixed top-0 left-0 w-full z-40">
          <button
              className="md:hidden  text-white w-6 h-9 font-bold"
              onClick={toggleSidebar}
            >
             <TiThMenu />
            </button>
            <h1 className="text-lg font-semibold">Welcome</h1>
            <div className="flex items-center space-x-4">
              <IoMdNotificationsOutline className="text-2xl cursor-pointer" />
              <AiOutlineLogout
                className="text-2xl cursor-pointer"
                onClick={handlerLogout}
              />
            </div>
          </header>
          <main className="flex-grow p-4 mt-16 md:mt-0 bg-white rounded-lg shadow">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
