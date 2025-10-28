import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
// remplace l'ancien import fetchWeekMenu(...)
import { fetchWeekMenuFromFirestore } from "../services/firebaseMenu";
import MealCard from "../components/MealCard";

export default function MenuScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchWeekMenuFromFirestore("MACHINE-001");
        setMeals(
          data.map(x => ({
            // normalise les champs attendus par l’UI
            id: x.id,
            name: x.Nom || x.name || "Plat",
            description: x.Description || "",
            calories: x.Calories || 0,
            priceCents: x.PrixCents ?? (x.Prix ? Math.round(Number(x.Prix) * 100) : 0),
            imageUrl: x.Image || "",
            labels: x.Labels || [],
          }))
        );
      } catch (e) {
        console.error("Erreur Firestore:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate("MealDetails", { meal: item })}
          />
        )}
      />
    </View>
  );
}