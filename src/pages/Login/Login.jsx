import React, { useState } from 'react'
import "./Login.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useFirebase } from "../../context/AuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Signup = () => {

  const navigate = useNavigate()
  const { signing, toast, Toaster } = useFirebase();
  const [showPassword, setShowPassword] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)



  const schema = yup.object().shape({
    email: yup.string().email("email is not valid").required(),
    password: yup.string().min(6).max(15).required()
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })



  const onSubmit = (data) => {
    setSubmitDisabled(true)
    const { email, password } = data;
    signing(email, password).then((e) => {
      console.log(e);
      toast.success("Login Successfull")
      navigate("/")

    }).catch((e) => toast.error(e.message))
      .finally(() => setSubmitDisabled(false))
  }

  return (
    <div className='signup'>
      <Toaster />
      <div className="container">
        <h2 className="center">Login</h2>
        <p className="center">Let get started with your 30 days free trial.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-con">
            <input type="email" {...register("email")} required />
            <label htmlFor="name">Email</label>
            <small className="error">{errors.email?.message}</small>
          </div>
          <div className="input-con password">
            <input type={showPassword ? "text" : "password"} {...register("password")} required />
            <label htmlFor="name">Password</label>
            {
              showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />
            }
            <small className="error">{errors.password?.message}</small>
          </div>
          <button className='center submit' disabled={submitDisabled} type='submit'>Login</button>
          <small className='center'>Create account? <Link to={"/signup"}>Signup</Link></small>
          <hr />
        </form>
        {/* <button className="google">
          <div>
            <img src={google} onClick={handleGoogleSignIn} alt="" />
            Sign Up With Google
          </div>
        </button> */}
        <small className='tc'>by signing up to create an account i accept company's <b>tearms of use and privacy policy.</b></small>
      </div>
    </div>
  )
}

export default Signup

