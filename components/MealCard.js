// components/MealCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function MealCard({ name, description, price, image, onPress, onAdd }) {
  return (
    <TouchableOpacity onPress={onPress}
      style={{ flex:1, backgroundColor:'#fff', borderWidth:1, borderColor:'#eee', borderRadius:16, overflow:'hidden' }}>
      <Image source={{ uri:image }} style={{ width:'100%', height:120 }} />
      <View style={{ padding:10 }}>
        <Text numberOfLines={1} style={{ fontWeight:'700', fontSize:15 }}>{name}</Text>
        {description ? (
          <Text numberOfLines={2} style={{ color:'#666', marginTop:2, fontSize:12 }}>{description}</Text>
        ) : null}
        <View style={{ marginTop:8, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
          <Text style={{ fontWeight:'700' }}>{Number(price).toFixed(2)} €</Text>
          <TouchableOpacity onPress={onAdd}
            style={{ backgroundColor:'#3FAE49', paddingHorizontal:12, paddingVertical:8, borderRadius:10 }}>
            <Text style={{ color:'#fff', fontWeight:'700' }}>Réserver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
