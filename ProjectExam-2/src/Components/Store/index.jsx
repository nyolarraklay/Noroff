import { create } from 'zustand';




const useStore = create((set) => ({
    venues: [],
    bookings: [],
    venue: [],
    user: [],
  

   

    fetchVenues: async () => {
     try {
        set((state)=>({...state, venues: []}));
        const response = await fetch('https://v2.api.noroff.dev/holidaze/venues/');
        const json = await response.json();
        const data = json.data;
        set((state)=>({...state, venues: data}));
     } catch (error) {
        console.log(error);
        set((state)=>({...state, venues: []}));
     }
    },

    fetchVenue: async (id) => {
      try 
      {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}/?_bookings=true`);
        const json = await response.json();
        const data = json.data;
        set((state)=>({...state, venue: data}));
      } catch (error) {
        console.log(error);
        set((state)=>({...state, venue: []}));
      }
      },

      logIn: async(data) =>{
        try 
        {
          const response = await fetch(`https://v2.api.noroff.dev/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    
          if (response.ok) {
            const json = await response.json();
            const user = json.data;
            const accessToken = user.accessToken;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', user.name);
         
            return user;

            
          }
          
          const responseBody = await response.text();
          alert(`Error: incorrect username or password`);
          throw new Error("incorrect username or password");
          
            
        } catch (error) {
          console.log(error);
          throw error;
        }
        },

        apiKey: async(accessToken) => {
          try {
            const response = await fetch('https://v2.api.noroff.dev/auth/create-api-key',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
             
            const json = await response.json();
            const data = json.data;
            const myKey = data.key;
            localStorage.setItem('apiKey', myKey);
          } catch (error) {
            console.log(error);
          }
        },

        bookNow: async(checkInDate, checkOutDate, guests, venueID) => {
          try {
            if (!checkInDate || !checkOutDate || !guests || !venueID) {
              throw new Error('Missing parameters in booking request');
            }

            const response = await fetch('https://v2.api.noroff.dev/holidaze/bookings', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
            dateFrom: checkInDate,
            dateTo: checkOutDate,
            guests: guests,
            venueId: venueID
              }),
            });
            if (!response.ok) {
              throw new Error('Failed to book venue');
            }

            const json = await response.json();
            alert('Booking successful!');
            console.log(json);
          } catch (error) {
            console.log(error);
            throw error;
          }
        },

        allBookings: async(userName) => {
          try {
            set((state)=>({...state, bookings: []}));
            const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}/bookings`, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": localStorage.getItem('apiKey'),
              },
            });
            const json = await response.json();
            const data = json.data;
            set((state)=>({...state, bookings: data}));
          } catch (error) {
            console.log(error);
            set((state)=>({...state, bookings: []}));
          }
        },

        editBooking: async(checkInDate, checkOutDate, guests, venueID, bookerID) => {
          try {
            if (!checkInDate || !checkOutDate || !guests || !venueID) {
              throw new Error('Missing parameters in booking request');
            }

            const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${bookerID}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
            dateFrom: checkInDate,
            dateTo: checkOutDate,
            guests: guests,
              }),
            });
            if (!response.ok) {
              throw new Error(`Failed to edit booking. Status: ${response.status}`);
            }

            const json = await response.json();
            alert('Booking updated!');
            console.log(json);
          } catch (error) {
            console.error('Error in editBooking:', error); 
            throw error;
          }
        },

        deleteBooking: async(bookerID) => {
          try {
            const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${bookerID}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "X-Noroff-API-Key": localStorage.getItem('apiKey'),
              },
            });
            if (!response.ok) {
              throw new Error('Failed to delete booking');
            }
            
            alert('Booking deleted!');
          } catch (error) {
            console.log(error);
            throw error;
          }
        },

}));

export default useStore;