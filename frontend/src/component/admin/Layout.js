import {useContext} from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import SideBar from '../common/SideBar';
import { Outlet,useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiContext from '../../Context/ApiState';
import useAuth from '../../utils/useAuth';
const AdminLayout = () => {
    const { logout } = useContext(ApiContext);
    const {user } = useAuth();
    const navigate = useNavigate();
    const handlerLogout = async()=>{
        const result = await logout();
         if(result == true){
            navigate('/');
        }
    }
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col w-64 h-full bg-gray-800 text-gray-200 md:fixed md:inset-y-0 md:left-0 md:transform md:translate-x-0 transform -translate-x-full transition duration-300 ease-in-out md:relative" id="sidebar">
            <div className="items-center p-4 h-auto bg-gray-900">
                <span className="text-xl font-semibold">Help Desk</span><br/>
                <span className="text-sm my-4 flex items-center "><FaRegUserCircle className='mr-2'/>Hello , <strong className='mx-2'>{user?.name}</strong></span>
            </div>
            <SideBar/>
        </div>
        <ToastContainer />
        <div className="flex flex-col flex-grow bg-gray-100 p-4">
            <header className="flex items-center justify-between bg-gray-900 text-white p-4 rounded-lg shadow">
                <h1 className="text-xl font-semibold">Welcome</h1>
                <button className="md:hidden text-gray-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3 5h14M3 10h14m-7 5h7"/></svg>
                </button>
                <div className='flex'>
                        <IoMdNotificationsOutline className='font-bold text-2xl cursor-pointer'  />
                        <AiOutlineLogout className='ml-4 font-bold text-2xl cursor-pointer' onClick={handlerLogout}/>
                </div>
            </header>
            <main className="flex-grow p-6 bg-white rounded-lg shadow mt-4">
                <Outlet/>
            </main>
        </div>
    </div>

    </>
  )
}

export default AdminLayout
