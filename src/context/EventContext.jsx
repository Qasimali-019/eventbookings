import React, { createContext, useState, useContext, useEffect } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Junior Park CC Presentation Night 2024",
      price: 5.00,
      date: "2024-11-02",
      organiser: "Junior Park CC",
      status: "Published",
      category: "Sports"
    },
    {
      id: 2,
      title: "Dedicated Day Out On the Green!!",
      price: 45.45,
      date: "2024-12-02",
      organiser: "Green Events",
      status: "Published",
      category: "Community"
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 1,
      eventId: 1,
      userName: "John Doe",
      tickets: 2,
      total: 10.00,
      status: "Confirmed",
      date: "2024-10-12"
    }
  ]);

  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: events.length + 1,
      status: "Published"
    };
    setEvents([...events, newEvent]);
    return newEvent;
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: bookings.length + 1,
      date: new Date().toISOString().split('T')[0]
    };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };

  return (
    <EventContext.Provider value={{ events, bookings, addEvent, deleteEvent, addBooking }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
