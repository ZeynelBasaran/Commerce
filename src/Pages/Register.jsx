import React from 'react'
import { useFormik } from 'formik';
import "../Pages/pages.css"
import { RegisterForm } from '../Schemas/RegisterForm';

function Register() {
    const submit = (values, action) => {
        console.log(values)
        console.log(action)
        setTimeout(() => { action.resetForm() }, 300)

    }

    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
        initialValues: {
            firstname: "",
            surname: "",
            mail: "",
            password: "",
            confirmpassword: "",
            term: "",
        },
        validationSchema: RegisterForm,
        onSubmit: submit
    })



    return (
        <section className='container register p-6'>
            <form action="" onSubmit={handleSubmit}>
                <h5>Kayıt Ol</h5>

                <div className='flex my-1 gap-x-6'>
                    <div className='w-full'>
                        <label>Adınız</label>
                        <input type="text"
                            className='register-inp' placeholder='Adınız' id='firstname' value={values.firstname} onChange={handleChange} />
                        {touched.firstname && errors.firstname && <p className='register-error'>{errors.firstname}</p>}

                    </div>
                    <div className='w-full'>
                        <label>Soyadınız</label>
                        <input type="text"
                            className='register-inp' placeholder='Soyadınız' id='surname' value={values.surname} onChange={handleChange} />
                        {touched.surname && errors.surname && <p className='register-error'>{errors.surname}</p>}
                    </div>
                </div>

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
                <div className='my-4'>
                    <label>Şifre</label>
                    <input type="password" className='register-inp' placeholder='Şifrenizi girin tekrar giriniz.' id='confirmpassword' value={values.confirmpassword} onChange={handleChange} />
                    {touched.confirmpassword && errors.confirmpassword && <p className='register-error'>{errors.confirmpassword}</p>}
                </div>
                <div className='my-4'>
                    <input type="checkbox" className='w-6' id='term' name='term' value={values.term} onChange={handleChange} />
                    <label>Kullanıcı sözleşmesini kabul ediyorum.</label>
                </div>
                {touched.term && errors.term && <p className='register-error'>{errors.term}</p>}

                <div className='my-4'>
                    <button type='submit' >Kayıt Ol</button>
                </div>

            </form>
        </section>
    )
}

export default Register