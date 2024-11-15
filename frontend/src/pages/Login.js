import { useState ,useContext,useEffect} from 'react'
import { loginFormControls } from '../component/config';
import CommonForm from '../component/common/Form';
import ApiContext from '../Context/ApiState';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
    email: "",
    password: ""
}
const Login = () => {
  const {loginUser} = useContext(ApiContext);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const onSubmit = async(e)=>{
      e.preventDefault();
          try {
            await loginUser(formData).then((data) => {
              console.log(data)
              if(data.success == true){
                toast.success(data.message);
                if(data.user.role !== 'Customer'){
                  navigate('/admin/dashboard');
                }else{
                  navigate('/admin/my-tickets');
                }
              }else{
                toast.error(data.message);
              }
            })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
                return error.response.data.message; 
            } else {
                return 'An unexpected error occurred';
            }
        }
     }
  return (
    <>
       <div className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0 my-auto">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
                <CommonForm formControls={loginFormControls} formData={formData} buttonText={'Sign In'} setFormData={setFormData} onSubmit={onSubmit}/>
                <p className="text-xs text-gray-500 mt-3">Don't have an account Please <Link to='/auth/register' className='hover:underline font-bold cursor-pointer'>Sign Up</Link></p>
            </div>
    </>
  )
}

export default Login
