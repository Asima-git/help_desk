
export const registerFormControls = [
    {
        name : "name",
        label : "Full Name",
        placeholder :"Enter your user name",
        componentType:'input',
        type:'text', 
    },
    {
        name : "email",
        label : "Email",
        placeholder :"Enter your Email",
        componentType:'input',
        type:'email',
    },
    {
        name : "password",
        label : "Password",
        placeholder :"Enter your Password",
        componentType:'input',
        type:'password',
    }, 
]

export const loginFormControls = [
    {
        name : "email",
        label : "Email",
        placeholder :"Enter your Email",
        componentType:'input',
        type:'email',
    },
    {
        name : "password",
        label : "Password",
        placeholder :"Enter your Password",
        componentType:'input',
        type:'password',
    }, 
] 

// export const ticketReplyFormControls = [
//     {
//         name: "reply",
//         label: "Reply",
//         placeholder: "Reply....",
//         componentType: 'textarea',
//     },
//     {
//         name: "attachement",
//         label: "Upload File",
//         placeholder: "Upload File",
//         componentType: 'file',
//         type: 'file',
//     },
//     {
//         name: "ticketId",
//         componentType: 'hidden',
//         type: 'hidden',
//     },
//     ...(isAdminOrAgent
//         ? [
//             {
//                 name: "newStatus",
//                 label: "Status",
//                 placeholder: "Select Status",
//                 componentType: 'select',
//                 options: [
//                     { id: "active", label: "Active" },
//                     { id: "pending", label: "Pending" },
//                     { id: "closed", label: "Closed" },
//                 ],
//             }
//         ]
//         : []),
// ];
export const ticketFormControls = [
    {
        name : "subject",
        label : "Subject",
        placeholder :"Enter Subject",
        componentType:'input',
        type:'input',
    },
    {
        name : "description",
        label : "Description",
        placeholder :"Enter Description",
        componentType:'textarea'
    }, 
    {
        name : "file",
        label : "Upload File",
        placeholder :"Upload File",
        componentType:'file',
        type:'file',
    }, 
] 

export const roleData = [
    {
        role: "Customer",
        navItems: [
            { name: "My Tickets", path: "/admin/my-tickets", icon: "tickets-icon" },
            { name: "Submit Ticket", path: "/admin/submit-ticket", icon: "submit-icon" }
        ]
    },
    {
        role: "Agent",
        navItems: [
            { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard-icon" },
            { name: "All Tickets", path: "/admin/my-tickets", icon: "all-tickets-icon" },
        ]
    },
    {
        role: "Admin",
        navItems: [
            { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard-icon" },
            { name: "All Tickets", path: "/admin/my-tickets", icon: "all-tickets-icon" },
            { name: "All Users", path: "/admin/users", icon: "users-icon" },
        ]
    }
];

export const createUserFormControls = [
    {
        name : "name",
        label : "name",
        placeholder :"Enter Name",
        componentType:'input',
        type:'input',
    },
    {
        name : "email",
        label : "Email",
        placeholder :"Enter Email ",
        componentType:'input',
        type:'input',
    },
    {
        name : "password",
        componentType:'input',
        label : "Password",
        placeholder :"Enter Password ",
        type:'input',
    },
    {
        name : "role",
        label : "Role",
        placeholder :"Select Role",
        componentType:'select',
        options: [
            { id: "Admin", label: "Admin" },
            { id: "Customer", label: "Customer" },
            { id: "Agent", label: "Agent" },
          ],
     }
]
export const checkIfAdminOrAgent = (user) => {
    return user && (user.role === 'Admin' || user.role === 'Agent');
  };