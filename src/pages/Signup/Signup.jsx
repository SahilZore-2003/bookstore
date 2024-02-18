import React, { useState } from 'react'
import "./Signup.scss"
import { Link, useNavigate } from 'react-router-dom'
import google from "../../assets/google.svg"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useFirebase } from "../../context/AuthContext"
import { } from 'react-hot-toast'
import { FaEye, FaEyeSlash } from "react-icons/fa";



const Signup = () => {

  const { signUpUserWithEmailandPassword, toast, Toaster, signWithGoogle, navigate } = useFirebase();
  const [showPassword, setShowPassword] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  


  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email("email is not valid").required(),
    password: yup.string().min(6).max(15).required()
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  })



  const onSubmit = (data) => {
    setSubmitDisabled(true)
    const { email, password, name } = data;
    signUpUserWithEmailandPassword(email, password)
      .then((val) => {
        toast.success("Your sign in successfully !")
        navigate("/")
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }

  const handleSignInWithGoogle = () => {
    signWithGoogle().then((e) => {
      toast.success("sign in with google done!");
      navigate("/")
    }).catch((e) => toast.error("something went wrong"))
  }

  return (
    <div className='signup'>
      <Toaster />
      <div className="container">
        <h2 className="center">Sign Up</h2>
        <p className="center">Let get started with your 30 days free trial.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-con">
            <input type="text" {...register("name")} required />
            <label htmlFor="name">Name</label>
            <small className="error">{errors.name?.message}</small>
          </div>
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
          <button className='center submit' disabled={submitDisabled} type='submit'>Sign Up</button>
          <small className='center'>Already have an account? <Link to={"/login"}>Login</Link></small>
          <hr />
        </form>
        <button className="google" onClick={handleSignInWithGoogle}>
          <div>
            <img src={google} alt="" />
            Sign Up With Google
          </div>
        </button>
        <small className='tc'>by signing up to create an account i accept company's <b>tearms of use and privacy policy.</b></small>
      </div>
    </div>
  )
}

export default Signup
