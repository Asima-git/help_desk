import { useContext, useState } from 'react'
import CommonForm from '../component/common/Form'
import { registerFormControls } from '../component/config';
import ApiContext from '../Context/ApiState';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
    name: "",
    email: "",
    password: ""
}
const Register = () => {
    const { registerUser } = useContext(ApiContext);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData).then((data) => {
                if (data?.success == true) {
                    toast.success(data?.message);
                    navigate('/auth/login')
                    setFormData(initialState);
                } else {
                    toast.error(data?.message);
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
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                <CommonForm formControls={registerFormControls} formData={formData} buttonText={'Create Account'} setFormData={setFormData} onSubmit={onSubmit} />
                <p className="text-xs text-gray-500 mt-3">Already Have an Account? <Link to='/auth/login' className='hover:underline font-bold cursor-pointer'>Sign In</Link></p>
            </div>
        </>
    )
}

export default Register
