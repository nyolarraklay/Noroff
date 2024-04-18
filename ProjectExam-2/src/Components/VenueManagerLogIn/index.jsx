import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
    email: yup.string().email("Must be a valid email address").matches(/.*@noroff\.no$/, 'Email must be from noroff.no domain').required(),
    password: yup.string().required().min(8, "Password must be at least 8 characters long"),    
}).required()




function LogIn() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        console.log(data)
    }

  return (
    <div className="max-w-lg mx-auto mt-8 p-10">
    <h2 className="text-2xl font-bold mb-4">Log in as a Venue Manager</h2>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-y-2 gap-x-2">
            {/* Name */}
       
            {/* Password */}
            <div className="col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input {...register("email")} type="email" name="email" id="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                <p className="form-errors">{errors.email?.message}</p>
            </div>
        
            <div className="col-span-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input {...register("password")} type="text" name="password" id="password" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                <p className="form-errors">{errors.password?.message}</p>
            </div>
        </div>
        <div className="flex justify-center">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Log In</button>
        </div>
    </form>
    <p className='text-center text-sm mt-6 font-bold'><Link to="/sign-up/venue-manager">Create account</Link></p>
    <p className='text-center text-xs mt-2 font-bold'>By continuing, you confirm that you have read and agree to our terms and condition, our privacy policy, and bookipedia.com rewards terms and condition.</p>
</div>
  )
}

export default LogIn