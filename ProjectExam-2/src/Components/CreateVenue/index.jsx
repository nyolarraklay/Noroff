
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useStore from '../Store'

const schema = yup.object({
    name: yup.string().required().min(3, "Name must be at least 3 characters long"),
    email: yup.string().email("Must be a valid email address").matches(/.*@stud.noroff\.no$/, 'Email must be from noroff.no domain').required(),
    password: yup.string().required().min(8, "Password must be at least 8 characters long"),    
}).required()



function CreateVenueForm() {
  let { loggedIn } = useParams();
  const [selectedValue, setSelectedValue] = useState(1);

  const handleChange = (e) => {
    setSelectedValue(parseInt(e.target.value));
  };
  const [wifiStatus, setWifiStatus] = useState('yes');
  const [breakfastStatus, setBreakfastStatus] = useState('yes');
  const [parkingStatus, setParkingStatus] = useState('yes');
  const [petsStatus, setPetsStatus] = useState('yes');

  const handleWifiChange = (e) => {
    setWifiStatus(e.target.value);
  };

  const handleBreakfastChange = (e) => {
    setBreakfastStatus(e.target.value);
  };

  const handleParkingChange = (e) => {
    setParkingStatus(e.target.value);
  };

  const handlePetsChange = (e) => {
    setPetsStatus(e.target.value);
  };

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const [inputs, setInputs] = useState([{id: 1, value: ''}]);
    const handleAddInput = () => {
       
        const newInput = {id: inputs.length + 1, value: ''};
        setInputs([...inputs, newInput]);
    };
    const handleInputChange = (id, e) => {
        const newInputs = inputs.map(input =>
          input.id === id ? { ...input, value: e.target.value } : input
        );
        setInputs(newInputs);
      };

  return (
    <div className="max-w-lg mx-auto mt-8 p-10">
    <h2 className="text-2xl font-bold mb-4">Create a Venue</h2>
    <form className="space-y-4" >
        <div>
            <div className='grid gap-2'>
                {/* Name */}  
                <div className="col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input {...register("name")} type="text" name="name" id="name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    <p className="form-errors">{errors.name?.message}</p>
                </div>

            {/* Description */}
                <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <input {...register("description")} type="text" name="description" id="description" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    <p className="form-errors">{errors.description?.message}</p>
                </div>
            {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input {...register("price")} type="number" name="price" id="price" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    <p className="form-errors">{errors.price?.message}</p>
                </div>
            
            {/* maxGuests */}
                <div >
                    <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700">MaxGuests</label>
                    <input {...register("maxGuests")} type="number" name="maxGuests" id="maxGuests" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>

            </div>
                         
        <div>
            {/* rating */}
            <div className="col-span-2">
                <label htmlFor="rating">Select rating:</label>
                <select id="rating" value={selectedValue} onChange={handleChange}>
                    {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className='grid gap-2 grid-cols-2'>
            {/* Facilities */}
            <div >
                <p>WiFi:</p>
                <label>
                    <input
                        type="radio"
                        value="yes"
                        checked={wifiStatus === 'yes'}
                        onChange={handleWifiChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="no"
                        checked={wifiStatus === 'no'}
                        onChange={handleWifiChange}
                    />
                     No
                </label>
            </div>

            <div>
                <p>Parking:</p>
                <label>
                    <input
                        type="radio"
                        value="yes"
                        checked={parkingStatus === 'yes'}
                        onChange={handleParkingChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="no"
                        checked={parkingStatus === 'no'}
                        onChange={handleParkingChange}
                    />
                    No
                </label>
            </div>
            
            <div>
                <p>Breakfast:</p>
                <label>
                    <input
                        type="radio"
                        value="yes"
                        checked={breakfastStatus === 'yes'}
                        onChange={handleBreakfastChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="no"
                                checked={breakfastStatus === 'no'}
                        onChange={handleBreakfastChange}
                    />
                    No
                </label>
            </div>  

            <div>
                <p>Pets:</p>
                <label>
                    <input
                        type="radio"
                        value="yes"
                        checked={petsStatus === 'yes'}
                        onChange={handlePetsChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="no"
                        checked={petsStatus === 'no'}
                        onChange={handlePetsChange}
                    />
                    No
                </label>
            </div>  
        </div>
        {/* Location */}
        <div>
            <h2 className='font-bold'>Location</h2>
            <div className='grid gap-2 grid-cols-2'>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">address</label>
                    <input type="text" name="address" id="address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">city</label>
                    <input type="text" name="city" id="city" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">country</label>
                    <input type="text" name="country" id="country" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
                <div>
                    <label htmlFor="continent" className="block text-sm font-medium text-gray-700">continent</label>
                    <input type="text" name="continent" id="continent" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
                <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">zip</label>
                    <input type="text" name="zip" id="zip" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
            </div>
        </div>
        {/* Media */}
        <div>
            <h2 className='font-bold'> Images</h2>
            <div>
                <div>
                    {inputs.map(input => (
                    <div key={input.id} className="mb-4">
                        <label htmlFor={`banner${input.id}`} className="block text-sm font-medium text-gray-700">
                            Image Url
                        </label>
                        <input
                            type="text"
                            name={`banner${input.id}`}
                            id={`banner${input.id}`}
                            value={input.value}
                            onChange={e => handleInputChange(input.id, e)}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                    ))}
                    <p onClick={handleAddInput} className=" text-white font-bold py-2 px-4 rounded">
                    + Add Image
                    </p>
                </div> 
            </div>
        </div>
            
            
       
        
               
            
   
            
       
        
        </div>
      <div className="flex justify-center">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Create Venue</button>
      </div>
    </form>
   
    </div>
  )
}
export default CreateVenueForm