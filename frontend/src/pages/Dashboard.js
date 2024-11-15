import {useContext,useState,useEffect} from 'react'
import ApiContext from '../Context/ApiState';
const Dashboard = () => {
    const { listTicket,listUsers} = useContext(ApiContext);
    const [ticketsCount, setTicketCount] = useState(0); 
    const [userCount, setUserCount] = useState(0); 
    useEffect(() => {
        const fetchData = async () => {
                const data = await listTicket();
                setTicketCount(data.data.length);
        };
        fetchData();
    }, []);
    useEffect(() => {
      const fetchUserData = async () => {
              const data = await listUsers();
              setUserCount(data.data.length);
      };
      fetchUserData();
  }, []);
  return (
    
    <div>
        <div className="grid grid-cols-4 gap-4">
         <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className='font-bold text-2xl'>Total {ticketsCount} Tickets Generated</h1>
          </div>
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h1 className='font-bold text-2xl'>Total {userCount} Users</h1>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
