// screens/MealDetailScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useReservations } from '../src/context/ReservationsContext';

export default function MealDetailScreen({ route, navigation }) {
  const { meal } = route.params; // { id, title, price, day, kcal, tag }
  const { addReservation } = useReservations();
  const [qty, setQty] = useState(1);

  const inc = () => setQty((q) => Math.min(10, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const onReserve = () => {
    addReservation(meal, qty);
    navigation.goBack();
  };

  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16 }}>
      <Text style={{ fontSize:24, fontWeight:'800', marginBottom:4 }}>{meal.title}</Text>
      <Text style={{ color:'#666', marginBottom:16 }}>{meal.day} • {meal.kcal} kcal • {meal.tag}</Text>

      <View style={{ backgroundColor:'#f6f6f6', borderRadius:12, padding:14, marginBottom:16 }}>
        <Text style={{ fontSize:16, fontWeight:'700' }}>Prix</Text>
        <Text style={{ fontSize:18, marginTop:6 }}>{meal.price.toFixed(2)} €</Text>
      </View>

      <View style={{ flexDirection:'row', alignItems:'center', marginBottom:24 }}>
        <TouchableOpacity onPress={dec} style={{ backgroundColor:'#eee', padding:10, borderRadius:10 }}>
          <Text style={{ fontSize:18, fontWeight:'800' }}>–</Text>
        </TouchableOpacity>
        <Text style={{ fontSize:18, fontWeight:'700', marginHorizontal:16 }}>{qty}</Text>
        <TouchableOpacity onPress={inc} style={{ backgroundColor:'#eee', padding:10, borderRadius:10 }}>
          <Text style={{ fontSize:18, fontWeight:'800' }}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={onReserve}
        style={{ backgroundColor:'#2e7d32', padding:14, borderRadius:12, alignItems:'center' }}
      >
        <Text style={{ color:'#fff', fontWeight:'800' }}>Réserver ({(meal.price * qty).toFixed(2)} €)</Text>
      </TouchableOpacity>
    </View>
  );
}
