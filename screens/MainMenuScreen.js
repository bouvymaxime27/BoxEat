import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainMenuScreen() {
  const nav = useNavigation();
  const items = [
    { label:'Menu du jour', screen:'Menu' },
    { label:'Planification semaine', screen:'Planification' },
  ];

  return (
    <ScrollView style={{ flex:1, backgroundColor:'#fff' }}
      contentContainerStyle={{ paddingVertical:40, paddingHorizontal:20 }}>
      <Text style={{ fontSize:26, fontWeight:'700', textAlign:'center', marginBottom:20 }}>BoxEat</Text>
      <Text style={{ fontSize:22, fontWeight:'700', textAlign:'center', marginBottom:20 }}>Menu général</Text>

      {items.map((it, i) => (
        <TouchableOpacity key={i} onPress={() => nav.navigate(it.screen)}
          style={{ paddingVertical:14, borderBottomWidth:i===items.length-1?0:1, borderColor:'#f0f0f0' }}>
          <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            <Text style={{ fontSize:16 }}>{it.label}</Text>
            <Text style={{ color:'#999' }}>›</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
