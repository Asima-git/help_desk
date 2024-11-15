import { ticketFormControls } from '../component/config'
import { useContext, useState } from 'react'
import CommonForm from '../component/common/Form'
import ApiContext from '../Context/ApiState';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const initialState = {
  subject: '',
  description: '',
  status: 'Active'
}
const GenerateTicket = () => {
  const { generateTicket } = useContext(ApiContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      generateTicket(formData).then((data) => {
        if (data.success == true) {
          toast.success(data.message);
          navigate('/admin/my-tickets')
          setFormData(initialState);
        } else {
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
      <CommonForm formControls={ticketFormControls} formData={formData} buttonText={'Submit'} setFormData={setFormData} onSubmit={onSubmit} />
    </>
  )
}

export default GenerateTicket
