// screens/PickupScreen.js
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function hashToBits(str, size = 21) {
  // simple hash → matrice binaire pseudo-QR (pas un vrai QR)
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const bits = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      h ^= (h << 13); h ^= (h >>> 17); h ^= (h << 5);
      row.push((h & 1) === 1);
    }
    bits.push(row);
  }
  return bits;
}

export default function PickupScreen({ route, navigation }) {
  const code = route.params?.code ?? 'BX-000000';
  const total = route.params?.total ?? 0;
  const items = route.params?.items ?? [];

  const bits = useMemo(() => hashToBits(code, 21), [code]);

  return (
    <View style={{ flex:1, backgroundColor:'#fff', padding:16, alignItems:'center' }}>
      <Text style={{ fontSize:24, fontWeight:'800', marginBottom:6 }}>Code de retrait</Text>
      <Text style={{ color:'#666', marginBottom:18 }}>Présentez ce code à la machine BoxEat</Text>

      {/* grille pseudo-QR */}
      <View style={{
        width: 240, height: 240, backgroundColor:'#f2f2f2',
        padding:8, borderRadius:14, justifyContent:'center', alignItems:'center', marginBottom:14,
      }}>
        <View style={{ width: 216, height: 216 }}>
          {bits.map((row, rIdx) => (
            <View key={`r-${rIdx}`} style={{ flexDirection:'row' }}>
              {row.map((on, cIdx) => (
                <View
                  key={`c-${cIdx}`}
                  style={{
                    width: 216/21, height: 216/21,
                    backgroundColor: on ? '#111' : '#fff'
                  }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      <Text style={{ fontSize:22, fontWeight:'800', letterSpacing:1 }}>{code}</Text>
      <Text style={{ color:'#666', marginTop:6 }}>
        Total payé : {Number(total).toFixed(2)} €
      </Text>

      <TouchableOpacity
        onPress={() => navigation.popToTop()}
        style={{ marginTop:24, backgroundColor:'#2e7d32', padding:14, borderRadius:12, width:'100%', alignItems:'center' }}
      >
        <Text style={{ color:'#fff', fontWeight:'800' }}>Terminer</Text>
      </TouchableOpacity>

      <View style={{ marginTop:18, width:'100%' }}>
        <Text style={{ fontWeight:'700', marginBottom:8 }}>Détails :</Text>
        {items.map((it, idx) => (
          <Text key={idx} style={{ color:'#444' }}>
            • {it.title} — {it.day} — x{it.qty} — {Number(it.price).toFixed(2)} €
          </Text>
        ))}
      </View>
    </View>
  );
}
