import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AuthLayout = () => {
  return (
    <>
        <section className="my-5">
        <ToastContainer />
         <h1 className='text-black font-bold text-3xl mx-auto my-6 w-full text-center'>Help Desk</h1>
          <div className="container text-gray-600 px-5 pb-24 mx-auto flex flex-wrap items-center">
            <Outlet/>
          </div>
        </section>
    </>
  )
}

export default AuthLayout
