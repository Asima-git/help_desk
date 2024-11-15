import {useContext,useState,useEffect} from 'react'
import ApiContext from '../Context/ApiState';
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
const AllUsers = () => {
    const { listUsers,deleteUser} = useContext(ApiContext);
    const [users, setUsers] = useState({}); 
    useEffect(() => {
        const fetchData = async () => {
            const data = await listUsers();
            setUsers(data.data);
        };
        fetchData();
    }, []);
    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (confirmDelete) {
          try {
            const data = await deleteUser(userId);
            if (data?.success == true) {
              setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
              toast.success(data?.message);
            } else {
                toast.error(data?.message || 'Failed to delete user');
            }
          } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                return error.response.data.message; 
            } else {
                return 'An unexpected error occurred';
            }
          }
        }
      };
    return (
        <>
            <div class="relative overflow-x-auto">
            <button className="text-white bg-black border-0 py-2 px-8 mb-4 focus:outline-none hover:bg-slate-500 rounded text-lg"><Link to='/admin/create-user'>Add New User</Link></button>

                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                               Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {users && users.length > 0 ? (
                                users.map((item) => (
                                    <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleDelete(item._id)}>Delete</button> /
                                            <Link to={`/admin/edit-user/${item._id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center">
                                        Loading Users...
                                    </td>
                                </tr>
                            )}
                        </>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllUsers
