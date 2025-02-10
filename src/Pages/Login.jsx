
import { useFormik } from 'formik';
import { UserSchemas } from '../Schemas/UserSchemas';
import "../Pages/pages.css"
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { auth } from "../Firebase"
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router';
import { useContext, useEffect } from 'react';
import { ContextPage } from '../ContextApi/ContextPage';


const provider = new GoogleAuthProvider();

function Login() {
    const navigate = useNavigate()
    const { setUserActive, userActive } = useContext(ContextPage)

    const signUpWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, provider)

            if (response.user) {
                toast.success("Giriş Yapıldı.")
                navigate("/")
                setUserActive(true)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const signUpUser = async (values, action) => {
        try {
            const response = await signInWithEmailAndPassword(auth, values.mail, values.password)
            response.user;
            console.log(response)
            if (response.user) {
                toast.success("Giriş Yapıldı.")
                navigate("/")
                setUserActive(true)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            mail: "",
            password: "",
        },
        validationSchema: UserSchemas,
        onSubmit: signUpUser
    })


    useEffect(() => {
        localStorage.setItem("userActive", userActive)
    }, [userActive])


    return (
        <section className="flex-grow bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col  px-6 py-8 mx-auto  lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Kullanıcı Girişi Yap
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div className='flex flex-col gap-y-4'>

                                <Button onClick={signUpWithGoogle} variant="contained" className=' bg-pink-700 text-white hover:bg-pink-800  focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800' startIcon={<GoogleIcon />} >Google ile Giriş yap</Button>

                            </div>
                            <div className="flex items-center justify-center">
                                <div className=" bg-pink-600 h-1 grow"></div>
                                <span className="mx-4  text-gray-500 dark:text-white ">Veya</span>
                                <div className="bg-pink-600 h-1 grow"></div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                                <input type="mail" name='mail' id='mail' value={values.mail} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                {touched.mail && errors.mail && <p className='register-error'>{errors.mail}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name='password' id='password' value={values.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                {touched.password && errors.password && <p className='register-error'>{errors.password}</p>}

                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Beni unutma</label>
                                    </div>
                                </div>

                            </div>
                            <button type="submit" className=" bg-pink-700 text-white hover:bg-pink-800  focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Giriş Yap</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Henüz bir hesabın yok mu? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Kayıt Ol</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>


    )
}

export default Login;




