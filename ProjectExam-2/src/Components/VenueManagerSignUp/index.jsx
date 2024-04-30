import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'
import useStore  from '../Store'

const schema = yup.object({
    name: yup.string().required().min(3, "Name must be at least 3 characters long"),
    email: yup.string().email("Must be a valid email address").matches(/.*@stud.noroff\.no$/, 'Email must be from noroff.no domain').required(),
    password: yup.string().required().min(8, "Password must be at least 8 characters long"),    
}).required()



function VenueManagerSignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const [isVenueManager, setIsVenueManager] = useState(true);
    const {registerNewUser, logIn} = useStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const navigate = useNavigate();

    
    const onSubmit = async (data) => {

        setIsLoading(true);

        const formData = {
            name: data.name,
            email: data.email,
            password: data.password,
            bio: data.bio,
            avatar: {
                alt: "Alt text for avatar", 
                url: data.avatar
            },
            banner: {
                alt: "Alt text for banner",
                url: data.banner
            },        
            venueManager: isVenueManager
        };

        const logInData = {
            email: data.email,
            password: data.password
        }
        
      await  registerNewUser(formData, isVenueManager);
        await logIn(logInData);
        setTimeout(() => {
            navigate('/managers-profile')},1000);

        setIsLoading(false);
    }

    const handleVenueManagerChange = (event) => {
        setIsVenueManager(event.target.value === "true");
    };


  return (
    <div className="max-w-lg mx-auto mt-8 p-10">
    <h2 className="text-2xl font-bold mb-4">Create an account as a Venue Manager</h2>
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
                <input {...register("password")} type="text" name="password" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
                <input {...register("avatar")} type="text" name="avatar" id="avatar" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>
            {/* Banner */}
            <div>
                <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Banner</label>
                <input {...register("banner")} type="text" name="banner" id="banner" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
            </div>    
             {/* Are you a venue manager? */}
            <div>
                        <label className="block text-sm font-medium text-gray-700">Are you a venue manager?</label>
                        <div className="mt-1">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio" name="isVenueManager"  value= "true"  onChange={handleVenueManagerChange} />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input disabled type="radio" className="form-radio" name="isVenueManager" value= "false" onChange={handleVenueManagerChange} />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
            </div>   
            {isLoading && <div>Loading...</div>} 
        </div>
        <div className="flex justify-center">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Create Account</button>
        </div>
    </form>
    <p className='text-center text-sm mt-3 font-bold'> <Link to={"/log-in"}>Already have an account? Log-In</Link> </p>
</div>

  )
}

export default VenueManagerSignUp