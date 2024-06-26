import { create } from 'zustand';




const useStore = create((set) => ({
    venues: [],
    bookings: [],
    venue: [],
    user: [],
    users: [],
    isLoggedIn: localStorage.getItem('loggedIn') === 'true' ? true : false,
    isVenueManager: false,
    createdVenues: [],
  

   

    fetchVenues: async () => {
     try {
        set((state)=>({...state, venues: []}));
        const response = await fetch('https://v2.api.noroff.dev/holidaze/venues/?sortOrder=desc');
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
        set((state)=>({...state, createdVenues: [...state.createdVenues, data], venue: data}));
       
      } catch (error) {
        console.log(error);
        set((state)=>({...state, createdVenues: []}));
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
            localStorage.setItem('loggedIn', true);
            set((state)=>({...state, isLoggedIn: true}));
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
            set((state)=>({...state, isLoggedIn: true}));
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
            set((state)=>({...state, bookings: data, isLoggedIn: true}));
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
            set((state)=>({...state, isLoggedIn: true}));
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
            set((state)=>({...state, isLoggedIn: false, bookings: []}));
            alert('Booking deleted!');
          } catch (error) {
            console.log(error);
            throw error;
          }
        },

        registerNewUser: async(formData, isVenueManager) => {
          try 
          {
            const response = await fetch(`https://v2.api.noroff.dev/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
            const json = await response.json();
            const user = json.data;
            set((state)=>({...state, user: user, isVenueManager: isVenueManager}));
            alert('Account created successfully, please log in to continue.')

          } catch (error) {
            console.log(error);
          
          }
          },

          editProfile: async(data) => {
            try {
              const userName = localStorage.getItem('user');
              const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}`, {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
              if (!response.ok) {
                throw new Error('Failed to edit profile');
              }
            set((state)=>({...state, isLoggedIn: true}));
              alert('Profile updated!');
            } catch (error) {
              console.log(error);
              throw error;
            }
          },

          userProfile: async() => {
            try {
              const userName = localStorage.getItem('user');
              const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                },
              });
              const json = await response.json();
              const user = json.data;
              set((state)=>({...state, user: user, isLoggedIn: true}));
            } catch (error) {
              console.log(error);
            }
          },

          logOut: async() => {
            try {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('apiKey');
              localStorage.removeItem('user');
              localStorage.removeItem('loggedIn');
              set((state)=>({...state, isLoggedIn: false}));
              alert('Logged out successfully');
            } catch (error) {
              console.log(error);
            }
          },

          searchProfiles: async(query) => {
            try {
              const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/search?q=${query}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                },
              });
              const json = await response.json();
              const data = json.data;
              return data;
            } catch (error) {
              console.error("Error searching profiles:", error);
              return null;
            }
          },

          searchVenues: async(query) => {
            try {
              const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/search?q=${query}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                },
              });
              const json = await response.json();
              const data = json.data;
              return data;
            } catch (error) {
              console.error("Error searching venues:", error);
              return null;
            }
          },

          createVenue: async(data) => {
            try {
              const response = await fetch('https://v2.api.noroff.dev/holidaze/venues', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
              if (!response.ok) {
                throw new Error('Failed to create venue');
              }
              set((state)=>({...state, createdVenues: []}));
              alert('Venue created!');
            } catch (error) {
              console.log(error);
              throw error;
            }
          },

          editVenue: async(data, venueID) => {
            try {
              const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueID}`, {
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
              if (!response.ok) {
                throw new Error('Failed to edit venue');
              }
              set((state)=>({...state, createdVenues: []}));
              alert('Venue updated!');
            } catch (error) {
              console.log(error);
              throw error;
            }
          },

          deleteVenue: async(venueID) => {
            try {
              const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueID}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                  "X-Noroff-API-Key": localStorage.getItem('apiKey'),
                },
              });
              if (!response.ok) {
                throw new Error('Failed to delete venue');
              }
              set((state)=>({...state, createdVenues: []}));
              alert('Venue deleted!');
            } catch (error) {
              console.log(error);
              throw error;
            }
          },



}));

export default useStore;