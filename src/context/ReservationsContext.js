// src/context/ReservationsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reservations'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(data);
    });

    return unsubscribe;
  }, []);

  const removeReservation = async (id) => {
    try {
      await deleteDoc(doc(db, 'reservations', id));
    } catch (error) {
      console.error('Erreur de suppression :', error);
    }
  };

  return (
    <ReservationsContext.Provider value={{ reservations, removeReservation }}>
      {children}
    </ReservationsContext.Provider>
  );
};

export const useReservations = () => useContext(ReservationsContext);
