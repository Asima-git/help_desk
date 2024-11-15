import { useContext, useState } from 'react'
import { createUserFormControls } from '../component/config';
import CommonForm from '../component/common/Form'
import ApiContext from '../Context/ApiState';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "Admin"
}
const CreateUsers = () => {
  const { createUser } = useContext(ApiContext);
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createUser(formData);
      if (data?.success) {
        toast.success('User added successfully'); 
        setFormData(initialState);
        navigate('/admin/users');
      } else {
        toast.error(data?.message || 'Failed to add user');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
        return error.response.data.message;
      } else {
        toast.error('An unexpected error occurred');
        return 'An unexpected error occurred';
      }
    }
  };
  return (
    <>
      <div className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0 my-auto">
        <h1>Add New User</h1>
        <CommonForm formControls={createUserFormControls} formData={formData} buttonText={'Create User'} setFormData={setFormData} onSubmit={onSubmit} />
      </div>
    </>
  )
}

export default CreateUsers
