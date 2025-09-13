import React, { useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Label from '../components/ui/Label'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import { authApi } from '../lib/api'
import {jwtDecode} from 'jwt-decode';

function LoginPage() {
    const [mode, setMode] = useState("login")
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

        const navigate = useNavigate();
        const handleformSubmit = async (data) => {
            if (mode === "login") {
                try {
                    const res = await authApi.login(data);

                    if (res.data.token) {
                        localStorage.setItem("token", res.data.token);
                        const user = jwtDecode(res.data.token);
                        localStorage.setItem("user", JSON.stringify(user));
                        message.success("Login successful!");
                        navigate("/dashboard");
                    } else {
                        message.error("Login failed: No token received");
                    }
                } catch (err) {
                    message.error(err?.response?.data?.message || "Login failed");
                }
            } else {
                // handle signup
                try {
                    await authApi.register(data);
                    message.success("Signup successful! Please login.");
                    setMode("login");
                } catch (err) {
                    message.error(err?.response?.data?.message || "Signup failed");
                }
            }
        };

        

    return (
        <div className='h-screen flex flex-row justify-between '>
            <div className=' hidden md:w-1/2 bg-black md:flex flex-col justify-center items-center'>
                <h1 className='text-white text-4xl font-bold'>Welcome to Finance Manager</h1>
                <p className='text-gray-300 mt-4'>Manage your finances effectively and effortlessly.</p>
            </div>
            <div className='md:w-1/2 m-6 w-full flex flex-col justify-center items-center'>
            <div className='md:hidden'>
                <h1 className='text-3xl font-bold text-center mb-2'>Finance Manager</h1>
                <p className='text-gray-500 text-center mb-6'>Track your income and expenses with ease</p>
            </div>
                <Card
                    className={"md:w-3/4 flex flex-col gap-2 "}
                    heading={mode === "login" ? '➜] Login to your account' : "👤 Create your account"}
                    subHeading={mode === "login" ? "Welcome back! Please enter your details." : "Welcome! Please enter your details to create your account."}
                >
                    <div className='flex flex-row gap-1 justify-center bg-slate-100 rounded-lg'>
                        <Button className={`px-2 hover:bg-white py-1 m-1 w-1/2 ${mode === "login" ? 'bg-white text-black' : 'bg-slate-100 text-gray-500'}`} onClick={() => setMode("login")}>login</Button>
                        <Button className={`px-2 hover:bg-white py-1 m-1 w-1/2 ${mode === "signup" ? 'bg-white text-black' : 'bg-slate-100 text-gray-500'}`} onClick={() => setMode("signup")}>Sign Up</Button>
                    </div>
                    <form onSubmit={handleSubmit(handleformSubmit)} className='flex flex-col justify-center'>

                         {
                        mode === "signup" && <div className='mt-2'>
                            <Label htmlFor={"Name"}>Name :</Label>
                            <Input {...register("name",{
                                required: "Name is required"
                            })} placeholder={"enter your full name"}></Input>
                        </div>
                    }
                    <div className='mt-2'>
                        <Label htmlFor={"Email"}>Email :</Label>
                        <Input {...register("email",{
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address"
                            }
                        })} placeholder={"enter your email"}></Input>
                    </div>
                    <div className='mt-2'>
                        <Label htmlFor={"Email"}>Password :</Label>
                        <Input
                        {...register("password",{
                            required: "Password is required"} )}
                         placeholder={"enter your password"}
                          type="password"></Input>
                    </div>
                    
                    <Button type="submit" className={"mx-auto mt-6 bg-black text-white w-[130px]"}>{mode === "login" ? "Login" : "Sign Up"}</Button>
                    </form>
                   
                </Card>
            </div>
        </div>
    )
}

export default LoginPage
