import React, { useEffect, useState } from 'react'
import { roleData } from '../config'
import { Link } from 'react-router-dom'
import useAuth from '../../utils/useAuth'

const SideBar = () => {
    const [navData, setNavData] = useState([]);
    const { user } = useAuth();  

    useEffect(() => {
        if (user && user.role) {
            const role = user.role; 
            const roleDataEntry = roleData.find((entry) => entry.role === role);
            const entry = roleDataEntry ? roleDataEntry.navItems : [];
            setNavData(entry);
        }
    }, [user]);

    return (
        <nav className="flex flex-col flex-grow px-4 mt-5 space-y-2">
            {navData.length > 0 ? (
                navData.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
                    >
                        <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 20a8.95 8.95 0 006.32-2.68A8.95 8.95 0 0019 10a8.95 8.95 0 00-2.68-6.32A8.95 8.95 0 0010 1a8.95 8.95 0 00-6.32 2.68A8.95 8.95 0 001 10c0 2.38.94 4.67 2.68 6.32A8.95 8.95 0 0010 20z"/>
                        </svg>
                        {item.name}
                    </Link>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </nav>
    );
}

export default SideBar;
