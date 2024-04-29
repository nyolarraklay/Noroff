import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'




function Calendar({isBooked}) {
    const today = new Date().toISOString().split('T')[0]; 

    const events = isBooked.map((booking, index) => {
     
  
        return {
            title: "Booked",
            start: booking.start,
            end: booking.end,
        };
    });
  

  return (
    <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView={"dayGridMonth"}
    events={
        {events}     
    }
    headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next'
      }}
      height='100vh'
      validRange={{ start: today }}
      
  />
  )
}

export default Calendar