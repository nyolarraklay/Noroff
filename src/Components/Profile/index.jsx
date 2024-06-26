import { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form'
import useStore from '../Store'
import Loader from '../Loader'

function MyProfile() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { userProfile, user, editProfile } = useStore()
    const [isLoading, setIsLoading] = useState(false);

 
    const onSubmit = async (data) => {
        setIsLoading(true);
        const formData = {
            bio : data.bio,
            avatar: {
                alt: "Alt text for avatar", 
                url: data.avatar
            },
            banner: {
                alt: "Alt text for banner",
                url: data.banner
            },
           
        };
    
       await editProfile(formData);
        setIsLoading(false);
    }
    useEffect(() => {
        const loadProfile = async () => {
            setIsLoading(true);
        await userProfile();
        setIsLoading(false);
        }
        loadProfile();  
    }, [userProfile])



  return (
    <div>
    {isLoading ? (
        <div className="text-center">Loading...</div>
    ) : (
        <>
        <div className="max-w-lg mx-auto mt-8 p-10">
    <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
 <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
        <div className="grid gap-y-2 gap-x-2">
            {/* Name */}               
            <div className="col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input {...register("name")} type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder={user.name} disabled/>
                <p className="form-errors">{errors.name?.message}</p>
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input {...register("email")} type="email" name="email" id="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder={user.email} disabled />
                <p className="form-errors">{errors.email?.message}</p>
            </div>
            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input {...register("password")} type="password" name="password" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" disabled />
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
            {isLoading && <Loader/>} 
        </div>
      <div className="flex justify-center">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Edit Profile</button>
            </div>
    </form>
   
        </div>
        </>
    )}
    </div>   
  )
}

export default MyProfile