/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const {loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/

    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }
    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-pink-100 to-pink-200'>
            {loading && <Loader/>}
            {/* Signup Form  */}
            <div className="bg-white px-8 py-6 border border-pink-200 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-full max-w-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-extrabold text-pink-600'>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder='Full Name'
                        value={userSignup.name}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                name: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-300 px-4 py-2 w-full rounded-md outline-none placeholder-pink-300 focus:ring-2 focus:ring-pink-500'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value={userSignup.email}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                email: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-300 px-4 py-2 w-full rounded-md outline-none placeholder-pink-300 focus:ring-2 focus:ring-pink-500'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={userSignup.password}
                        onChange={(e) => {
                            setUserSignup({
                                ...userSignup,
                                password: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-300 px-4 py-2 w-full rounded-md outline-none placeholder-pink-300 focus:ring-2 focus:ring-pink-500'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userSignupFunction}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md shadow-md transition-transform transform hover:scale-105'
                    >
                        Signup
                    </button>
                </div>

                <div className='text-center'>
                    <h2 className='text-gray-700'>Have an account <Link className=' text-pink-500 font-bold hover:underline' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;
