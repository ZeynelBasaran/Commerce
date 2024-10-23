import React from 'react';
import { useFormik } from 'formik';
import "../Pages/pages.css"
import { RegisterForm } from "../Schemas/RegisterForm"
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



function User() {
    /*const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        */



    const submits = (values, action) => {
        console.log(values)
        console.log(action)
        setTimeout(() => { action.resetForm() }, 300)

    }

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            mail: "",
            password: "",
        },
        validationSchema: RegisterForm,
        onSubmit: submits
    })

    return (
        <section className='container register p-6'>
            <form action="" onSubmit={handleSubmit}>
                <h5>Kayıt Ol</h5>
                <div className='my-4'>
                    <label>Mail</label>
                    <input type="mail" className='register-inp' placeholder='Lütfen mail giriniz...' id='mail' value={values.mail} onChange={handleChange} />
                    {touched.mail && errors.mail && <p className='register-error'>{errors.mail}</p>}
                </div>
                <div className='my-4'>
                    <label>Şifre</label>
                    <input type="password" className='register-inp' placeholder='Şifrenizi girin.' id='password' value={values.password} onChange={handleChange} />
                    {touched.password && errors.password && <p className='register-error'>{errors.password}</p>}
                </div>

                <div className='flex flex-col gap-y-4'>

                    <Button variant="contained" className='' type='submit' >Giriş Yap</Button>
                    <Button variant="contained" className='' startIcon={<GoogleIcon />} >Google ile devam et</Button>


                </div>

            </form>
        </section>
    )
}

export default User