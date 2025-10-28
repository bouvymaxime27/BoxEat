// src/services/firebaseMenu.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

// Récupère tous les plats de la collection "Plats_semaine"
export async function fetchWeekMenuFromFirestore(machineId = "MACHINE-001") {
  // Si plus tard tu veux filtrer par machineId, on pourra ajouter un "where"
  const colRef = collection(db, "Plats_semaine");
  const snap = await getDocs(colRef);
  const items = [];
  snap.forEach(doc => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
}