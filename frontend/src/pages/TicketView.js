import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ApiContext from '../Context/ApiState';
import CommonForm from '../component/common/Form';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit, FaTrash } from "react-icons/fa";
import useAuth from '../utils/useAuth';
import { checkIfAdminOrAgent } from '../component/config';

const initialState = {
  reply: "",
  attachement: "",
  newStatus: ""
};

const TicketView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialState);
  const { getSingleTicket, addTicketReply, getReply, updateTicketReply, deleteTicketReply } = useContext(ApiContext);
  const [ticket, setTicket] = useState(null);
  const [reply, setReply] = useState([]);  // Store replies here
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const isAdminOrAgent = checkIfAdminOrAgent(user);

  useEffect(() => {
    if (user) {
      setUserRole(user.role); 
    } else {
      setUserRole(null); 
    }
  }, [user]); 

  const ticketReplyFormControls = [
    {
      name: "reply",
      label: "Reply",
      placeholder: "Reply....",
      componentType: 'textarea',
    },
    {
      name: "attachement",
      label: "Upload File",
      placeholder: "Upload File",
      componentType: 'file',
      type: 'file',
    },
    {
      name: "ticketId",
      componentType: 'hidden',
      type: 'hidden',
  },
    ...(isAdminOrAgent ? [
      {
        name: "newStatus",
        label: "Status",
        placeholder: "Select Status",
        componentType: 'select',
        options: [
          { id: "active", label: "Active" },
          { id: "pending", label: "Pending" },
          { id: "closed", label: "Closed" },
        ],
      }
    ] : []),
  ];
  useEffect(() => {
    const fetchTicket = async () => {
      const result = await getSingleTicket(id);
      if (result.success) {
        setTicket(result.data);
      } else {
        setError(result.message);
      }
    };
    fetchTicket();
  }, [id]);

  useEffect(() => {
    const getReplyData = async () => {
      const result = await getReply(id);
      if (result.success) {
        setReply(result.data);
      } else {
        setError(result.message);
      }
    };
    getReplyData();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addTicketReply(formData);

      if (data.success) {
        toast.success(data.message);
        setFormData(initialState);  

        const result = await getReply(id);
        if (result.success) {
          setReply(result.data); 
        } else {
          toast.error('Failed to fetch updated replies');
        }
      } else {
        toast.error('Failed to add reply');
      }
    } catch (err) {
      toast.error('Failed to add reply');
    }
  };

  // Handle reply editing
  const handleEditReply = (replyId, newReply) => {
    updateTicketReply(replyId, { reply: newReply }).then((data) => {
      toast.success('Reply updated successfully');
      setReply(reply.map((r) => (r._id === replyId ? { ...r, reply: newReply } : r)));
    }).catch((err) => toast.error('Failed to update reply'));
  };

  // Handle reply deletion
  const handleDeleteReply = (replyId) => {
    deleteTicketReply(replyId).then((data) => {
      console.log(replyId);
      if (data.success) {
        toast.success('Reply deleted successfully');
        setReply((prevReplies) => prevReplies.filter((r) => r._id !== replyId));
      } else {
        toast.error(data.message || 'Failed to delete reply');
      }
    }).catch((err) => {
      console.error('Error deleting reply:', err);
      toast.error('Failed to delete reply');
    });
  };

  // Log reply state whenever it changes
  useEffect(() => {
    console.log('Updated replies:', reply);  // Log after state is updated
  }, [reply]);

  if (!ticket) return <p>Loading ticket data...</p>;

  return (
    <section>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Ticket Id : {ticket._id} </h5>
        <h4 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Title : {ticket.subject} </h4>
        <p className="font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Description</span>: {ticket.description}</p>
        {userRole && userRole !== 'Customer' && (
          <p className="font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Customer Name</span>: {ticket.user.name}</p>
        )}
        <p className="font-normal text-gray-700 dark:text-gray-400"><span className="font-bold">Status</span>: {ticket.status}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {reply && reply.length > 0 ? (
          reply.map((item) => (
            <div key={item._id} className={`flex ${item.user.role === 'Customer' ? 'justify-end' : ''}`}>
              <div className={`p-6 max-w-sm rounded-lg shadow ${item.user.role === 'Customer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                <h5 className="flex mb-2 text-sm font-bold text-gray-900 dark:text-white items-center">
                  <FaUserCircle className="mr-2" /> {item.user.name}
                </h5>
                <p className="font-normal">
                  <span className="font-bold">Reply</span>: {item.reply}
                </p>
                <span className="text-sm text-slate-950">
                  Last Update: {new Date(item.updatedAt).toLocaleString()}
                </span>

                {/* Show Edit/Delete buttons only for the author of the reply or if the user is an admin */}
                {(item.user.role === userRole) && (
                  <div className="mt-2 flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        const newReply = prompt('Edit your reply:', item.reply);
                        if (newReply) {
                          handleEditReply(item._id, newReply);
                        }
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteReply(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>

      <CommonForm
        formControls={ticketReplyFormControls}
        formData={formData}
        buttonText={'Reply'}
        setFormData={setFormData}
        onSubmit={onSubmit}
        hiddenId={ticket._id}
      />
    </section>
  );
};

export default TicketView;
