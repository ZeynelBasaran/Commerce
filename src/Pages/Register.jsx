import React from 'react'
import { useFormik } from 'formik';
import "../Pages/pages.css"

function Register() {
    const { values, handleChange, handleSubmit, errors, } = useFormik({
        initialValues: {
            name: "",
            surname: "",
            mail: "",
            password: "",
            confirmpassword: ""
        },
    })


    return (
        <section className='container register'>
            <form action="">
                <h5>Kayıt Ol</h5>

                <div className='flex my-1'>
                    <div>
                        <label>Adınız</label>
                        <input type="text" placeholder='Adınız' id='firstname' name="firstname" value={values.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Soyadınız</label>
                        <input type="text" placeholder='Soyadınız' id='surname' name='surname' value={values.surname} onChange={handleChange} />
                    </div>



                </div>

                <div className='my-1'>
                    <label>Mail</label>
                    <input type="mail" placeholder='Lütfen mail giriniz...' id='mail' name='mail' value={values.mail} onChange={handleChange} />
                </div>
                <div className='my-1'>
                    <label>Şifre</label>
                    <input type="password" placeholder='Şifrenizi girin.' id='password' name='pass' value={values.pass} onChange={handleChange} />
                </div>
                <div className='my-1'>
                    <label>Şifre</label>
                    <input type="password" placeholder='Şifrenizi girin tekrar giriniz.' id='confirmpassword' name='pass' value={values.pass} onChange={handleChange} />
                </div>

                <div className='my-1'>
                    <button>Kayıt Ol</button>
                </div>

            </form>
        </section>
    )
}

export default Register