import { FaHandHoldingHand } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <section className="text-gray-600 body-font relative">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome to our Help Desk</h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Rise Your Ticket and get your solution</p>
        <FaHandHoldingHand className="text-8xl lg:w-2/3 mx-auto mt-5"/>
      </div>
      <div className="lg:w-1/2 md:w-2/3 mx-auto items-center">
        <div className="flex flex-wrap -m-2 gap-5 justify-center">
        <Link to='/auth/register' className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-slate-500 rounded text-lg">Sign Up</Link>
        <Link to='/auth/login' className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-slate-500 rounded text-lg">Sign In</Link>
        </div>
        
      </div>
      
    </div>
  </section>
  )
}

export default Home
