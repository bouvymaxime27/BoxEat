import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

export default function CategoryChips({ categories, activeKey, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal:12, paddingVertical:4, gap:8 }}>
      {categories.map((c) => {
        const active = c.key === activeKey;
        return (
          <TouchableOpacity key={c.key} onPress={() => onChange(c.key)}
            style={{
              paddingHorizontal:14, paddingVertical:8, borderRadius:999, borderWidth:1,
              borderColor: active ? '#3FAE49' : '#e6e6e6',
              backgroundColor: active ? 'rgba(63,174,73,0.10)' : '#fff'
            }}>
            <Text style={{ color: active ? '#3FAE49' : '#333', fontWeight:'600' }}>{c.label}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
