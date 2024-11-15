import ApiContext from "./ApiState";
import axios from 'axios';

const DataContext = (props) => {
    const host = process.env.REACT_APP_BACKEND_URI;
     
    //Register User
    const registerUser = async(formData)=>{
        const response = await axios.post(`${host}/api/auth/register`,formData,{
            withCredentials:true
        });
        return response.data 
    }
    //Login User
    const loginUser = async(formData)=>{
        const response = await axios.post(`${host}/api/auth/login`,formData,{
            withCredentials:true
        });
      return response.data
    }

    //Get All user list
    const getUserData = async () => {
        const response = await axios.get(`${host}/api/ticket/all-ticket`, {
            withCredentials: true
        });
        return response.data;
    };

  //Get Ticket data by user
  const listTicket = async () => {
    const response = await axios.get(`${host}/api/ticket/list-ticket`, {
        withCredentials: true
    });
    return response.data;
};

 //get Users
 const listUsers = async () => {
    const response = await axios.get(`${host}/api/ticket/users`, {
        withCredentials: true
    });
    return response.data;
};
    //Generate Ticket
    const generateTicket = async(formData)=>{
        const response = await axios.post(`${host}/api/ticket/generate-ticket`,formData,{
            withCredentials:true
        });
        return response.data
    }
    
    //get single Ticket Data
    const getSingleTicket = async (ticketId) => {
        const response = await axios.get(`${host}/api/ticket/view/${ticketId}`, {
            withCredentials: true,
        });
        return response.data;
    };

    //logout
    const logout = async()=>{
        try {
            await axios.get(`${host}/api/auth/logout`, { withCredentials: true });
            return true
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    //Ticket Reply
    const addTicketReply = async(formData)=>{
        const response = await axios.post(`${host}/api/ticket/reply`,formData,{
            withCredentials:true
        });
        return response.data
    }

    const getReply = async (ticketId) => {
        try {
            const response = await axios.get(`${host}/api/ticket/get-reply/${ticketId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {            
            if (error.response && error.response.data && error.response.data.message) {
                return error.response.data.message; 
            }  else {
                return 'An unexpected error occurred';
            }
        }
    };

    const createUser = async(formData)=>{
        const response = await axios.post(`${host}/api/ticket/create-user`,formData,{
            withCredentials:true
        });
        return response.data; 
    }

     //get single Ticket Data
     const deleteUser = async (userId) => {
        const response = await axios.delete(`${host}/api/auth/delete-user/${userId}`, {
            withCredentials: true,
        });
        return response.data;
    };

    const editUser = async (userId, userData) => {
        try {
            const response = await axios.put(
                `${host}/api/auth/edit-user/${userId}`, 
                userData, 
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: "An unexpected error occurred" };
            }
        }
    };
    
    const updateTicketReply = async (replyId, replyData) => {
        try {
            const response = await axios.put(
                `${host}/api/ticket/update-reply/${replyId}`, 
                replyData, 
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: "An unexpected error occurred" };
            }
        }
    };
    

    //get single Ticket Data
    const getSingleUser = async (userId) => {
        try {
            const response = await axios.get(`${host}/api/auth/get-user/${userId}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: "An unexpected error occurred" };
            }
        }
    };

    const deleteTicketReply = async (replyId) => {
        console.log(replyId);
        try {
          const response = await axios.delete(`${host}/api/ticket/delete-reply/${replyId}`, {
            withCredentials: true,
          });
          return response.data;
        } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
            return { success: false, message: error.response.data.message };
          } else {
            return { success: false, message: "An unexpected error occurred" };
          }
        }
      };
      

    const checkAuth = async()=>{
        try {
            const response = await axios.get(`${host}/api/auth/check-auth`,{
                withCredentials:true,
                'Cache-Control':'no-store,no-cache,must-revalidate,proxy-revalidate'
            })
            return response.data
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                return { success: false, message: error.response.data.message };
            } else {
                return { success: false, message: "An unexpected error occurred" };
            }
        }
    }
    
    return (
        <ApiContext.Provider value={{registerUser,loginUser,getUserData,generateTicket,getSingleTicket,logout,addTicketReply,
        listTicket,getReply,listUsers,createUser,deleteUser,editUser,getSingleUser,updateTicketReply,deleteTicketReply,checkAuth}}>
            {props.children}
        </ApiContext.Provider>
    );

}

export default DataContext;
