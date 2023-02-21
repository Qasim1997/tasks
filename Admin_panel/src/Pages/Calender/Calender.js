import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useGetEventAllQuery } from 'services/userAuthApi';
import { getToken } from 'services/LocalStorage';
import { RotatingSquare } from 'react-loader-spinner';

const localizer = momentLocalizer(moment);

function Calender() {
    const event = [
        {
            title: 'All Day Event very long title',
            allDay: true,
            start: 'Sun Feb 12 2023 14:43:09 GMT+0500 (Pakistan Standard Time)',
            end: new Date()
        },
        {
            title: 'Long Event',
            start: new Date(2015, 3, 7),
            end: new Date(2015, 3, 10)
        },

        {
            title: 'DTS STARTS',
            start: new Date(2016, 2, 13, 0, 0, 0),
            end: new Date(2016, 2, 20, 0, 0, 0)
        },

        {
            title: 'DTS ENDS',
            start: new Date(2016, 10, 6, 0, 0, 0),
            end: new Date(2016, 10, 13, 0, 0, 0)
        },

        {
            title: 'Some Event',
            start: new Date(2015, 3, 9, 0, 0, 0),
            end: new Date(2015, 3, 9, 0, 0, 0)
        },
        {
            title: 'Conference',
            start: new Date(2015, 3, 11),
            end: new Date(2015, 3, 13),
            desc: 'Big conference for important people'
        },
        {
            title: 'Meeting',
            start: new Date(2015, 3, 12, 10, 30, 0, 0),
            end: new Date(2015, 3, 12, 12, 30, 0, 0),
            desc: 'Pre-meeting meeting, to prepare for the meeting'
        },
        {
            title: 'Lunch',
            start: new Date(2015, 3, 12, 12, 0, 0, 0),
            end: new Date(2015, 3, 12, 13, 0, 0, 0),
            desc: 'Power lunch'
        },
        {
            title: 'Meeting',
            start: new Date(2015, 3, 12, 14, 0, 0, 0),
            end: new Date(2015, 3, 12, 15, 0, 0, 0)
        },
        {
            title: 'Happy Hour',
            start: new Date(2015, 3, 12, 17, 0, 0, 0),
            end: new Date(2015, 3, 12, 17, 30, 0, 0),
            desc: 'Most important meal of the day'
        },
        {
            title: 'Dinner',
            start: new Date(2015, 3, 12, 20, 0, 0, 0),
            end: new Date(2015, 3, 12, 21, 0, 0, 0)
        },
        {
            title: 'Birthday Party',
            start: new Date(2015, 3, 13, 7, 0, 0),
            end: new Date(2015, 3, 13, 10, 30, 0)
        },
        {
            title: 'Birthday Party 2',
            start: new Date(2015, 3, 13, 7, 0, 0),
            end: new Date(2015, 3, 13, 10, 30, 0)
        },
        {
            title: 'Birthday Party 3',
            start: new Date(2015, 3, 13, 7, 0, 0),
            end: new Date(2015, 3, 13, 10, 30, 0)
        },
        {
            title: 'Late Night Event',
            start: new Date(2015, 3, 17, 19, 30, 0),
            end: new Date(2015, 3, 18, 2, 0, 0)
        },
        {
            title: 'Multi-day Event',
            start: new Date(2015, 3, 20, 19, 30, 0),
            end: new Date(2015, 3, 22, 2, 0, 0)
        }
    ];
    const token = getToken();
    const { data, isLoading } = useGetEventAllQuery({ token });
    console.log(event, 'event');

    if (isLoading) {
        return (
            <RotatingSquare
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="rotating-square-loading"
                strokeWidth="4"
                wrapperStyle={{}}
                wrapperclassName=""
                visible={true}
            />
        );
    }
    return (
        <div className="App">
            <Calendar localizer={localizer} defaultDate={new Date()} defaultView="month" events={data} style={{ height: '100vh' }} />
        </div>
    );
}

export default Calender;
