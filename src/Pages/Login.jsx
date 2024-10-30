
import { useFormik } from 'formik';
import { UserSchemas } from '../Schemas/UserSchemas';
import "../Pages/pages.css"
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { auth } from "../Firebase"
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { ContextPage } from '../ContextApi/ContextPage';


const provider = new GoogleAuthProvider();

function Login() {
    const navigate = useNavigate()
    const {setUserActive,setUserInfo,userInfo} = useContext(ContextPage)

    const signUpWithGoogle = async()=>{
        try {
            const response = await signInWithPopup(auth,provider)
            
            if(response.user){
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
            if(response.user){
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

  return (
    <section className='container register p-6'>
    <form onSubmit={handleSubmit}>
        <h5>Kayıt Ol</h5>
        <div className='my-4'>
            <label>Mail</label>
            <input type="mail" className='register-inp' placeholder='Lütfen mail giriniz...' name='mail' id='mail' value={values.mail} onChange={handleChange} />
            {touched.mail && errors.mail && <p className='register-error'>{errors.mail}</p>}
        </div>
        <div className='my-4'>
            <label>Şifre</label>
            <input type="password" className='register-inp' placeholder='Şifrenizi girin.' name='password' id='password' value={values.password} onChange={handleChange} />
            {touched.password && errors.password && <p className='register-error'>{errors.password}</p>}
        </div>

        <div className='flex flex-col gap-y-4'>
            <Button variant="contained" className='' type='submit' color='' >Giriş Yap</Button>
            <Button onClick={signUpWithGoogle} variant="contained" className='' startIcon={<GoogleIcon />} >Google ile Giriş yap</Button>
        </div>

    </form>
</section>
  )
}

export default Login