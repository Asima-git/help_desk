import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../Context/ApiState';
import { FaEye } from "react-icons/fa";
import useAuth from '../utils/useAuth';

const AllTicket = () => {
    const { getUserData, listTicket } = useContext(ApiContext);
    const [tickets, setTickets] = useState([]);
    const { user } = useAuth(); 

    useEffect(() => {
        if (user && user.role) {
            try {
                const fetchData = async () => {
                    if (user.role !== 'Customer') {
                        const data = await listTicket();
                        setTickets(data.data);  
                    } else {
                        const data = await getUserData();
                        setTickets(data.data);
                    }
                };
                fetchData();
            } catch (error) {
                if (error?.response?.data?.message) {
                    return error.response.data.message;
                  } else {
                    return 'An unexpected error occurred';
                  }
            }
        }
    }, [user, getUserData, listTicket]); 
    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Ticket ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        {user.role !== 'Customer' && (
                            <th scope="col" className="px-6 py-3">
                                Customer Name
                            </th>
                        )}
                        <th scope="col" className="px-6 py-3">
                            Last Updated On
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tickets && tickets.length > 0 ? (
                        tickets.map((item) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item._id}
                                </th>
                                <td className="px-6 py-4">{item.subject}</td>
                                <td className="px-6 py-4">{item.status}</td>
                                {user.role !== 'Customer' && (
                                    <td className="px-6 py-4">{item?.user?.name || "N/A"}</td>
                                )}
                                <td className="px-6 py-4">
                                    {new Date(item.updatedAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <Link to={`/admin/view/${item._id}`}>
                                        <FaEye className="text-red-600" />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center">
                                Loading tickets...
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AllTicket;
