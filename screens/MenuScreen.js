import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import CategoryChips from '../components/CategoryChips';
import MealCard from '../components/MealCard';
import BoxEatScreen from '../components/BoxEatScreen'; // pour les écrans qui l'utilisent

const CATEGORIES = [
  { key:'all', label:'Tous' },
  { key:'healthy', label:'Healthy' },
  { key:'veggie', label:'Veggie' },
  { key:'protein', label:'Protéiné' },
];

const SEED = [
  { id:1, name:'Chili sin carne', price:8.9, tags:['veggie','healthy'] },
  { id:2, name:'Curry de poulet', price:8.9, tags:['protein','healthy'] },
  { id:3, name:'Pâtes au pesto', price:8.9, tags:['veggie'] },
  { id:4, name:'Boulghour aux légumes', price:8.9, tags:['veggie','healthy'] },
];

export default function MenuScreen() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const inCat = category === 'all' ? SEED : SEED.filter(m => (m.tags||[]).includes(category));
    const q = query.trim().toLowerCase();
    return q ? inCat.filter(m => (m.name||'').toLowerCase().includes(q)) : inCat;
  }, [category, query]);

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={{ paddingHorizontal:16, paddingTop:14, paddingBottom:8 }}>
        <Text style={{ fontSize:24, fontWeight:'700' }}>BoxEat</Text>
      </View>

      <View style={{ paddingHorizontal:16, paddingBottom:8 }}>
        <TextInput
          placeholder="Rechercher un plat…"
          value={query}
          onChangeText={setQuery}
          style={{ borderWidth:1, borderColor:'#e6e6e6', borderRadius:12, paddingHorizontal:14, paddingVertical:10, backgroundColor:'#fafafa' }}
        />
      </View>

      <CategoryChips categories={CATEGORIES} activeKey={category} onChange={setCategory} />

      <Text style={{ paddingHorizontal:16, marginTop:8, marginBottom:8, fontSize:20, fontWeight:'700' }}>
        Menus de la semaine
      </Text>

      <FlatList
        data={filtered}
        keyExtractor={(item)=>String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding:14, borderBottomWidth:1, borderColor:'#f2f2f2', flexDirection:'row', justifyContent:'space-between' }}>
            <Text>{item.name}</Text>
            <Text style={{ fontWeight:'700' }}>{item.price.toFixed(2)} €</Text>
          </View>
        )}
        ListEmptyComponent={<View style={{ padding:24, alignItems:'center' }}><Text style={{ color:'#777' }}>Aucun plat trouvé.</Text></View>}
      />
    </View>
  );
}
