import { useContext, useState, useEffect } from 'react';
import { createUserFormControls } from '../component/config'; 
import CommonForm from '../component/common/Form'; 
import ApiContext from '../Context/ApiState';  
import { toast } from 'react-toastify'; 
import { useNavigate, useParams } from 'react-router-dom';  

const EditUser = () => {
    const { editUser,getSingleUser } = useContext(ApiContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });
    const navigate = useNavigate();  
    const { id } = useParams();  
    useEffect(() => {
        const fetchUserData = async (id) => {
            try {
                const response = await getSingleUser(id);
                setFormData(response.data);  
            } catch (error) {
                toast.error("Error fetching user data");
                console.error(error);  
            }
        };

        if (id) {
            fetchUserData(id); 
        }
    }, [id]);  
    const onSubmit = async (e) => {
        e.preventDefault();  
        try {
            const response = await editUser(id, formData);  
            toast.success(response.message || 'User updated successfully!'); 
            setFormData({ name: "", email: "", password: "", role: "" });
            navigate('/admin/users');  
        } catch (error) {
            toast.error(error.response?.data?.message || 'An unexpected error occurred');
            console.error(error); 
        }
    };

    return (
        <div className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:m-auto w-full mt-10 md:mt-0 my-auto">
            <h1>Edit User</h1>
            <CommonForm
                formControls={createUserFormControls}  
                formData={formData} 
                buttonText={'Update User'}  
                setFormData={setFormData}  
                onSubmit={onSubmit}  
            />
        </div>
    );
};

export default EditUser;
