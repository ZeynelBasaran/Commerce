import * as yup from "yup";

export const RegisterForm= yup.object().shape({
    firstname: yup.string().required("Lütfen adınızı giriniz."),
    surname: yup.string().required("Lütfen Soyadınızı giriniz."),
    mail: yup.string().email("Lütfen geçerli bir mail adresi giriniz.").required("Lütfen mail adresinizi giriniz."),
    password: yup.string().required("Lütfen geçerli bir şifre giriniz."),
    confirmpassword: yup.string().required("Lütfen geçerli bir şifre giriniz.").oneOf([yup.ref("password",yup.password)],"Şifreler aynı degil"),
    term: yup.boolean().required("Onaylanması zorunludur.")

})
