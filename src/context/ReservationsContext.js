
import React, { createContext, useContext, useState } from 'react';

const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const addReservation = (orderData) => {
    const newReservation = {
      id: Date.now().toString(),
      code: orderData.code || `BX-${Date.now().toString().slice(-6)}`,
      items: orderData.items || [],
      total: orderData.total || 0,
      status: 'Préparation',
      date: new Date().toISOString(),
      pickupTime: orderData.pickupTime || null,
      pickupLocation: orderData.pickupLocation || 'Machine BoxEat principale',
    };
    
    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateReservationStatus = (id, newStatus) => {
    setReservations(prev =>
      prev.map(res => res.id === id ? { ...res, status: newStatus } : res)
    );
  };

  const getReservationByCode = (code) => {
    return reservations.find(res => res.code === code);
  };

  const cancelReservation = (id) => {
    setReservations(prev =>
      prev.map(res => res.id === id ? { ...res, status: 'Annulé' } : res)
    );
  };

  return (
    <ReservationsContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservationStatus,
        getReservationByCode,
        cancelReservation,
      }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};

export const useReservations = () => {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error('useReservations must be used within ReservationsProvider');
  }
  return context;
};
