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
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
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
console.log(checkInDate, checkOutDate, guests, venueID);
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
            console.log(json);
          } catch (error) {
            console.log(error);
            throw error;
          }
        },

}));

export default useStore;