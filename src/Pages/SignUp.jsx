import React from 'react';
import { useFormik } from 'formik';
import { UserSchemas } from '../Schemas/UserSchemas';
import "../Pages/pages.css"
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase"
import { toast } from 'react-toastify';





function User() {

    const registerUser = async (values, action) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, values.mail, values.password)
            const user = response.user
            if (user) {
                toast.success("Kullanıcı oluşturuldu.")
                setTimeout(() => { action.resetForm() }, 300)
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
        onSubmit: registerUser
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
                    <Button variant="contained" className='' type='submit' >Kayıt Ol</Button>
                    <Button variant="contained" className='' startIcon={<GoogleIcon />} >Google ile kayıt ol</Button>
                </div>

            </form>
        </section>
    )
}

export default User