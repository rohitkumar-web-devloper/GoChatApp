import * as yup from 'yup';
let SignUpSchema = yup.object({
    fullName: yup?.string().min(3, "Enter atleast 3 character").required("Enter your name"),
    email: yup?.string().email().required("Enter Valid Email"),
    password: yup?.string().required("Enter correct password"),
    confirmPassword: yup?.string().oneOf([yup.ref("password"), null], "Password must be match")

});
export default SignUpSchema;