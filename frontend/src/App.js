import AuthLayout from './component/auth/Layout';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './component/admin/Layout';
import GenerateTicket from './pages/GenerateTicket';
import TicketView from './pages/TicketView';
import DataContext from './Context/ApiContext';
import AllTicket from './pages/AllTicket'
import Dashboard from './pages/Dashboard';
import AllUsers from './pages/AllUsers';
import CreateUsers from './pages/CreateUsers';
import EditUser from './pages/EditUser';
import Home from './pages/Home';
import CheckAuthUser from './component/common/CheckAuth';

function App() {
  return (
    <>
    <DataContext>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<CheckAuthUser>
             <AuthLayout/>
          </CheckAuthUser>}>
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/admin' element={<CheckAuthUser>
             <AdminLayout/>
          </CheckAuthUser>}>
           <Route path='my-tickets' element={<AllTicket />} />
           <Route path='submit-ticket' element={<GenerateTicket />} />
           <Route path='view/:id' element={<TicketView/>} />
           <Route path='dashboard' element={<Dashboard/>}/>
           <Route path='users' element={<AllUsers/>} />
           <Route path='create-user' element={<CreateUsers/>} />
           <Route path='edit-user/:id' element={<EditUser/>} />
        </Route>
      </Routes>
      </DataContext>
    </>
   
  );
}

export default App;
