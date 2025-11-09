import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function BoxEatScreen({ title, children }) {
  return (
    <ScrollView style={{ flex:1, backgroundColor:'#fff' }}
      contentContainerStyle={{ paddingHorizontal:20, paddingVertical:30 }}>
      {title ? (
        <Text style={{ fontSize:22, fontWeight:'700', color:'#3FAE49', marginBottom:20 }}>{title}</Text>
      ) : null}
      <View>{children}</View>
    </ScrollView>
  );
}
