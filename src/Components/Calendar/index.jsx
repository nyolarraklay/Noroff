import { Calendar, theme } from 'antd';
import moment from 'moment';


function BookingCalendar({ isBooked }) {



    const { token } = theme.useToken();

    const wrapperStyle = {
        width: 'auto',
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const startYear = moment().startOf('year');
    const endYear = moment().endOf('year').add(5, 'years'); 

    return (
        <div style={wrapperStyle}>
            <Calendar
                mode="month"
                validRange={[startYear, endYear]}
                disabledDate={(current) => {
                    const date = current.format("YYYY-MM-DD");
                    return current < moment().startOf('day') || isBooked.some((booking) => {
                        return date >= booking.start && date <= booking.end;
                    });
                }}
                cellRender={(value) => {
                    const date = value.format("YYYY-MM-DD");
                    const booked = isBooked.some((booking) => {
                        return date >= booking.start && date <= booking.end;
                    });

                    return booked ? <div className="text-red-500">Booked</div> : null;
                }}
                onSelect={(value) => {
                    localStorage.setItem('selectedCheckIn', value.format("YYYY-MM-DD"));

                }
                }
            />
        </div>
    );
}

export default BookingCalendar;