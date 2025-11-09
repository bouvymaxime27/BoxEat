// src/context/ReservationsContext.js
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase prêts si tu veux sync Firestore plus tard
import { db, auth } from '../config/firebase';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';

const KEY = '@boxeat/reservations/v1';
const ReservationsContext = createContext(null);

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

export function ReservationsProvider({ children }) {
  // [{rid, id, title, day, price, qty, status}]
  const [reservations, setReservations] = useState([]);

  // Charger depuis le storage au démarrage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setReservations(JSON.parse(raw));
      } catch (e) {
        console.log('Load reservations error:', e);
      }
    })();
  }, []);

  // Sauvegarder à chaque changement
  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(KEY, JSON.stringify(reservations));
      } catch (e) {
        console.log('Save reservations error:', e);
      }
    })();
  }, [reservations]);

  // CRUD local minimal
  const addReservation = (data) => {
    setReservations(prev => [...prev, { rid: makeId(), qty: 1, status: 'pending', ...data }]);
  };

  const updateReservation = (rid, patch) => {
    setReservations(prev => prev.map(r => (r.rid === rid ? { ...r, ...patch } : r)));
  };

  const removeReservation = (rid) => {
    setReservations(prev => prev.filter(r => r.rid !== rid));
  };

  const clearReservations = () => setReservations([]);

  // Exemple de future sync Firestore (à activer si besoin)
  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (!user) return;
  //   const q = query(collection(db, 'reservations'), where('uid', '==', user.uid));
  //   const unsub = onSnapshot(q, snap => {
  //     const arr = [];
  //     snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
  //     // mappe si tu veux fusionner avec le local
  //   });
  //   return unsub;
  // }, []);

  const value = useMemo(() => ({
    reservations,
    addReservation,
    updateReservation,
    removeReservation,
    clearReservations
  }), [reservations]);

  return (
    <ReservationsContext.Provider value={value}>
      {children}
    </ReservationsContext.Provider>
  );
}

export function useReservations() {
  const ctx = useContext(ReservationsContext);
  if (!ctx) throw new Error('useReservations must be used within ReservationsProvider');
  return ctx;
}
