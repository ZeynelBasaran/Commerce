import * as yup from "yup";

export const UserSchemas = yup.object().shape({
    mail: yup.string().email("Lütfen geçerli bir mail adresi giriniz.").required("Lütfen mail adresinizi giriniz."),
    password: yup.string().required("Lütfen geçerli bir şifre giriniz."),
})
