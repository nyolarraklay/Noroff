import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    name: yup.string().required().min(3, "Name must be at least 3 characters long"),
    email: yup.string().email("Must be a valid email address").matches(/.*@stud.noroff\.no$/, 'Email must be from noroff.no domain').required(),
    password: yup.string().required().min(8, "Password must be at least 8 characters long"),    
}).required()



function SignUp() {
    const [registerUser, setRegisterUser] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    async function registerNewUser(data) {
        try 
        {
          const response = await fetch(`https://v2.api.noroff.dev/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          const json = await response.json();
          const user = json.data;
          console.log(user);
         
            setRegisterUser(true);
        } catch (error) {
          console.log(error);
       
        }
        }

    const onSubmit = (data) => {
        console.log(data);
        registerNewUser(data)
    }

  return (
    <div className="max-w-lg mx-auto mt-8 p-10">
    <h2 className="text-2xl font-bold mb-4">Create Account</h2>
   <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-2 gap-x-2">
            {/* Name */}
            <div className="col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input {...register("name")} type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                <p className="form-errors">{errors.name?.message}</p>
            </div>
            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input {...register("email")} type="email" name="email" id="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                <p className="form-errors">{errors.email?.message}</p>
            </div>
            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input {...register("password")} type="password" name="password" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                <p className="form-errors">{errors.password?.message}</p>
            </div>
            {/* Bio */}
            <div className="col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Tagline</label>
                <input {...register("bio")} type="text" name="bio" id="bio" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Avatar */}
            <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
                <input type="text" name="avatar" id="avatar" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Banner */}
            <div>
                <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Banner</label>
                <input type="text" name="banner" id="banner" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>        
        
        </div>
        <div className="flex justify-center">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Create Account</button>
        </div>
    </form>
    <p className='text-center text-sm mt-3 font-bold'> <Link to={"/log-in"}>Already have an account? Log-In</Link> </p>
</div>

  )
}

export default SignUp