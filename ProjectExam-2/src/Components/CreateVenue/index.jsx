
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useStore from '../Store'

const schema = yup.object({
    name: yup.string().required().min(3, "Name must be at least 3 characters long"),
    description: yup.string().required().min(3, "Description must be at least 3 characters long"),
    price: yup.number().required().positive().min(1, "Price must be at least 1"),
    maxGuests: yup.number().required().positive().min(1, "Max guests must be at least 1"),
}).required()



function CreateVenueForm() {
    const { createVenue, editVenue, deleteVenue } = useStore();
  let { venueManager, venueId } = useParams();
  const [selectedValue, setSelectedValue] = useState(1);

  const handleChange = (e) => {
    setSelectedValue(parseInt(e.target.value));
  };
  const [wifiStatus, setWifiStatus] = useState(true);
  const [breakfastStatus, setBreakfastStatus] = useState(true);
  const [parkingStatus, setParkingStatus] = useState(true);
  const [petsStatus, setPetsStatus] = useState(true);

  const navigate = useNavigate();
  

  const handleWifiChange = (e) => {
    e.target.value === 'true' ? setWifiStatus(true) : setWifiStatus(false);
  };

  const handleBreakfastChange = (e) => {
    e.target.value === 'true' ? setBreakfastStatus(true) : setBreakfastStatus(false);
  };

  const handleParkingChange = (e) => {
   e.target.value === 'true' ? setParkingStatus(true) : setParkingStatus(false);
  };

  const handlePetsChange = (e) => {
    e.target.value === 'true' ? setPetsStatus(true) : setPetsStatus(false);
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


const onSubmit = async  (data) => {
    const formData = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        maxGuests: parseInt(data.maxGuests),
        rating: selectedValue,
        meta: {
            wifi: wifiStatus,
            parking: parkingStatus,
            breakfast: breakfastStatus,
            pets: petsStatus
        },
        location: {
            address: data.address,
            city: data.city,
            country: data.country,
            continent: data.continent,
            zip: data.zip
        },
        media: inputs.map(input => ({url: input.value, alt: "Alt text for image"}))
        
    }
    {venueManager ? await editVenue(formData, venueId) : await createVenue(formData)}

    navigate('/bookings');

}

const handleDelete = async () => {
    await deleteVenue(venueId);
    navigate('/bookings');

}

  return (
    <div className="max-w-lg mx-auto p-10">
    <h2 className="text-2xl font-bold mb-4">{!venueManager ? "Create a Venue" : " Edit Venue" }</h2>
    <form onSubmit={handleSubmit(onSubmit)} >
        <div className='grid gap-4'>
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
                    <p className="form-errors">{errors.maxGuests?.message}</p>
                </div>

            </div>
                         
        <div>
            {/* rating */}
            <div className="col-span-2 ">
                <label htmlFor="rating" className='me-2'>Select rating:</label>
                <select id="rating" {...register("rating")} value={selectedValue} onChange={handleChange}>
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
                        value='true'
                        checked={wifiStatus === true}
                        onChange={handleWifiChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="false"
                        checked={wifiStatus === false}
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
                        value="true"
                        checked={parkingStatus === true}
                        onChange={handleParkingChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="false"
                        checked={parkingStatus === false}
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
                        value="true"
                        checked={breakfastStatus === true}
                        onChange={handleBreakfastChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="false"
                                checked={breakfastStatus === false}
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
                        value="true"
                        checked={petsStatus === true}
                        onChange={handlePetsChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        value="false"
                        checked={petsStatus === false}
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
                <div className='col-span-2'>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">address</label>
                    <input {...register("address")} type="text" name="address" id="address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">city</label>
                    <input {...register("city")} type="text" name="city" id="city" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">country</label>
                    <input {...register("country")} type="text" name="country" id="country" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
                <div>
                    <label htmlFor="continent" className="block text-sm font-medium text-gray-700">continent</label>
                    <input {...register("continent")} type="text" name="continent" id="continent" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>   
                <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">zip</label>
                    <input {...register("zip")}type="text" name="zip" id="zip" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
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
                        <label htmlFor={`images${input.id}`} className="block text-sm font-medium text-gray-700">
                            Image Url
                        </label>
                        <input
                            type="text"
                            name={`images${input.id}`}
                            id={`images${input.id}`}
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
      <div className="flex justify-center mb-5 ">
            <button type="submit" className="bg-black text-white px-2 py-2 rounded-md">{!venueManager ? "Create Venue" : " Edit Venue" }</button>
            
      </div>
    </form>
    {venueManager && <div className="flex justify-center "><button className="bg-black text-white px-4 py-2 rounded-md " onClick={handleDelete}>Delete</button></div>}
   
    </div>
  )
}
export default CreateVenueForm