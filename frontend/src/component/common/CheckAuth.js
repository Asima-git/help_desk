import { useEffect ,useState} from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../../utils/useAuth';

const CheckAuthUser = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!isAuthenticated && !location.pathname.startsWith('/auth')) {
  //     navigate('/auth/login', { replace: true });
  //     return; 
  //   }
  //   if (isAuthenticated && location.pathname.startsWith('/auth')) {
  //     if (user?.role === 'Admin' || user?.role === 'Agent') {
  //       navigate('/admin/dashboard', { replace: true });
  //     } else if (user?.role === 'Customer') {
  //       navigate('/admin/my-tickets', { replace: true });
  //     }
  //     return;
  //   }
  //   if (isAuthenticated === null && user?.role !== 'Admin' && location.pathname.includes('admin')) {
  //     navigate('/', { replace: true });
  //   }
  //   setLoading(false); 
  // }, [isAuthenticated, user, location, navigate]);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  
  return children ? children : <Outlet />;
  
};

export default CheckAuthUser;
