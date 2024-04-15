import { create } from 'zustand';

const useStore = create((set) => ({
    venues: [],
    bookings: [],
    venue: [],

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
      }
}));

export default useStore;