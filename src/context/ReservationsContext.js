import React, { createContext, useContext, useState } from 'react';

const ReservationsContext = createContext();

export function ReservationsProvider({ children }) {
  // [{rid, id, title, day, price, qty, status}]
  const [reservations, setReservations] = useState([]);

  // CRUD local minimal
  const addReservation = (meal, qty = 1) => {
    const newReservation = {
      rid: Date.now().toString(), // Simplified rid generation
      id: meal.id,
      title: meal.title || meal.name, // Handles potential name property
      price: meal.price,
      qty,
      day: meal.day,
      status: 'confirmé', // Hardcoded status
      image: meal.imageUrl || null, // Handles optional image
    };
    setReservations(prev => [...prev, newReservation]);
  };

  const updateReservation = (rid, patch) => {
    // This function was removed in the edited snippet.
    // If it's intended to be kept, it would need to be added back.
    // For now, it's omitted as per the edited snippet.
  };

  const removeReservation = (rid) => {
    setReservations(prev => prev.filter(r => r.rid !== rid));
  };

  const clearReservations = () => {
    setReservations([]);
  };

  // The memoized value is simplified as Firebase-related logic is removed.
  const value = {
    reservations,
    addReservation,
    removeReservation,
    clearReservations,
    // updateReservation is not included as it was removed from the edited snippet.
  };

  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error('useReservations must be used within ReservationsProvider');
  }
  return context;
}